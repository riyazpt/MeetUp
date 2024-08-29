const withPWA = require('next-pwa')({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development', // Disable PWA in development
});

module.exports = withPWA({
    // your Next.js config
});