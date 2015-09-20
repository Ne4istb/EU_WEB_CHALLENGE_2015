# Andriy Nechytailov. The Qualification stage of EU Web Challenge. Front-end (JavaScript).  Middle/Senior

## Solution
The actual solution is located in the "site" directory:
1) index.html, styles.css and background.png are core files.
2) "site/src" contains source files written using ES2015.  
3) "site/dist" contains compiled files.

## Tools
To build the solution were used Gulp, BabelJS, Browserify and UglifyJS2.
To verify the solution were used EsLint and JSCS.
To test the solution were used Mocha, Sinon and Chai.

## Scripts
If you want to run build scripts yourself:
1) Check if NodeJS and Gulp are installed
2) Run "npm run setup" in Terminal

### Available gulp tasks
* `gulp lint` - runs eslint and jscs
* `gulp test` - runs mocha unit tests
* `gulp browserify` - builds the script for browser
* `gulp compile` - runs uglify and generates minified script
* `gulp build` - runs browserify and compile
* `gulp` - default task, runs lint, test, build and compile tasks
