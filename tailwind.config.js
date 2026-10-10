module.exports = {
  mode: 'jit',
  purge: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'nav': '1100px',
      'xl': '1280px',
    },
    extend: {
      fontFamily: {
        'sans': ['universalSans', 'universalSans Fallback', 'system-ui', 'sans-serif'],
        'display': ['universalSansDisplay', 'universalSansDisplay Fallback', 'system-ui', 'sans-serif'],
      },
      colors: {
        'jet': 'hsl(var(--color-jet))',
        'charcoal': 'hsl(var(--color-charcoal))',
        'umbra': 'hsl(var(--color-umbra))',
        'ink': 'hsl(var(--color-ink))',
        'ash': 'hsl(var(--color-ash))',
        'steel': 'hsl(var(--color-steel))',
        'fog': 'hsl(var(--color-fog))',
        'pewter': 'hsl(var(--color-pewter))',
        'dove': 'hsl(var(--color-dove))',
        'nimbus': 'hsl(var(--color-nimbus))',
        'ivory': 'hsl(var(--color-ivory))',
        'white': '#fff',
        'sunset': 'hsl(var(--color-sunset))',
        'primary': 'hsl(var(--primary))',
        'primary-hover': 'hsl(var(--primary-hover))',
        'secondary': 'hsl(var(--secondary))',
        'background': 'hsl(var(--background))',
        'foreground': 'hsl(var(--foreground))',
        'card': 'hsl(var(--card))',
        'border': 'hsl(var(--border))',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
