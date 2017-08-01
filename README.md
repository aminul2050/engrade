# Engrade
Engrade Angular v4 project with nodeJs

## Development server
Run `npm update` to update node modules or install npm first if not installed yet

Run `npm install` in project root directory to install dependencies

Set `backendBaseUrl: 'http://127.0.0.1:8080/backend'` to sec/environments/environment.ts for development mode

Run `ng serve --open` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build
To change out/build directory `.angular-cli.json` outDir

Set `backendBaseUrl: 'http://127.0.0.1:8080/backend'` to sec/environments/environment.prod.ts for production mode
Run `ng build -prod --base-href=http://127.0.0.1:8090/engrade` to build the project in production. Find the build project in outDir. By Default its engrade now. Copy the directory and paste in tomcate webapp. It should work now.
Note: --base-href is very important. It will be the root folder in your instance

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


