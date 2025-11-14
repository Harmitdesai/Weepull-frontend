import type { Config } from "tailwindcss";
import { DEFAULT_CIPHERS } from "tls";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	'./@/**/*.{ts,tsx}', 
  ],
  theme: {
  	extend: {
		maxHeight: {
			'100': '25rem', // Custom max-height value (25rem = 400px)
			'120': '30rem',
		  },
  		colors: {

			surface: {
				upper : 'hsl(203, 50%, 97%)',
				up : 'hsl(203, 0%, 92%)',
				DEFAULT: 'hsl(203, 0%, 88%)',
				down : 'hsl(202, 28%, 84%)',
				downer : 'hsl(203, 20%, 82%)',
			},

			confirmButton : {
				DEFAULT : 'hsla(145, 70%, 52%, 1.00)',
				up : 'hsla(145, 70%, 67%, 1.00)',
				upper : 'hsla(145, 80%, 72%, 1.00)',
				down : 'hsla(145, 70%, 42%, 1.00)',
				downer : 'hsla(145, 70%, 32%, 1.00)',
			},

  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
