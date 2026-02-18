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
        // Layout & UI
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        muted: 'var(--color-muted)',
        'muted-foreground': 'var(--color-muted-foreground)',
        border: 'var(--color-border)',
        // Surfaces (cards, header, footer)
        surface: 'var(--color-surface)',
        'surface-foreground': 'var(--color-surface-foreground)',
        // Primary (brand, buttons, links)
        primary: 'var(--color-primary)',
        'primary-foreground': 'var(--color-primary-foreground)',
        // Overlay (modals, mobile menu)
        overlay: 'var(--color-overlay)',
      },
    },
  },
  plugins: [],
};
export default config;
