module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, options) => {

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  compiler: {
    styledComponents: true
  }
};
function throwError(envVar) {
  throw `Abort: You need to define ${envVar} in the .env file.`
}

if (!process.env.RESEND_API_KEY) return throwError('RESEND_API_KEY');
