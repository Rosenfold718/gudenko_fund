import { spawn } from 'child_process';
import { chromium } from 'playwright';
import fs from 'fs';
import { setTimeout as sleep } from 'timers/promises';

async function main() {
  console.log('Starting integrated browser test...\n');
  
  // Start the Next.js server
  console.log('Starting Next.js server...');
  const server = spawn('npx', ['next', 'dev', '-p', '3002'], {
    stdio: ['ignore', 'pipe', 'pipe'],
    detached: false,
    shell: true
  });

  let serverReady = false;
  
  server.stdout.on('data', (data) => {
    const text = data.toString();
    if (text.includes('Ready')) {
      serverReady = true;
    }
    console.log('[Server stdout]', text.trim().substring(0, 100));
  });
  
  server.stderr.on('data', (data) => {
    const text = data.toString();
    if (text.includes('Ready')) {
      serverReady = true;
    }
    console.log('[Server stderr]', text.trim().substring(0, 100));
  });

  // Wait for server to be ready
  console.log('Waiting for server to start...');
  for (let i = 0; i < 60; i++) {
    if (serverReady) break;
    await sleep(500);
    if (i % 4 === 0) console.log(`  Waiting... ${i * 0.5}s`);
  }
  
  if (!serverReady) {
    console.log('Server did not start in time, trying anyway...');
  }
  
  console.log('Server should be ready!\n');

  // Now run browser tests
  console.log('Starting browser...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  
  const page = await context.newPage();
  
  // Collect console messages and errors
  const consoleMessages = [];
  const pageErrors = [];
  
  page.on('console', msg => {
    consoleMessages.push({ type: msg.type(), text: msg.text() });
  });
  
  page.on('pageerror', error => {
    pageErrors.push(error.message);
  });
  
  const baseUrl = 'http://localhost:3002';
  
  try {
    // 1. Open page and check for errors
    console.log('=== TEST 1: Page Loading ===');
    await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 60000 });
    await sleep(2000);
    
    const title = await page.title();
    console.log('Page title:', title);
    console.log('✓ Page loaded successfully\n');
    
    // Get all interactive elements
    console.log('=== TEST 2: Header Elements ===');
    
    // Find all buttons in header
    const allButtons = await page.locator('button').all();
    console.log('Total buttons found:', allButtons.length);
    
    // Get details of each button
    const buttonDetails = [];
    for (let i = 0; i < allButtons.length; i++) {
      try {
        const btn = allButtons[i];
        const text = (await btn.textContent())?.trim() || '';
        const ariaLabel = await btn.getAttribute('aria-label') || '';
        const innerHtml = await btn.innerHTML();
        const hasSvg = innerHtml.includes('<svg') || innerHtml.includes('svg');
        buttonDetails.push({ text, ariaLabel, hasSvg, index: i });
      } catch (e) {}
    }
    
    console.log('Button details:');
    buttonDetails.forEach((b, i) => {
      console.log(`  [${b.index}] text="${b.text.substring(0, 30)}", aria="${b.ariaLabel.substring(0, 30)}", hasSvg=${b.hasSvg}`);
    });
    
    // Take screenshot 1: Light theme, Russian
    console.log('\n=== SCREENSHOT 1: Light theme, Russian ===');
    await page.screenshot({ path: 'screenshot-1-light-ru.png', fullPage: false });
    console.log('Saved: screenshot-1-light-ru.png');
    
    // Check current theme
    console.log('\n=== TEST 3: Theme Toggle ===');
    const htmlElement = await page.locator('html');
    const initialTheme = await htmlElement.getAttribute('class');
    console.log('Initial theme class:', initialTheme);
    
    // Find theme toggle button
    let themeButtonIndex = -1;
    for (let i = 0; i < buttonDetails.length; i++) {
      const b = buttonDetails[i];
      if (b.hasSvg && (
        b.ariaLabel.toLowerCase().includes('theme') ||
        b.ariaLabel.toLowerCase().includes('тема') ||
        b.text.toLowerCase().includes('свет') ||
        b.text.toLowerCase().includes('тем')
      )) {
        themeButtonIndex = b.index;
        break;
      }
    }
    
    // If not found by aria, try by SVG presence in first few buttons (usually theme is in header)
    if (themeButtonIndex < 0) {
      for (let i = 0; i < Math.min(5, allButtons.length); i++) {
        const btn = allButtons[i];
        const html = await btn.innerHTML();
        if (html.includes('<svg')) {
          // Check if it's likely a theme toggle (sun/moon)
          if (html.includes('sun') || html.includes('moon') || html.includes('Sun') || html.includes('Moon') ||
              html.includes('circle') || html.includes('M12 3')) {
            themeButtonIndex = i;
            console.log('Found potential theme button at index', i);
            break;
          }
        }
      }
    }
    
    if (themeButtonIndex >= 0) {
      console.log('Clicking theme button at index', themeButtonIndex);
      await allButtons[themeButtonIndex].click();
      await sleep(1000);
      
      const afterTheme = await htmlElement.getAttribute('class');
      console.log('Theme after toggle:', afterTheme);
      console.log('Theme changed:', initialTheme !== afterTheme);
    } else {
      console.log('Theme button not found by automatic detection');
    }
    
    // Take screenshot 2: After theme toggle
    console.log('\n=== SCREENSHOT 2: After theme toggle ===');
    await page.screenshot({ path: 'screenshot-2-dark-ru.png', fullPage: false });
    console.log('Saved: screenshot-2-dark-ru.png');
    
    // Test language toggle
    console.log('\n=== TEST 4: Language Toggle ===');
    
    // Get some text before language change
    const bodyText1 = await page.locector('body').textContent();
    console.log('Sample text before (first 200 chars):', bodyText1?.substring(0, 200));
    
    // Find language toggle button
    let langButtonIndex = -1;
    for (let i = 0; i < buttonDetails.length; i++) {
      const b = buttonDetails[i];
      if (/^RU$|^EN$/.test(b.text.trim()) || b.text.includes('RU') || b.text.includes('EN')) {
        langButtonIndex = b.index;
        break;
      }
    }
    
    if (langButtonIndex >= 0) {
      console.log('Clicking language button at index', langButtonIndex);
      await allButtons[langButtonIndex].click();
      await sleep(1000);
      
      const bodyText2 = await page.locator('body').textContent();
      console.log('Sample text after (first 200 chars):', bodyText2?.substring(0, 200));
    }
    
    // Take screenshot 3: Dark theme, English
    console.log('\n=== SCREENSHOT 3: Dark theme, English ===');
    await page.screenshot({ path: 'screenshot-3-dark-en.png', fullPage: false });
    console.log('Saved: screenshot-3-dark-en.png');
    
    // Toggle theme back to light
    if (themeButtonIndex >= 0) {
      await allButtons[themeButtonIndex].click();
      await sleep(500);
    }
    
    // Take screenshot 4: Light theme, English
    console.log('\n=== SCREENSHOT 4: Light theme, English ===');
    await page.screenshot({ path: 'screenshot-4-light-en.png', fullPage: false });
    console.log('Saved: screenshot-4-light-en.png');
    
    // Check console for errors
    console.log('\n=== TEST 5: Console Errors ===');
    const errors = consoleMessages.filter(m => m.type === 'error');
    const warnings = consoleMessages.filter(m => m.type === 'warning');
    
    if (pageErrors.length > 0) {
      console.log('Page Errors:');
      pageErrors.forEach(e => console.log('  -', e));
    }
    
    if (errors.length > 0) {
      console.log('Console Errors:');
      errors.forEach(e => console.log('  -', e.text));
    }
    
    if (warnings.length > 0) {
      console.log('Console Warnings:');
      warnings.forEach(w => console.log('  -', w.text));
    }
    
    if (pageErrors.length === 0 && errors.length === 0) {
      console.log('✓ No errors in console!');
    }
    
    // Summary
    console.log('\n=== SUMMARY ===');
    console.log('1. Site loads:', '✓ PASS');
    console.log('2. Theme toggle found:', themeButtonIndex >= 0 ? '✓ PASS' : '✗ FAIL');
    console.log('3. Language toggle found:', langButtonIndex >= 0 ? '✓ PASS' : '✗ FAIL');
    console.log('4. Console errors:', pageErrors.length === 0 && errors.length === 0 ? '✓ NONE' : '⚠ FOUND');
    
  } catch (e) {
    console.error('Test error:', e.message);
  } finally {
    await browser.close();
    server.kill();
    console.log('\nDone!');
  }
}

main().catch(console.error);
