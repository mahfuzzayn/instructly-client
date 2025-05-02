/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
    	extend: {
    		colors: {
    			it: {
    				destructive: 'hsl(var(--it-900))',
    				'medium-dark': 'hsl(var(--it-800))',
    				secondary: 'hsl(var(--it-700))',
    				'light-dark': 'hsl(var(--it-600))',
    				primary: 'hsl(var(--it-500))',
    				'medium-primary': 'hsl(var(--it-400))',
    				'light-primary': 'hsl(var(--it-300))',
    				accent: 'hsl(var(--it-200))',
    				'extra-light': 'hsl(var(--it-100))'
    			},
    			background: 'hsl(var(--it-100))',
    			foreground: 'hsl(var(--it-100-foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--it-500))',
    				foreground: 'hsl(var(--it-500-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--it-700))',
    				foreground: 'hsl(var(--it-700-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--it-800))',
    				foreground: 'hsl(var(--it-800-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--it-200))',
    				foreground: 'hsl(var(--it-200-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--it-900))',
    				foreground: 'hsl(var(--it-900-foreground))'
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
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))'
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
