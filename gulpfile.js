const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const babel = require('babel/register');
const plugins = require('gulp-load-plugins')();

function unitTests() {
    return gulp.src(['tests/config/setup.js', 'tests/unit/**/*.js'])
        .pipe(plugins.mocha({
            reporter: 'spec',
            compilers: { js: babel }
        }));
}

gulp.task('lint', function () {
    return gulp.src(['site/src/**/*.js', 'tests/**/*.js'])
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.format())
        .pipe(plugins.eslint.failAfterError())
        .pipe(plugins.jscs());
});

gulp.task('test:unit', function () {
    return unitTests();
});

gulp.task('browserify', function () {
    return browserify({
        entries: './build.js',
        debug: true,
        transform: [babelify]
    })
        .bundle()
        .pipe(source('lib-build.js'))
        .pipe(gulp.dest('site/dist'));
});

gulp.task('compile', function () {
    return gulp.src('site/dist/lib-build.js')
        .pipe(plugins.uglify())
        .pipe(plugins.rename({ extname: '.min.js' }))
        .pipe(gulp.dest('site/dist'));
});

gulp.task('build', plugins.sequence('browserify', 'compile'));
gulp.task('test', plugins.sequence('build', 'test:unit'));
gulp.task('default', plugins.sequence('lint','test'));
