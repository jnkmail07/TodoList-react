# Todo List App
A single page Todo List web app, built using various technologies [ React + redux, Node.js, Javascript, Gulp, Jest, Bootstrap].
The app allows the user the following capabilities:
 * Add a new todo, which contains:
  * ID
  * Text
  * Last Modified Date
  * Status
 * Click interaction to toggle status of todos from active->complete and vice-versa.
 * Delete todos
 * Retrieve deleted todos and place them back in the active queue.

## Setting up dev environment
### Prerequisites

 1. Nodejs >= v4.2.1
 1. Gulp
 ```
 npm install gulp -g
 ```
 1. Bower
 ```
 npm install bower -g
 ```

### Setup

  1. Install node modules
  ```
  npm install
  ```
  1. Install bower components
  ```
  bower install
  ```

  * Note: Please use npm install to install any module dependencies (ie. through2), in case errors arise.

### Build and serve UI
Launch [Todo List](http://localhost:3002/) in a browser.
```shell
gulp serve
```

### Run Jest Unit tests
```shell
gulp test
```

### Add Javascript modules

```shell
npm install <module name> --save
```

### Add SASS library or font
```shell
bower install <module name> --save
```

### Future enhancements
* es5 => es2015
* Gulp => Webpack
* Increase unit test coverage
* e2e tests using webdriver.io

### Configure IDE
IntelliJ IDEA 15.x Preferences

#### Configure Languages & Frameworks Preferences

In Preferences -> Languages & Frameworks -> Javascript, select 'JSX Harmony' as the Javascript Language Version.

#### Configure Code Quality Tools

In Preferences -> Languages & Frameworks -> Javascript -> Code Quality Tools, select and enable ESLint.
