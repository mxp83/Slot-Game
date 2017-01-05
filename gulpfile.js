var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

gulp.task('sass', function(){
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass()) //use gulp-sass
		.pipe(cleanCSS())
		.pipe(concat('app.css'))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
    		stream: true
    	}));
});
gulp.task('javascript', function(){
	return gulp.src('app/js/**/*.js')
	.pipe(concat('app.js'))
	.pipe(gulp.dest('app/js'))
});

gulp.task('watch', ['browserSync', 'sass', 'javascript'], function(){
	gulp.watch('app/scss/**/*.scss', ['sass']);
	// other watchers if necessary
	gulp.watch('app/index.html',browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: 'app'
		},
	})
});