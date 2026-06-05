import { spawn } from 'child_process';
import { chromium } from 'playwright';
import { setTimeout as sleep } from 'timers/promises';

async function main() {
  console.log('Starting server...');
  
  const server = spawn('npx', ['next', 'dev', '-p', '3003'], {
    stdio: 'pipe',
    shell: true
  });

  // Wait for server
  await sleep(8000);
  
  console.log('Starting browser...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', e => errors.push(e.message));
  
  try {
    console.log('Opening page...');
    await page.goto('http://localhost:3003', { waitUntil: 'networkidle', timeout: 45000 });
    await sleep(2000);
    
    console.log('Page loaded, title:', await page.title());
    
    // Get all buttons
    const buttons = await page.locator('button').all();
    console.log('Buttons found:', buttons.length);
    
    for (let i = 0; i < buttons.length; i++) {
      const text = (await buttons[i].textContent() || '').trim().substring(0, 30);
      const aria = await buttons[i].getAttribute('aria-label') || '';
      const html = (await buttons[i].innerHTML() || '').substring(0, 50);
      console.log(`[${i}] "${text}" aria="${aria.substring(0,20)}" html="${html}"`);
    }
    
    // Screenshot 1
    await page.screenshot({ path: 's1.png' });
    console.log('Screenshot 1 saved: s1.png (initial state)');
    
    // Try clicking first button with SVG (likely theme)
    for (let i = 0; i < Math.min(5, buttons.length); i++) {
      const html = await buttons[i].innerHTML();
      if (html.includes('svg')) {
        console.log('Clicking button', i, 'for theme toggle');
        await buttons[i].click();
        await sleep(1000);
        break;
      }
    }
    
    await page.screenshot({ path: 's2.png' });
    console.log('Screenshot 2 saved: s2.png (after theme click)');
    
    // Find language button
    for (let i = 0; i < buttons.length; i++) {
      const text = (await buttons[i].textContent() || '').trim();
      if (text === 'RU' || text === 'EN') {
        console.log('Clicking button', i, 'for language toggle');
        await buttons[i].click();
        await sleep(1000);
        break;
      }
    }
    
    await page.screenshot({ path: 's3.png' });
    console.log('Screenshot 3 saved: s3.png (after language click)');
    
    // Errors
    console.log('\nConsole errors:', errors.length);
    errors.forEach(e => console.log(' -', e.substring(0, 100)));
    
  } catch (e) {
    console.log('Error:', e.message);
  } finally {
    await browser.close();
    server.kill();
  }
}

main();
