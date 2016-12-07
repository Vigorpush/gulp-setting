
var gulp = require('gulp');
    imagemin = require('gulp-imagemin'),       //图片压缩
    sass = require('gulp-ruby-sass'),          //sass
    minifycss = require('gulp-minify-css'),    //css压缩
    jshint = require('gulp-jshint'),           //js检查
    uglify  = require('gulp-uglify'),          //js压缩
    rename = require('gulp-rename'),           //重命名
    concat  = require('gulp-concat'),          //合并文件
    clean = require('gulp-clean'),             //清空文件夹
	sourcemaps = require('gulp-sourcemaps');	//加入到SASS编译中，否则会出错
	csso = require('gulp-csso');				//优化CSS
	//htmlmin = require('gulp-html');
	 watch = require('gulp-watch');				//监视改动
	autoprefixer = require('gulp-autoprefixer');//添加浏览器前缀
	zip = require('gulp-zip');					//打包
	jscs = require('gulp-jscs');				// 修改js的错误
	compass = require('gulp-compass');			//compass
	gzip = require('gulp-gzip');				
	copyDir = require('copy-dir');
	tinylr = require('tiny-lr'),               //刷新页面
    server = tinylr(),
    port = 35729,
    livereload = require('gulp-livereload');   //livereload
	webserver = require('gulp-webserver'); 		// 本地服务器
	
//检查测试
gulp.task('test',function(){
    console.log('hello world');
});

//SASS样式处理
var cssSrc = './src/sass/*.scss',
	cssDst = './dist/css';
gulp.task('sass', () =>
	sass(cssSrc, {sourcemap: true})
	.on('error', sass.logError)
	// for inline sourcemaps
	.pipe(sourcemaps.write())
	// for file sourcemaps
	.pipe(sourcemaps.write('maps', {
		includeContent: false,
		sourceRoot: '../src/sass/'
		}))
	.pipe(concat('style.css'))
	.pipe(gulp.dest(cssDst))	//输出css
	
	.pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
	.pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, 	//是否美化属性值 默认：true 像这样：
							//-webkit-transform: rotate(45deg);
							//        transform: rotate(45deg);
            remove:true 	//是否去掉不必要的前缀 默认：true 
        }))
	.pipe(csso())
    .pipe(gulp.dest(cssDst))
	.pipe(livereload(server))
);


//CSS样式处理
gulp.task('css',function(){
var cssSrc = './src/css/**/*.css',
	cssDst = './dist/css';

    return gulp.src(cssSrc)

	.pipe(gulp.dest(cssDst))	//输出css
	.pipe(rename({ suffix: '.min' }))
	.pipe(minifycss())
	
    .pipe(gulp.dest(cssDst))
	.pipe(livereload(server))
});

//HTML处理
gulp.task('html',function(){
	var htmlSrc = './src/*.html',
        htmlDst = './dist/';

    return gulp.src(htmlSrc)
		//.pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(htmlDst))
        .pipe(livereload(server))
});


//图片处理
gulp.task('img',function(){
	var imgSrc = './src/images/**/*',
        imgDst = './dist/images';
    gulp.src(imgSrc)
        .pipe(imagemin())
        .pipe(livereload(server))
        .pipe(gulp.dest(imgDst));
});

//js处理
gulp.task('js',function(){
	var jsSrc = './src/js/*.js',
        jsDst ='./dist/js';
	gulp.src(jsSrc)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        //.pipe(concat('*.js'))
        .pipe(gulp.dest(jsDst))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(livereload())
        .pipe(gulp.dest(jsDst));
});


// Reporting & fixing & failing on lint error
gulp.task('fixjs', () => {
    return gulp.src('src/*.js')
        .pipe(jscs({fix: true}))
        .pipe(jscs.reporter())
        //.pipe(jscs.reporter('fail'))
        .pipe(gulp.dest('.'));
});


// 清空图片、样式、js
gulp.task('clean', function() {
    gulp.src(['./dist/css', './dist/js', './dist/images'], {read: false})
        .pipe(clean());
});

// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', ['clean'], function(){
    gulp.start('html','css','sass','js','img');
});

//打包可执行代码
gulp.task('zip', () => {
	return gulp.src('./dist/**/*.*')
		.pipe(zip('archive.zip'))
		.pipe(gulp.dest('.'));
});

//打包原代码
gulp.task('zipcode', () => {
	return gulp.src('./src/**/*.*')
		.pipe(zip('archive.zip'))
		.pipe(gulp.dest('.'));
});
//gzip 代码
gulp.task('gzip',function(){
	gulp.src('./dist/*', {buffer: false}) 
	.pipe(gzip())
	.pipe(gulp.dest('.'));
});
//compass
gulp.task('compass', function() {
    gulp.src('/src/compass/*.scss')
        .pipe(compass({
            config_file: 'config.rb',
            css: './dist/css/',
            sass: './src/compass/',
            comments: true
        }))
		
		.pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, 	//是否美化属性值 默认：true 像这样：
							//-webkit-transform: rotate(45deg);
							//        transform: rotate(45deg);
            remove:true 	//是否去掉不必要的前缀 默认：true 
        }))
		.pipe(gulp.dest('./dist/css/'))	//输出css
		.pipe(rename({ suffix: '.min' }))
		.pipe(minifycss())
        .pipe(gulp.dest('./dist/css/'));
});


// 监听任务 运行语句 gulp watch
gulp.task('watch',function(){

    server.listen(port, function(err){
        if (err) {
            return console.log(err);
        }
		//livereload.listen(8080);
		//var server = livereload();
		//livereload.listen();
        // 监听html
        gulp.watch('./src/*.html', function(event){
            gulp.run('html');
			server.changed(event.path);
        })

        // 监听css
        gulp.watch('./src/css/**/*.css', function(event){
            gulp.run('css');
			server.changed(event.path);
        });
		
		// 监听sass
        gulp.watch('./src/sass/*.scss', function(event){
            gulp.run('sass');
			server.changed(event.path);
        });
		
		// 监听compass
		gulp.watch('./src/compass/*.scss', function(event){
            gulp.run('compass');
			server.changed(event.path);
        });

        // 监听images
        gulp.watch('./src/images/**/*', function(event){
            gulp.run('images');
			server.changed(event.path);
        });

        // 监听js
        gulp.watch('./src/js/*.js', function(event){
            gulp.run('js');
			server.changed(event.path);
        });

    });
});


gulp.task('webserver', function() {
  gulp.src( './dist/' ) // 服务器目录（./代表根目录）
  .pipe(webserver({ // 运行gulp-webserver
    livereload: true, // 启用LiveReload
    open: false // 服务器启动时自动打开网页
  }));
});

gulp.task('code',['webserver','watch']);

	/*
		project(项目名称)
		|–.git 通过git管理项目会生成这个文件夹
		|–node_modules 组件目录
		|–dist 发布环境
			|–css 样式文件(style.css style.min.css)
			|–images 图片文件(压缩图片)
			|–js js文件(main.js main.min.js)
			|–index.html 静态文件(压缩html)
		|–src 生产环境
			|–sass sass文件
			|–images 图片文件
			|–js js文件
			|–index.html 静态文件
		|–.jshintrc jshint配置文件
		|–gulpfile.js gulp任务文件
	*/
