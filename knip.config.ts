import { KnipConfig } from 'knip'

export default {
  entry: [
    'frontend/clash-xiaoy/src/main.tsx',
    'frontend/clash-xiaoy/src/pages/**/*.tsx',
    'scripts/*.{js,ts}',
  ],
  project: ['frontend/**/*.{ts,js,jsx,tsx}', 'scripts/**/*.{js,ts}'],
} satisfies KnipConfig
