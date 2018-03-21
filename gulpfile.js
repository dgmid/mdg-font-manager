const 	gulp 			= require('gulp'),
		sass 			= require('gulp-sass'),
		rename 			= require('gulp-rename'),
		autoprefixer 	= require('gulp-autoprefixer'),
		sourcemaps 		= require('gulp-sourcemaps'),
		cssnano 		= require('gulp-cssnano'),
		iconutil 		= require('gulp-iconutil');



const	sassFile 		= 'app/scss/styles.scss',
		cssDest 		= 'dist/css';



gulp.task('sass', () => {

	return gulp.src(sassFile)
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(rename('styles.min.css'))
		.pipe(cssnano())
		.pipe(gulp.dest(cssDest))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest(cssDest));
});



gulp.task('icon', () => {

	gulp.src('./app/assets/Icon.iconset/icon_*.png')
	.pipe(iconutil('icon.icns'))
	.pipe(gulp.dest('./dist/assets/icon/'))
})



gulp.task('watch', ['sass'], () => {

	gulp.watch('app/scss/**/*.scss', ['sass']);
});
