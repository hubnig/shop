import type { Config } from "tailwindcss";

export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
			},
			keyframes: {
				animationOpacity: {
					from: { opacity: '0.2' },
					to: { opacity: '1' },
				},
				scaleIn: {
					'0%': {
            opacity: '0',
						transform: 'scale(0.8)',
					},
					'50%': {
						opacity: '0.5',
					},
					'100%': {
            opacity: '1',
						transform: 'scale(1)',
					},
				},
			},
      animation: {
        opacity: 'animationOpacity 0.5s ease-in-out',
        scaleIn: 'scaleIn 0.5s ease-in-out',
      }
		},
	},
	plugins: [],
} satisfies Config
