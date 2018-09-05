var gulp = require('gulp');
var gutil = require('gulp-util');
var tap = require('gulp-tap')
var MarkdownIt = require('markdown-it')
var fa = require('markdown-it-fontawesome');

var md = new MarkdownIt();

md.use(alerts);
md.use(fa);



md.renderer.rules.table_open = function (tokens, idx, options, env, self) {
    return '<div class="table-responsive">\n'
        + '<table class="table">\n';
};
md.renderer.rules.table_close = function (tokens, idx, options, env, self) {
    return '</table>\n'
        + '</div>\n';
};



gulp.task('build',function(){
    return gulp.src('articles/**/*.md')
    .pipe(tap(markdownToHtml))
    .pipe(gulp.dest('./dist'));

});

function markdownToHtml(file){
    var result  = md.render(file.contents.toString());
    file.contents = new Buffer(result);
    file.path = gutil.replaceExtension(file.path,'.html');
    return;
}

gulp.task('watch',function(){
    gulp.watch('**/*.md',['build']);
});

