const os = require('os');

const getLocalIPs = () => {
  const ips = [];
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.family === 'IPv4') {
        ips.push(net.address);
        ips.push(`${net.address}:3000`);
        ips.push(`${net.address}:3001`);
      }
    }
  }
  return ips;
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    'localhost:3000',
    'localhost:3001',
    '127.0.0.1:3001',
    '127.0.0.1',
    '10.0.0.16:3000',
    '10.0.0.16',
    '10.20.245.229:3000',
    '10.200.73.229:3000',
    '10.0.0.76:3000',
    '10.0.0.76',
    '10.0.0.99:3000',
    '10.0.0.99:3001',
    '10.0.0.99',
    'localhost',
    '10.20.245.229',
    '10.200.73.229',
    ...getLocalIPs()
  ],
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "thinkalternate.com",
      },
    ],
  },
  async headers() {
    const isProd = process.env.NODE_ENV === 'production';
    const cspHeader = `
      default-src 'self';
      script-src 'self'
      'unsafe-inline'
      'unsafe-eval'
      https://www.google.com
      https://www.gstatic.com
      https://www.recaptcha.net
      https://unpkg.com
      https://www.googletagmanager.com
      https://www.google-analytics.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self'
      blob:
      data:
      https://images.unsplash.com
      https://thinkalternate.com
      https://www.google.com
      https://www.gstatic.com
      https://www.google-analytics.com;
      font-src 'self' data: https://fonts.gstatic.com;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-src 'self' https://www.google.com https://www.recaptcha.net https://www.youtube.com https://www.youtube-nocookie.com;
      connect-src 'self'
      https://www.google.com
      https://www.gstatic.com
      https://www.recaptcha.net
      https://www.googletagmanager.com
      https://www.google-analytics.com
      https://region1.google-analytics.com
      https://analytics.google.com
      https://lottie.host;
      ${isProd ? 'upgrade-insecure-requests;' : ''}
    `.replace(/\s{2,}/g, ' ').trim();

    return [
      {
        source: '/:path*\\.(svg|png|jpg|jpeg|webp|gif|ico|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
