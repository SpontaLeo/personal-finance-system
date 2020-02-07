const { override, fixBabelImports } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),

  process.env === 'production' && process.config.publicPath === './',
);

// module.exports = function override(config, env) {
//   if (env === 'production') {
//     config.output.publicPath = './';
//   }
//   return config;
// };
