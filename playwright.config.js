import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  timeout: 60000,
  testDir: './tests',
  workers: 5,
  fullyParallel: true,

  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    _platformSuffix: '',
    // Note: launchOptions removed from the global `use` block because
    // the `--disable-animations` argument is a Chromium flag and causes
    // WebKit to exit with "Unknown option --disable-animations".
  },

  // 🧠 Snapshot stabilization
  expect: {
    toHaveScreenshot: {
      omitPlatformName: true,
      maxDiffPixels: 100,
    },
  },

  reporter: [['html', { open: 'never' }]],
  // ✅ Browsers
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        // Pass Chromium-specific args here so WebKit/Firefox aren't affected.
        launchOptions: {
          args: ['--disable-animations'],
        },
      },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
});
