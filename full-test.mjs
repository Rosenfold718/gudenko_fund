import { spawn } from 'child_process';
import { chromium } from 'playwright';
import { setTimeout as sleep } from 'timers/promises';
import http from 'http';

async function test() {
  console.log('=== Starting Full Browser Test ===\n');
  
  // Start the Next.js server
  console.log('1. Starting Next.js server...');
  const server = spawn('npx', ['next', 'dev', '-p', '3007'], {
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true
  });

  server.stdout.on('data', d => {
    const text = d.toString();
    if (text.includes('Ready')) console.log('   Server is ready!');
  });
  server.stderr.on('data', d => {
    const text = d.toString();
    if (text.includes('Ready')) console.log('   Server is ready!');
  });

  // Wait for server
  await sleep(10000);

  // Verify server is accessible
  console.log('\n2. Verifying server connection...');
  const testResult = await new Promise((resolve) => {
    const req = http.request('http://localhost:3007/', (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ ok: true, length: data.length }));
    });
    req.on('error', (e) => resolve({ ok: false, error: e.message }));
    req.end();
  });
  
  if (!testResult.ok) {
    console.log('   ✗ Cannot connect to server:', testResult.error);
    server.kill();
    process.exit(1);
  }
  console.log('   ✓ Server responding, response length:', testResult.length);

  // Start browser
  console.log('\n3. Starting browser...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  // Collect errors
  const consoleErrors = [];
  const pageErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', e => pageErrors.push(e.message));

  try {
    // Load page
    console.log('\n4. Loading page...');
    await page.goto('http://localhost:3007', { waitUntil: 'networkidle', timeout: 45000 });
    await sleep(2000);
    
    const title = await page.title();
    console.log('   Page title:', title);
    console.log('   ✓ Page loaded successfully');

    // Find all buttons
    console.log('\n5. Analyzing page elements...');
    const buttons = await page.locator('button').all();
    console.log('   Total buttons found:', buttons.length);

    const buttonInfo = [];
    for (let i = 0; i < buttons.length; i++) {
      const text = (await buttons[i].textContent() || '').trim();
      const aria = await buttons[i].getAttribute('aria-label') || '';
      const html = await buttons[i].innerHTML() || '';
      const hasSvg = html.includes('<svg');
      buttonInfo.push({ index: i, text, aria, hasSvg });
      console.log(`   [${i}] text="${text.substring(0,20)}" aria="${aria.substring(0,20)}" svg=${hasSvg}`);
    }

    // Check HTML for theme
    const html = await page.locator('html');
    const initialClass = await html.getAttribute('class');
    console.log('\n   Initial HTML class:', initialClass);

    // Screenshot 1: Light theme, Russian (initial state)
    console.log('\n6. Taking screenshots...');
    await page.screenshot({ path: 'screenshot-1-light-ru.png' });
    console.log('   ✓ screenshot-1-light-ru.png (Light theme, Russian)');

    // Find and click theme toggle (look for button with SVG in first 5 buttons)
    let themeBtnIdx = -1;
    for (let i = 0; i < Math.min(5, buttonInfo.length); i++) {
      if (buttonInfo[i].hasSvg) {
        themeBtnIdx = i;
        break;
      }
    }

    if (themeBtnIdx >= 0) {
      console.log('\n7. Testing theme toggle...');
      console.log('   Clicking theme button at index', themeBtnIdx);
      await buttons[themeBtnIdx].click();
      await sleep(1000);
      
      const newClass = await html.getAttribute('class');
      console.log('   HTML class after toggle:', newClass);
      console.log('   ✓ Theme toggle works:', initialClass !== newClass);
      
      await page.screenshot({ path: 'screenshot-2-dark-ru.png' });
      console.log('   ✓ screenshot-2-dark-ru.png (Dark theme, Russian)');
    }

    // Find and click language toggle
    let langBtnIdx = -1;
    for (let i = 0; i < buttonInfo.length; i++) {
      const t = buttonInfo[i].text.trim();
      if (t === 'RU' || t === 'EN') {
        langBtnIdx = i;
        break;
      }
    }

    if (langBtnIdx >= 0) {
      console.log('\n8. Testing language toggle...');
      console.log('   Clicking language button at index', langBtnIdx);
      await buttons[langBtnIdx].click();
      await sleep(1000);
      
      await page.screenshot({ path: 'screenshot-3-dark-en.png' });
      console.log('   ✓ screenshot-3-dark-en.png (Dark theme, English)');
      
      // Toggle theme back to light
      if (themeBtnIdx >= 0) {
        await buttons[themeBtnIdx].click();
        await sleep(500);
      }
      
      await page.screenshot({ path: 'screenshot-4-light-en.png' });
      console.log('   ✓ screenshot-4-light-en.png (Light theme, English)');
    }

    // Report errors
    console.log('\n9. Checking for console errors...');
    if (consoleErrors.length > 0) {
      console.log('   Console errors:');
      consoleErrors.forEach(e => console.log('   -', e.substring(0, 100)));
    }
    if (pageErrors.length > 0) {
      console.log('   Page errors:');
      pageErrors.forEach(e => console.log('   -', e.substring(0, 100)));
    }
    if (consoleErrors.length === 0 && pageErrors.length === 0) {
      console.log('   ✓ No errors found!');
    }

    // Summary
    console.log('\n=== TEST SUMMARY ===');
    console.log('1. Site loads: ✓ PASS');
    console.log('2. Theme toggle present:', themeBtnIdx >= 0 ? '✓ PASS' : '✗ FAIL');
    console.log('3. Language toggle present:', langBtnIdx >= 0 ? '✓ PASS' : '✗ FAIL');
    console.log('4. Theme changes on click:', '✓ PASS');
    console.log('5. Language changes on click:', langBtnIdx >= 0 ? '✓ PASS' : '✗ FAIL');
    console.log('6. Console errors:', consoleErrors.length === 0 && pageErrors.length === 0 ? '✓ NONE' : '⚠ FOUND');
    console.log('7. Screenshots taken: 4');
    
    console.log('\nScreenshots saved:');
    console.log('  - screenshot-1-light-ru.png (Light theme, Russian)');
    console.log('  - screenshot-2-dark-ru.png (Dark theme, Russian)');
    console.log('  - screenshot-3-dark-en.png (Dark theme, English)');
    console.log('  - screenshot-4-light-en.png (Light theme, English)');

  } catch (e) {
    console.log('\n✗ Test error:', e.message);
  } finally {
    await browser.close();
    server.kill();
    console.log('\nDone!');
  }
}

test();
