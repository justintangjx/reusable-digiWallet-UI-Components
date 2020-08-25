# Monorepo

This projects uses a monorepo (multiple packages) NPM setup/structure. Lerna is used to manage the build and dependencies of the monorepo.

The packages are located in `packages/${packageName}`, and all packages have an NPM package name of `@local/${packageName}`, the `@local` NPM namespace being used to avoid namespace clashes. This does preclude importing external/3rd-party projects with the `@local` namespace (which is unlikely).



# Commonly Used Commands

To install and manage dependencies

- `npx lerna bootstrap --ci`: This installs all dependencies for **all** package. Library sub-packages also builds their output (via a `postinstall` NPM script) so they can be imported. This should be done after a Git clone. This is similar to running `npm ci` (clears the `node_modules/` directory first before installing everything again) in the right dependency order for every package.

    - `npx lerna bootstrap`: Same as above, but is similar to `npm install` instead.

- `npx lerna bootstrap --scope=@local/${packageName}`: This installs the dependencies for a single package. It only works if all other dependencies in `packages/` have been installed and built.

- `npx lerna clean` or `npx lerna clean --scope=@local${packageName}`: Removes the `node_modules/` directory. Start from a clean slate if something went wrong.

- Inside `packages/${packageName}`, run `npm run build`: This runs the build script for the package. It requires that all dependencies have been installed and built. Useful for the current package being developed, or for adhoc frequent builds of a single package.

To build the app

- First, install all dependencies. Run `npx lerna bootstrap --ci` at the Git repo root if it is a new Git clone.

- Then, change the current working directory to `packages/app` and run `npm run build`. This will produce the build output in `packages/app/build/`, which is the bundled SPA (single page application).

- If running the build output is desired, run `packages/prod/server.js` with the right parameters (figure it out yourself), or see the Grunt scripts.

To run the app in dev mode

- First, install all dependencies. Run `npx lerna bootstrap --ci` at the Git repo root if it is a new Git clone.

- Then, change the current working directory to `packages/app` and run `npm start`. This will start the dev server.



# Running API Calls Outside of App

WIP



# Running Automated Tests

WIP



# Notes for Windows Users

VS Code users: Because NPM scripts are coded in bash and are invoked and run in a new shell process, the default shell needs to be set to something bash compatible.


