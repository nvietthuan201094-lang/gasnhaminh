/** @type {import('next').NextConfig} */
const nextConfig = {
  // Chuẩn hóa URL không có dấu gạch chéo cuối để tránh trùng lặp nội dung và chuỗi chuyển hướng
  trailingSlash: false,
  poweredByHeader: false,
  compress: true,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/(icon.*|favicon.*|apple-touch-icon.*|.*\\.jpg|.*\\.png|.*\\.ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
