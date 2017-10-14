(function(exports) {
    'use strict';
    // 参考 ./html-and-pug.js
    var addEditor = CodeMirror.fromTextArea(document.getElementById("add"), {
        lineNumbers: true,
        styleActiveLine: true,
        matchBrackets: true
    });
    var displayEditor = CodeMirror.fromTextArea(document.getElementById("display"), {
        lineNumbers: true,
        styleActiveLine: true,
        matchBrackets: true
    });
    //================================================================
    // 处理事件
    exports.write_file = function (text, cb) { $.post('/tools/notepad-write', { text: text }, cb); };
    $('form.notepad').submit(function(e) {
        e.preventDefault();
        var text = addEditor.getValue();
        console.log(text);
        exports.write_file(text, function (result) {
            console.log(result.status);  // return OK or Not
        });
    });
}).call(window, window.app = {});
