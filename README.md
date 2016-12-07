# gulp-setting
Personal setting for the Gulp. 

## How to use it

Download the source Code in Master Branch	
Follow the instruction in Gulpfile.js `Comment`	

### Install Gulp 
	Install Gulp Globel
	```npm install -g gulp```  	
	npm install gulp		Install Gulp in Current project
	npm install gulp --save-dev 
### Install the 'Plugins' for Gulp 
	npm install gulp-imagemin (This one is very slow)
	gulp-ruby-sass gulp-minify-css
	gulp-jshint gulp-uglify 
	gulp-rename gulp-concat gulp-clean gulp-sourcemaps gulp-csso 
	gulp-watch gulp-autoprefixer gulp-zip gulp-compass gulp-gzip copy-dir tiny-lr
	gulp-livereload gulp-webserver --save-dev
	gulp-jscs
### Fixing the speed issue
	1.Change the config setting

	npm config set registry http://registry.cnpmjs.org  
	npm info underscore
	If the setting is right, it will shows some response

	2.Command Line

	npm --registry http://registry.cnpmjs.org info underscore
	3.edit node_modules\npm.npmrc, by adding following Code.

	registry = http://registry.cnpmjs.org
	If the npm address is does not work, then use taobao's npm, which is stable.

	TaoBao npm :https://registry.npm.taobao.org
	
	###
	????
	ruby node.js git chrome livereload
	
### Install Programming Language	
	SASS (ruby)
		$ gem sources --remove https://rubygems.org/
		$ gem sources -a https://ruby.taobao.org/ 
		If your system does not support https,Please change the sources to be":gem sources -a http://gems.ruby-china.org
		$ gem sources -l
		*** CURRENT SOURCES ***

		https://ruby.taobao.org
		# Make sure it just contain "ruby.taobao.org"
		$ gem install sass `//Install the SASS`
		
		http://www.ruanyifeng.com/blog/2012/06/sass.html
	compass (ruby)
### Install compass
	gem install compass
		http://www.ruanyifeng.com/blog/2012/11/compass.html
		https://segmentfault.com/a/1190000004190261
	



	npm install http-server (-g)
		http-server	Enble the local server
	
	http://localhost:8080/index.html
	http://YOUR_IP:8081/

### Mapping
Location : Maps Folder
Setting by CSS file 

### LiveReload Extensions 
Environment : Chrome
If you are in China, Drag the livereload.crx into Chrome. 
If you are not in China, Download this Extension on chrome web store


### Run gulp
	cd project `Find the location`
	gulp code 	`Start to coding`