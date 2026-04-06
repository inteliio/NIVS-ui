import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Layout & UI (semantic → NIVS palette in globals.css)
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        muted: 'var(--color-muted)',
        'muted-foreground': 'var(--color-muted-foreground)',
        border: 'var(--color-border)',
        surface: 'var(--color-surface)',
        'surface-foreground': 'var(--color-surface-foreground)',
        primary: 'var(--color-primary)',
        'primary-foreground': 'var(--color-primary-foreground)',
        'primary-hover': 'var(--color-primary-hover)',
        overlay: 'var(--color-overlay)',
        header: {
          DEFAULT: 'var(--color-header-bg)',
          foreground: 'var(--color-header-fg)',
          border: 'var(--color-header-border)',
        },
        // Direct access to PDF palette
        nivs: {
          'navy-deep': 'var(--nivs-navy-deep)',
          'navy-mid': 'var(--nivs-navy-mid)',
          'navy-light': 'var(--nivs-navy-light)',
          gold: 'var(--nivs-gold)',
          'gold-hover': 'var(--nivs-gold-hover)',
          'gold-pale': 'var(--nivs-gold-pale)',
          'off-white': 'var(--nivs-off-white)',
          'light-gray': 'var(--nivs-light-gray)',
          'text-gray': 'var(--nivs-text-gray)',
        },
      },
    },
  },
  plugins: [],
};
export default config;
