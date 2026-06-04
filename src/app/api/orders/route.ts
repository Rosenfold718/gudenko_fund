import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import type { DeliveryType, PaymentMethod } from '@prisma/client';

interface OrderItemInput {
  productId: string;
  quantity: number;
}

interface CreateOrderInput {
  customerName: string;
  email: string;
  phone: string;
  deliveryType: DeliveryType;
  address?: string;
  city?: string;
  postalCode?: string;
  comment?: string;
  paymentMethod: PaymentMethod;
  items: OrderItemInput[];
}

// Generate order number like "GF-2024-0001"
async function generateOrderNumber(): Promise<string> {
  const year = new Date().getFullYear();
  
  const lastOrder = await db.order.findFirst({
    where: {
      orderNumber: {
        startsWith: `GF-${year}-`,
      },
    },
    orderBy: {
      orderNumber: 'desc',
    },
  });

  if (!lastOrder) {
    return `GF-${year}-0001`;
  }

  const lastNumber = parseInt(lastOrder.orderNumber.split('-')[2], 10);
  const newNumber = (lastNumber + 1).toString().padStart(4, '0');
  return `GF-${year}-${newNumber}`;
}

export async function POST(request: Request) {
  try {
    const body: CreateOrderInput = await request.json();

    // Validate required fields
    if (!body.customerName || !body.email || !body.phone || !body.deliveryType || !body.items?.length) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate delivery address for non-pickup orders
    if (body.deliveryType !== 'PICKUP' && !body.address) {
      return NextResponse.json(
        { error: 'Address is required for delivery' },
        { status: 400 }
      );
    }

    // Fetch products and validate
    const productIds = body.items.map((item) => item.productId);
    const products = await db.product.findMany({
      where: {
        id: { in: productIds },
        isActive: true,
      },
    });

    if (products.length !== productIds.length) {
      return NextResponse.json(
        { error: 'Some products are not available' },
        { status: 400 }
      );
    }

    // Check stock
    for (const item of body.items) {
      const product = products.find((p) => p.id === item.productId);
      if (product && product.inStock < item.quantity) {
        return NextResponse.json(
          { error: `Not enough stock for ${product.name}` },
          { status: 400 }
        );
      }
    }

    // Calculate subtotal
    const subtotal = body.items.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);

    // Calculate delivery cost
    let deliveryCost = 0;
    switch (body.deliveryType) {
      case 'COURIER':
        deliveryCost = 50000; // 500 ₽
        break;
      case 'POST':
        deliveryCost = 35000; // 350 ₽
        break;
      case 'CDEK':
        deliveryCost = 45000; // 450 ₽
        break;
      case 'PICKUP':
      default:
        deliveryCost = 0;
    }

    const total = subtotal + deliveryCost;

    // Generate order number
    const orderNumber = await generateOrderNumber();

    // Create order with items
    const order = await db.order.create({
      data: {
        orderNumber,
        status: 'NEW',
        customerName: body.customerName,
        email: body.email,
        phone: body.phone,
        deliveryType: body.deliveryType,
        address: body.address,
        city: body.city,
        postalCode: body.postalCode,
        comment: body.comment,
        subtotal,
        deliveryCost,
        total,
        paymentMethod: body.paymentMethod,
        paymentStatus: 'PENDING',
        items: {
          create: body.items.map((item) => {
            const product = products.find((p) => p.id === item.productId)!;
            return {
              productId: item.productId,
              productName: product.name,
              price: product.price,
              quantity: item.quantity,
            };
          }),
        },
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                mainImage: true,
              },
            },
          },
        },
      },
    });

    // Update stock
    for (const item of body.items) {
      await db.product.update({
        where: { id: item.productId },
        data: {
          inStock: {
            decrement: item.quantity,
          },
        },
      });
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
