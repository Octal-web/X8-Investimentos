import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        // Mesmos cortes do layout original (1200px de grid e ajustes em 1199/1023/767).
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            desk: '1200px',
            xl: '1280px',
            '2xl': '1536px',
            hd: '1600px',
        },
        extend: {
            fontFamily: {
                sans: ['Space Grotesk Variable', ...defaultTheme.fontFamily.sans],
                mono: ['ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
            },
            container: {
                center: true,
                padding: '5%',
            },
            maxWidth: {
                small: '64rem',
                medium: '94rem',
                large: '104rem',
            },
            spacing: {
                '15': '3.75rem',
                '30': '7rem',
                '40': '9.375rem',
                '50': '12.5rem',
            },
            colors: {
                primary: '#2F74E6',
                secondary: '#AEBBD1',
                x8: {
                    bg: '#040914',
                    panel: '#071029',
                    blue: '#2f74e6',
                    royal: '#1f5bd6',
                    accent: '#86aaf2',
                    muted: '#aebbd1',
                    soft: '#c2cee2',
                    ice: '#d8e4f5',
                    dim: '#70809c',
                    ink: '#0a1225',
                    border: 'rgba(255, 255, 255, .09)',
                },
            },
            keyframes: {
                'fade-in-down': {
                    '0%': { opacity: '0', transform: 'translate3d(0,-100px,0)' },
                    '100%': { opacity: '1', transform: 'none' },
                }
            },
            animation: {
                'fade-in-down': 'fade-in-down 200ms linear'
            },
        },
    },

    plugins: [
        forms,
        function({ addComponents, addVariant, theme }) {
            addVariant('can-hover', '@media (hover: hover)');
            addComponents({
                'p + p': {
                    marginTop: '1rem',
                },
                '.x8-container': {
                    width: 'min(1200px, calc(100% - 80px))',
                    marginInline: 'auto',
                    [`@media (max-width: ${parseInt(theme('screens.md')) - 1}px)`]: {
                        width: 'calc(100% - 40px)',
                    },
                },
                '.eyebrow': {
                    fontFamily: theme('fontFamily.mono'),
                    fontSize: '12px',
                    lineHeight: '1.5',
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    color: theme('colors.x8.accent'),
                },
                '.x8-button': {
                    display: 'flex',
                    width: 'fit-content',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '14px',
                    minHeight: '52px',
                    padding: '13px 24px',
                    border: '1px solid rgba(255, 255, 255, .23)',
                    borderRadius: '100px',
                    color: '#fff',
                    fontSize: '15px',
                    lineHeight: '1.4',
                    fontWeight: '500',
                    transition: 'background .2s, border-color .2s, translate .2s',
                    '&:hover': {
                        background: 'rgba(134, 170, 242, .12)',
                        borderColor: theme('colors.x8.accent'),
                        translate: '0 -2px',
                    },
                },
                '.x8-button-light': {
                    color: theme('colors.x8.bg'),
                    background: theme('colors.x8.ice'),
                    borderColor: theme('colors.x8.ice'),
                    '&:hover': {
                        color: theme('colors.x8.bg'),
                        background: '#fff',
                        borderColor: '#fff',
                    },
                },
            })
        }
    ],
};
