import { chromium } from 'playwright';
import fs from 'fs';

async function main() {
  console.log('Starting browser test...');
  
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  
  const page = await context.newPage();
  
  // Collect console messages
  const consoleMessages = [];
  const errors = [];
  
  page.on('console', msg => {
    consoleMessages.push({ type: msg.type(), text: msg.text() });
  });
  
  page.on('pageerror', error => {
    errors.push(error.message);
  });
  
  try {
    console.log('Opening http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
    
    // Wait for page to be ready
    await page.waitForTimeout(2000);
    
    // Take screenshot 1: Light theme, Russian
    console.log('Taking screenshot 1: Light theme, Russian...');
    await page.screenshot({ path: 'screenshot-1-light-ru.png', fullPage: false });
    
    // Get page content
    const title = await page.title();
    console.log('Page title:', title);
    
    // Find theme toggle button
    console.log('Looking for theme toggle...');
    const themeToggle = await page.locator('[data-testid="theme-toggle"], button:has-text("солнце"), button:has-text("луна"), button[aria-label*="theme"], button[aria-label*="тема"]').first();
    
    // Find language toggle button
    console.log('Looking for language toggle...');
    const langToggle = await page.locator('[data-testid="lang-toggle"], button:has-text("RU"), button:has-text("EN"), button[aria-label*="language"], button[aria-label*="язык"]').first();
    
    // Get all buttons to understand the page structure
    const buttons = await page.locator('button').all();
    console.log('Found buttons:', buttons.length);
    
    for (let i = 0; i < buttons.length; i++) {
      const text = await buttons[i].textContent();
      const ariaLabel = await buttons[i].getAttribute('aria-label');
      console.log(`Button ${i}: text="${text?.trim()}" aria-label="${ariaLabel}"`);
    }
    
    // Check for theme toggle (sun/moon icon)
    const html = await page.content();
    const hasThemeToggle = html.includes('sun') || html.includes('moon') || html.includes('theme') || html.includes('Sun') || html.includes('Moon');
    const hasLangToggle = html.includes('RU') || html.includes('EN') || html.includes('language') || html.includes('lang');
    
    console.log('Has theme toggle indicators:', hasThemeToggle);
    console.log('Has language toggle indicators:', hasLangToggle);
    
    // Check current theme
    const htmlElement = await page.locator('html');
    const currentTheme = await htmlElement.getAttribute('class');
    console.log('Current theme class:', currentTheme);
    
    // Try to click theme toggle
    try {
      // Look for theme button by various selectors
      const themeBtn = await page.locator('button').filter({ hasText: /sun|moon|☀|☾|🌙|🌞/i }).first();
      if (await themeBtn.count() > 0) {
        console.log('Found theme button, clicking...');
        await themeBtn.click();
        await page.waitForTimeout(500);
        
        // Take screenshot 2: Dark theme, Russian
        console.log('Taking screenshot 2: Dark theme, Russian...');
        await page.screenshot({ path: 'screenshot-2-dark-ru.png', fullPage: false });
        
        const newTheme = await htmlElement.getAttribute('class');
        console.log('Theme after toggle:', newTheme);
      } else {
        console.log('Theme button not found by text, trying by position...');
      }
    } catch (e) {
      console.log('Error clicking theme toggle:', e.message);
    }
    
    // Try to click language toggle
    try {
      const langBtn = await page.locator('button').filter({ hasText: /^RU$|^EN$|RU.*EN|EN.*RU/ }).first();
      if (await langBtn.count() > 0) {
        console.log('Found language button, clicking...');
        await langBtn.click();
        await page.waitForTimeout(500);
        
        // Take screenshot 3: Dark theme, English
        console.log('Taking screenshot 3: Dark theme, English...');
        await page.screenshot({ path: 'screenshot-3-dark-en.png', fullPage: false });
        
        // Toggle theme back to light
        const themeBtn = await page.locator('button').filter({ hasText: /sun|moon|☀|☾|🌙|🌞/i }).first();
        if (await themeBtn.count() > 0) {
          await themeBtn.click();
          await page.waitForTimeout(500);
        }
        
        // Take screenshot 4: Light theme, English
        console.log('Taking screenshot 4: Light theme, English...');
        await page.screenshot({ path: 'screenshot-4-light-en.png', fullPage: false });
      }
    } catch (e) {
      console.log('Error clicking language toggle:', e.message);
    }
    
    // Report console errors
    console.log('\n=== Console Messages ===');
    consoleMessages.forEach(m => {
      if (m.type === 'error') {
        console.log('ERROR:', m.text);
      } else if (m.type === 'warning') {
        console.log('WARN:', m.text);
      }
    });
    
    console.log('\n=== Page Errors ===');
    errors.forEach(e => console.log('PAGE ERROR:', e));
    
    if (errors.length === 0 && consoleMessages.filter(m => m.type === 'error').length === 0) {
      console.log('\n✓ No errors found in console!');
    }
    
  } catch (e) {
    console.error('Test error:', e.message);
  } finally {
    await browser.close();
  }
}

main().catch(console.error);
