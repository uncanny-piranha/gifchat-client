(function(){
  var gulp  = require('gulp');
  var $     = require('gulp-load-plugins')({lazy:false});
  var del   = require('del');
  var wiredep = require('wiredep');


var paths = {
  index: './client/index.html',
  root: './client',
  html: './client/**/*.html',
  scripts: './client/app/**/*.js',
  styles: './client/app/**/*.css',
  bower: './client/bower_components',
  images: './client/images/**/*',
  templates: ['./client/**/*.html', '!./client/bower_components/**/*.html']
};

var dist = {
  root: './dist',
  index: './dist/index.html',
  scripts: './dist/scripts',
  styles: './dist/styles',
  bower: './dist/bower_components',
  images: './dist/images',
  templates: './dist/scripts'

};

var templates = {
 controller: './templates/*'
};

var options = {
  templates: {
    name: 'templates.js',
    options: {
      module: 'gifchatClientApp'
    }
  },
  inject: {
    scripts: {
      relative: true,
      name: "app",

    },
    styles: {
      relative: true,
      name: "styles"
    }
  }
}
// put colon:dev on stuff that doenst have a :dist on it
gulp.task('default', $.sequence('inject', 'wire', 'server', 'watch'));
gulp.task('server', startServerDev);
gulp.task('watch', startWatch);
gulp.task('inject', startInject);
gulp.task('wire', wireBower);
// ==================================
gulp.task('controller', makeController);
gulp.task('dist', $.sequence('build', 'server:dist'));
gulp.task('server:dist', startServerProd);
gulp.task('build', $.sequence('clean','copy', ['templates:dist','styles:dist','scripts:dist','image:dist','bower:dist'], 'inject:dist', 'wire:dist'));
gulp.task('wire:dist', wireBowerDist);
gulp.task('styles:dist', distStyles);
gulp.task('bower:dist', distBowerFiles);
gulp.task('inject:dist', injectDist);
gulp.task('scripts:dist', distScripts);
gulp.task('image:dist', distImages);
gulp.task('copy',copyFiles);
gulp.task('templates:dist', distTemplates);
gulp.task('clean', del.bind(null, ['!.git*','./dist/**/*']));


function startServerDev(){
  process.env.NODE_ENV = 'development';
  require('./server');

}
function startServerProd(){
  process.env.NODE_ENV = 'production';
  require('./server');

}
function startWatch(){
  $.livereload();
  $.livereload.listen();
  gulp.watch('./client/app/**/*.css', $.livereload.changed);
  gulp.watch('./client/app/**/*.js', $.livereload.changed);
  gulp.watch('./client/**/*.html', $.livereload.changed);
}

function startInject(){
  var target  = gulp.src( paths.index );
  var scripts = gulp.src( paths.scripts, {read:false} );
  var styles  = gulp.src( paths.styles, {read:false} );

  return target
    .pipe( $.inject( scripts,  options.inject.scripts ) )
    .pipe( $.inject( styles,  options.inject.styles ) )
    .pipe( gulp.dest( paths.root ) );
}
function wireBower(){
  var wire = wiredep.stream;
  return gulp.src(paths.index)
    .pipe(wire({directory: paths.bower}))
    .pipe(gulp.dest(paths.root));

}
function wireBowerDist(){
  var wire = wiredep.stream;
  return gulp.src(dist.index)
    .pipe(wire({directory: dist.bower}))
    .pipe(gulp.dest(dist.root));

}
function makeController(){
  var values = {};
  // console.log(this.tasks.controller.args);
  // console.log(JSON.stringify(arguments[0]);
  // values.name = this.args];
  return gulp.src(templates.controller)
    // .pipe($.template(values))
    .pipe($.rename('about.controller.js'))
    .pipe(gulp.dest('./client/app/core/controllers'));
}

function distStyles() {
  return gulp.src(paths.styles)
    .pipe($.concat('app.min.css'))
    .pipe(gulp.dest(dist.styles));
}
function distScripts() {
  return gulp.src(paths.scripts)
    .pipe($.concat('app.min.js'))
    .pipe(gulp.dest(dist.scripts));
}
function copyFiles() {
  return gulp.src(paths.root + '/*.*')
    .pipe(gulp.dest(dist.root));
}
function distBowerFiles() {
  return $.bower(paths.bower)
  .pipe(gulp.dest(dist.bower));
}
function injectDist(){
  var target = gulp.src( dist.index ) ;
  var scripts = gulp.src( dist.scripts + '/*.js' );
  var styles = gulp.src( dist.styles + '/*.css' );

  return target
    .pipe( $.inject( scripts,  options.inject.scripts ) )
    .pipe( $.inject( styles,  options.inject.styles ) )
    .pipe(gulp.dest(dist.root));
}
function distImages() {
  return gulp.src(paths.images)
    .pipe($.image())
    .pipe(gulp.dest(dist.images));
}
function distTemplates() {
  return gulp.src(paths.templates)
    .pipe($.angularTemplatecache(options.templates.name, options.templates.options))
    .pipe(gulp.dest(dist.scripts));
}
})();
