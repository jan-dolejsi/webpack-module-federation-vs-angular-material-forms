# Angular Material (reactive) forms vs Webpack module federation issue repro

This repo is the least repro sample to show the Angular Material reactive forms issue I am facing when the Form is loaded via its remoteEntry.js to the app shell.

The sample uses Angular 16.
The general approach for the Module Federation is described in [Dynamic Module Federation with Angular](https://www.angulararchitects.io/en/blog/dynamic-module-federation-with-angular/).

## Running the sample

|            | App shell                              | Micro-frontend |
| ---------- | -------------------------------------- | -------------- |
| sub-folder | [/remote_app_shell](/remote_app_shell) | [/mfe1](/mfe1) |
| serve      | cd remote_app_shell && npx ng serve    | cd mfe1 && npx ng build --project ngx-my-components && npx ng serve |
| browse     | <http://localhost:3200/>               | <http://localhost:4221/> |

Here are the steps how to reproduce this:

## App shell

### How to run the sample

```bash
cd remote_app_shell
npm install
npx ng serve
```

### How to rebuild the sample yourself

If you want to re-build the sample (while customizing it for your purposes), here is how its done:

```bash
npm install @angular/cli@16.2.10 -g
ng new remote_app_shell --prefix app-shell --routing --style scss
npm uninstall @angular/cli -g

cd remote_app_shell
npm install
```

Install Angualar Material (by running this in the `remote_app_shell` subfolder):

```bash
npx ng add @angular/material
```

Switch the default `@angular-devkit/build-angular` to `ngx-build-plus`  (by running this in the `remote_app_shell` subfolder):

```bash
npx ng add ngx-build-plus@16.0.0
```

Add Module Federation (by running this in the `remote_app_shell` subfolder):

```bash
npx ng add @angular-architects/module-federation@16.0.4 --type host --project remote_app_shell --port 3200
```

Then start the server (by running this in the `remote_app_shell` subfolder):

```bash
npx ng serve
```

Point your browser to <http://localhost:3200/>.\
This should show the vanila Angular application.

1. replace the [app.component.html](./remote_app_shell/src/app/app.component.html) `<p>Host application</p>`,
2. add `routerLink` to navigate to `/mfe1` and the router outlet.

## Microfrontend

### How to run the MFE1 sample

```bash
cd mfe1
npm install
npx ng serve
```

### How to rebuild the MFE sample yourself

```bash
npm install @angular/cli@16.2.10 -g
ng new mfe1 --prefix mfe1 --routing --style scss
npm uninstall @angular/cli -g

cd mfe1
npm install
```

Install Angualar Material (run this in the `mfe1` subfolder)

```bash
npx ng add @angular/material
```

Expose the module (run this in the `mfe1` subfolder).

```bash
npx ng add @angular-architects/module-federation@16.0.4 --type remote --project mfe1 --port 4221
```

Then start the server (run this in the `mfe1` subfolder):

```bash
npx ng serve
```

Point a new browser tab to <http://localhost:4221/>.\
This should show the vanila Angular application. It shows the same micro-frontend as a standalone Angular application.

Replace the [app.component.html](./mfe1/src/app/app.component.html) `<p>Standalone Micro-frontend 1</p>` and the router outlet.

Create the module that will become the micro-frontend exposed for remote consumption:

```bash
npx ng generate module module-a --project mfe1 --routing --routing-scope Child
```

Add simple _home_ component to the module A:

```bash
npx ng generate component module-a/home --standalone --skip-tests --style css --project mfe1
```

Add simple _feature_ component to the module A (the one that will require dependency injection later):

```bash
npx ng generate component module-a/feature --standalone --skip-tests --style css --project mfe1
```

Add a router link to the Home component to navigate to the Feature component.

To test the micro-frontend as a standalone Angualar app, point your browser to <http://localhost:4221/>

## Register Micro-frontend in the App Shell

Add webpack exposes/remotes configuration. The vital configuration is spread across following files:

1. /mfe1/webpack.config.js -> see the `exposes` field\
1. /mfe1/src/app/module-a/module-a.module.ts -> add the `export { ModuleAModule as MfeModule };` to make it correspond to the `webpack.config.js` below
1. /mfe1/src/app/app.module.ts add `ModuleAModule` to module imports
1. /remote_app_shell .. webpack.config.js -> see the `remotes` field (fix the port to `4221`)\
1. /remote_app_shell .. app-routing.module.ts -> adds the lazy-loaded mfe1 routes
1. /remote_app_shell .. declarations.d.ts -> declare the remote module for the tsc compiler's sake

See commit # TBD for more detail.

Re-start the server (if it is running, kill it with Ctrl+C and run this in the `mfe1` and `remote_app_shell` subfolders respectively):

```bash
npx ng serve
```
