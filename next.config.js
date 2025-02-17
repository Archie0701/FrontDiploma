module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  webpack: (config, { isServer }) => {
    // For CSS files
    config.module.rules.push({
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
    });

    return config;
  },
};
function throwError(envVar) {
  throw `Abort: You need to define ${envVar} in the .env file.`
}

if (!process.env.RESEND_API_KEY) return throwError('RESEND_API_KEY');
