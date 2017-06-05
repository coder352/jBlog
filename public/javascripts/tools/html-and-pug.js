(function (exports) {
	'use strict';
    // The editor will be appended to the document body, will start empty, and will use the mode that we loaded.
    // 通过两个变量定义就能改变 Editor 的样式
    var htmlEditor = CodeMirror.fromTextArea(document.getElementById("html"), {
        lineNumbers: true,
        styleActiveLine: true,
        matchBrackets: true  // 这个加了 mode: "html", 以后识别效果就不是很好了
    });
    var pugEditor = CodeMirror.fromTextArea(document.getElementById("pug"), {
        lineNumbers: true,
        styleActiveLine: true,
        matchBrackets: true,
        mode: 'pug'
    });
    //================================================================
    // 针对 html2pug.pug 模块
	exports.convert_to_pug = function (html, cb) { $.post('/tools/html2pug-convert', { html: html }, cb); };
    $('form.html').submit(function (e) {
        e.preventDefault();
        var form = $(this);
        var html = htmlEditor.getValue();
        exports.convert_to_pug(html, function (result) {
            if (!/<html>/.test(html)) {
                result.pug = result.pug
                                .replace('html\n', '')
                                .replace(/^\s\s/, '')
                                .replace(/\n\s\s/, '\n');
            }
            if (!/<body>/.test(html)) {
                result.pug = result.pug
                                .replace(/.*body\n/, '')
                                .replace(/^\s\s/, '')
                                .replace(/\n\s\s/, '\n');
            };
            pugEditor.setValue(result.pug);
        });
    });
    //================================================================
    // 针对 pug2html.pug 模块
	exports.convert_to_html = function (pug, cb) { $.post('/tools/pug2html-convert', { pug: pug}, cb); };
    $('form.pug').submit(function (e) {
        e.preventDefault();
        var form = $(this);
        var pug = pugEditor.getValue();
        exports.convert_to_html(pug, function (result) {
            console.log(result.html);
            htmlEditor.setValue(result.html);
        });
    });
}).call(window, window.app = {});
