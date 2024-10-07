const { share, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {
    "mfe1": "http://localhost:4221/remoteEntry.js",    
  },

  shared: share({
    '@angular/core': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    },
    '@angular/common': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    },
    '@angular/common/http': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    },
    // the @angular/forms is missing in the RDK app shell till October 2024
    // '@angular/forms': {
    //   singleton: true,
    //   strictVersion: true,
    //   requiredVersion: 'auto'
    // },     
    '@angular/router': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    },
    rxjs: {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
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
