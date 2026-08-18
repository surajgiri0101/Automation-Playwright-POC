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

    launchOptions: {
      args: ['--disable-animations'],
    },
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
      use: { browserName: 'chromium' },
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
