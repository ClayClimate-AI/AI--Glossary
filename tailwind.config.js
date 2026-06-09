/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'brand-bg':      '#050810',
        'brand-bg2':     '#080d1a',
        'brand-surface': '#0c1220',
        'brand-card':    '#0f1628',
        'brand-card2':   '#131c32',
        'brand-border':  '#1a2540',
        'brand-border2': '#243050',
        'brand-accent':  '#00d4ff',
        'brand-accent2': '#0088cc',
        'brand-green':   '#00ffaa',
        'brand-gold':    '#ffd060',
        'brand-pink':    '#ff6eb4',
        'brand-text':    '#e8f0ff',
        'brand-muted':   '#7090b0',
        'brand-dim':     '#2a3a55',
      },
      fontFamily: {
        sans:    ['Outfit', 'sans-serif'],
        heading: ['Syne', 'sans-serif'],
        code:    ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glow:    '0 0 20px rgba(0,212,255,0.15)',
        'glow-lg': '0 0 30px rgba(0,212,255,0.25)',
      },
      maxWidth: {
        page: '1280px',
      },
    },
  },
  plugins: [],
}
