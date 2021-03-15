module.exports = {
  images: {
    domains: ['files.stripe.com'],
  },
  env: {
    BASE_URL: process.env.VERCEL_URL || 'http://localhost:3000',
    STRIPE_PUBLIC_KEY: 'pk_test_51IUYwJDlIV8HJv2kpRNAO2SC6V1GDiYZZju4u4w8SGfItxCv69DPwEjFs1xCdhxDTxtTjD17NBBrhpjA4rqxzDJW0099CBZmzF',
    STRIPE_SECRET_KEY: 'sk_test_51IUYwJDlIV8HJv2kN0vKjY0bBqAHY06vljKioliHY80gxVvwDNGSg5Pybg5U9iwOgdd5PKnMARFUdoTfDotZuVTA001hzTY0QY',
  },
}