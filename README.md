# NgCervisia


## How to get starting 

### Prerequisites
* Operating system with a user that has a home directory, called ${HOME}
* [Node.js >= 9.2.0, with builtin NPM](https://nodejs.org/en/)
* [Rustup installed, with builtin rustc and cargo](https://www.rustup.rs/)
* Angular-CLI installed via NPM: npm install -g @angular/cli 

### Running Backend & Frontend
#### Frontend
* git clone https://github.com/n3phtys/ng-cervisia
* cd ng-cervisia
* npm install
* ng build
* please note the directory path, used as ${FRONTEND} afterwards in this README
* if you actively develop, use 'ng build --watch' to automatically compile the frontend on each file save

#### Backend
* git clone https://github.com/n3phtys/cervisia-server
* cd cervisia-server
* cargo run
* edit file '${HOME}/.cervisia-server/Settings.toml' and set variable 'web_path = "${FRONTEND}/dist"' for the Backend to find the correct Frontend files. This step has to be done only once per machine
* visit localhost:8080 in your browser. The frontend page should appear






## Screenshots

Current work in progress of frontend:

### Userselection

![Userselection Screen](https://github.com/n3phtys/ng-cervisia/blob/master/doc/cervisia6userselection.png)

### Usermanagement

![Usermanagement Screen](https://github.com/n3phtys/ng-cervisia/blob/master/doc/cervisia6usermanagement.png)

### Bills

![Billmanagement Screen](https://github.com/n3phtys/ng-cervisia/blob/master/doc/cervisia6billmanagement.png)




# Angular CLI based README:

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.5.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
