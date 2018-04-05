const 	gulp 			= require('gulp'),
		sass 			= require('gulp-sass'),
		rename 			= require('gulp-rename'),
		autoprefixer 	= require('gulp-autoprefixer'),
		sourcemaps 		= require('gulp-sourcemaps'),
		cssnano 		= require('gulp-cssnano'),
		uglify 			= require('gulp-uglify-es').default,
		pump 			= require('pump'),
		iconutil 		= require('gulp-iconutil'),
		sequence 		= require('run-sequence'),
		exec 			= require('child_process').exec



const	sourceCss 		= 'app/scss/*.scss',
		destCss 		= 'dist/css',
		sourceJs 		= 'app/js/*.js',
		destJs 			= 'dist/js',
		sourceHtml 		= 'app/html/*.html',
		destHtml 		= 'dist/html',
		sourceSvg 		= 'app/assets/svg/*.svg',
		destSvg 		= 'dist/assets/svg'



gulp.task('sass', () => {

	return gulp.src(sourceCss)
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(destCss))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest(destCss))
})



gulp.task('html', () => {
	
	return gulp.src(sourceHtml)
		.pipe(gulp.dest(destHtml))
})



gulp.task('js', (cb) => {
	
	pump([
			gulp.src(sourceJs),
			sourcemaps.init(),
			uglify(),
			rename({suffix: '.min'}),
			sourcemaps.write('./maps'),
			gulp.dest(destJs)
		],
		
		cb()
	)
})



gulp.task('svg', () => {
	
	return gulp.src(sourceSvg)
		.pipe(gulp.dest(destSvg))
})



gulp.task('icns', () => {

	return gulp.src('./app/assets/Icon.iconset/icon_*.png')
		.pipe(iconutil('icon.icns'))
		.pipe(gulp.dest('./dist/assets/icon/'))
})



gulp.task('icon', () => {	
	
	return gulp.src('./app/assets/Icon.iconset/icon_128x128@2x.png')
		.pipe(rename('icon.png'))
		.pipe(gulp.dest('./dist/assets/icon/'))
})



gulp.task('json', (cb) => {
	
	exec('php ./app/json/generate-json.php', (err, stdout, stderr) => {
		
		if (err) throw err
		else cb()
	})
})



gulp.task('package', (cb) => {
	
	exec('electron-packager . --electron-version=1.6.2 --overwrite --platform=darwin --arch=x64 --icon=dist/assets/icon/icon.icns --ignore="app/*|gulpfile\.js|README\.md" --prune=true --out=release-builds', (err, stdout, stderr) => {
		
		if (err) throw err
		else cb()
	})
})



gulp.task('build', () => {
	
	sequence(
		'sass',
		['html', 'js', 'svg'],
		'json',
		'icns',
		'icon',
		'package'
	)
})



gulp.task('watch', ['html', 'js', 'svg', 'sass'], () => {
	
	gulp.watch('app/html/**/*.html', ['html'])
	gulp.watch('app/js/**/*.js', ['js'])
	gulp.watch('app/assets/svg/**/*.svg', ['svg'])
	gulp.watch('app/scss/**/*.scss', ['sass'])
})
