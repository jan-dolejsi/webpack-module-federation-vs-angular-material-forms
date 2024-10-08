const { share, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'mfe2',

  exposes: {
    './Module': './src/app/module-a/module-a.module.ts',
  },

  // shared: {
  //   ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  // },

  shared: share({
    "@angular/core": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    },
    "@angular/common": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    },
    "@angular/common/http": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    },
    "@angular/router": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    },
    // "@angular/forms": {
    //   singleton: true,
    //   strictVersion: true,
    //   requiredVersion: 'auto'
    // },
    rxjs: {
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    },
    '@angular/material': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    },
    // '@angular/material-moment-adapter': {
    //   singleton: true,
    //   strictVersion: true,
    //   requiredVersion: 'auto',
    // },
  }),

});
