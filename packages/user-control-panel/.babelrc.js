module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          targets: '> 0.25%, not dead',
        },
      ],
      [
        '@babel/preset-react',
        { "runtime": "automatic", "importSource": "@emotion/react" }
      ],
      [
         "@emotion/babel-preset-css-prop",
        //  {
        //    "autoLabel": "dev-only",
        //    "labelFormat": "[local]"
        //  }
       ]
    ],
    plugins: [
    "@emotion/babel-plugin",
      '@babel/plugin-proposal-class-properties',
      [
        require.resolve('@babel/plugin-transform-runtime'),
        {
          useESModules: true,
          version: '^7.10.4',
          babelHelpers: "runtime"
        },
      ],
      // [
      //   require.resolve('babel-plugin-import-style'),
      //   {
      //     libName: 'antd',
      //     libDir: 'lib',
      //   },
      // ],
    ],
    "env": {
      "test": {
        "plugins": [
          "istanbul"
        ]
      }
    }
  };
};
