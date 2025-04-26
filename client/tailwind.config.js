export const content = ['*.html', "./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
    extend: {
        colors: {
            'primary': '#31c0ce',
            'secondary': '#fff',
        },
        length: {
            '128': '32rem',
        },
        animation: {
            'fadeIn': 'fadeIn 0.5s ease-in-out',
            'fadeOut': 'fadeOut 0.5s ease-in-out forwards',
            'fadeInUp': 'fadeInUp 0.8s ease forwards',
            'float': 'float 6s ease-in-out infinite',
            'pulse': 'pulse 2s ease-in-out infinite',
            'letterPulse': 'letterPulse 2s ease-in-out infinite',
            'spin-slow': 'spin 8s linear infinite',
            'bounce-slow': 'bounce 3s infinite',
            'ripple': 'ripple 3s linear infinite',
            'wave': 'wave 8s ease-in-out infinite',
            'float-horizontal': 'floatHorizontal 8s ease-in-out infinite',
            'scale-pulse': 'scalePulse 3s ease-in-out infinite',
            'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        },
        keyframes: {
            fadeIn: {
                '0%': { opacity: '0' },
                '100%': { opacity: '1' },
            },
            fadeOut: {
                '0%': { opacity: '1' },
                '100%': { opacity: '0' },
            },
            fadeInUp: {
                '0%': { opacity: '0', transform: 'translateY(20px)' },
                '100%': { opacity: '1', transform: 'translateY(0)' },
            },
            float: {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-10px)' },
            },
            pulse: {
                '0%, 100%': { opacity: '1', transform: 'scale(1)' },
                '50%': { opacity: '0.7', transform: 'scale(0.95)' },
            },
            letterPulse: {
                '0%': { transform: 'scale(1)', opacity: '1' },
                '50%': { transform: 'scale(1.1)', opacity: '0.8' },
                '100%': { transform: 'scale(1)', opacity: '1' },
            },
            ripple: {
                '0%': { transform: 'scale(0.8)', opacity: '1' },
                '100%': { transform: 'scale(2)', opacity: '0' }
            },
            wave: {
                '0%, 100%': { transform: 'translateY(0) rotate(0)' },
                '50%': { transform: 'translateY(-5px) rotate(2deg)' },
            },
            floatHorizontal: {
                '0%, 100%': { transform: 'translateX(0)' },
                '50%': { transform: 'translateX(10px)' },
            },
            scalePulse: {
                '0%, 100%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.2)' },
            },
        },
        transitionDelay: {
            '100': '100ms',
            '200': '200ms',
            '300': '300ms',
            '400': '400ms',
            '500': '500ms',
            '600': '600ms',
            '700': '700ms',
            '800': '800ms',
            '900': '900ms',
            '1000': '1000ms',
            '1500': '1500ms',
            '2000': '2000ms',
        },
    },
};
export const plugins = [
    function ({ addUtilities, theme }) {
        const newUtilities = {};
        Object.entries(theme('transitionDelay')).forEach(([key, value]) => {
            newUtilities[`.animation-delay-${key}`] = {
                'animation-delay': value
            };
        });
        addUtilities(newUtilities);
    },
    function({ addUtilities }) {
        addUtilities({
            '.scrollbar-hide': {
                /* Firefox */
                'scrollbar-width': 'none',
                /* Safari and Chrome */
                '&::-webkit-scrollbar': {
                    display: 'none'
                }
            }
        });
    },
    function({ addComponents }) {
        addComponents({
            '.line-clamp-1': {
                overflow: 'hidden',
                display: '-webkit-box',
                '-webkit-box-orient': 'vertical',
                '-webkit-line-clamp': '1',
            },
            '.line-clamp-2': {
                overflow: 'hidden',
                display: '-webkit-box',
                '-webkit-box-orient': 'vertical',
                '-webkit-line-clamp': '2',
            },
            '.line-clamp-3': {
                overflow: 'hidden',
                display: '-webkit-box',
                '-webkit-box-orient': 'vertical',
                '-webkit-line-clamp': '3',
            }
        });
    }
];
  