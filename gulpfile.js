const 	gulp 			= require('gulp'),
		sass 			= require('gulp-sass'),
		rename 			= require('gulp-rename'),
		autoprefixer 	= require('gulp-autoprefixer'),
		sourcemaps 		= require('gulp-sourcemaps'),
		cssnano 		= require('gulp-cssnano'),
		iconutil 		= require('gulp-iconutil')



const	appCss 			= 'app/scss/*.scss',
		cssDest 		= 'dist/css',
		apJs 			= 'app/js/*.js',
		jsDest 			= 'dist/js'



gulp.task('sass', () => {

	return gulp.src(appCss)
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(cssDest))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest(cssDest))
});



gulp.task('icon', () => {

	gulp.src('./app/assets/Icon.iconset/icon_*.png')
	.pipe(iconutil('icon.icns'))
	.pipe(gulp.dest('./dist/assets/icon/'))
	
	gulp.src('./app/assets/Icon.iconset/icon_128x128@2x.png')
	.pipe(rename('icon.png'))
	.pipe(gulp.dest('./dist/assets/icon/'))
})



gulp.task('watch', ['sass'], () => {

	gulp.watch('app/scss/**/*.scss', ['sass'])
})
