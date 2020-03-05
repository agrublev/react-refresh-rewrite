const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const rewireStyl = require("./override.stylus");

const {
  override,
  addWebpackAlias,
  addWebpackModuleRule,
  addBundleVisualizer,
  addLessLoader,
  useEslintRc,
  addWebpackPlugin,
  useBabelRc
} = require("customize-cra");
const { addReactRefresh } = require("customize-cra-react-refresh");

const test = process.env.ANALYZE === "test";
let extra = [];
if (test) {
  extra.push(
    addBundleVisualizer({
      analyzerMode: "static",
      reportFilename: "report.html"
    })
  );
}

function myOverrides(config) {
  rewireStyl(config);
  return config;
}

module.exports = override(
  myOverrides,
  useBabelRc(),
  addWebpackModuleRule({
    test: /\.module\.less$/,
    exclude: /\.less$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader
      },
      {
        loader: "style-loader"
      },
      {
        loader: "css-loader",
        options: {
          sourceMap: true,
          modules: true,
          localIdentName: "[local]___[hash:base64:5]"
        }
      },
      {
        loader: "less-loader",
        options: {
          javascriptEnabled: true
        }
      }
    ]
  }),
  addWebpackModuleRule({
    test: /\.less$/,
    exclude: /\.module\.less$/,
    use: [
      {
        loader: "style-loader"
      },
      {
        loader: "css-loader"
      },
      {
        loader: "less-loader",
        options: {
          javascriptEnabled: true
        }
      }
    ]
  }),
  useEslintRc(),
  ...extra,
  addLessLoader({
    javascriptEnabled: true
  }),
  addReactRefresh({ disableRefreshCheck: true }), // add an alias for "ag-grid-react" imports
  addWebpackAlias({
    "@fkit": path.resolve(__dirname, "src/fkit")
    // r: path.resolve(__dirname, "node_modules/rsuite")
  }),
  addWebpackPlugin(
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "dist/[name].[contenthash:8].css",
      chunkFilename: "dist/[name].[contenthash:8].chunk.css"
    })
  )

  // webpack: override(
  //     // usual webpack plugin
  //     disableEsLint()
  //   ),
  //   devServer: overrideDevServer(
  //     // dev server plugin
  //     watchAll()
  //   )

  //disableChunk

  //{
  //   "analyzerMode": "static",
  //   "reportFilename": "report.html"
  // }
  // You can hide this plugin behind a command line flag (--analyze) by passing true as second argument.
  //

  // Sets your customized optimization.splitChunks configuration to your webpack config. Please Use this method cautiously because the webpack default config is effective on most of time. By default, the options in create-react-app is:
  //
);

// module.exports = override(
// Print initial config in the console prepending a message
// tap({message: "Pre - Customizers"})
/* Your customizers: eg. addLessLoader() */
// addLessLoader()
// Print final config in a separate file
// tap({dest: 'customize-cra.log'})
// )
/*
							test: cssRegex,
							exclude: cssModuleRegex,
							use: getStyleLoaders({
							  importLoaders: 1,
							  sourceMap: isEnvProduction && shouldUseSourceMap,
							}),
							// Don't consider CSS imports dead code even if the
							// containing package claims to have no side effects.
							// Remove this when webpack adds a warning or an error for this.
							// See https://github.com/webpack/webpack/issues/6571
							sideEffects: true,
						  */
