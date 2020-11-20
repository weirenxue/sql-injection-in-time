$(function() {
    $('#sql-syntax').on('input', function(){
        let codeTag = $(document.createElement('code')).addClass('sql').text(this.value);
        $('#sql-preview').html(codeTag);
        injection();
        renderCodeBlock();
    });

    $('.param-value, .param-name').on('input', function(){
        injection();
        renderCodeBlock();
    });
    
    initCase();
});

function injection(){
    let originSQL = $('#sql-syntax').val();
    let injectedSQL = originSQL;
    tbodyTr = $('tr', 'tbody');
    for(i = 0; i < tbodyTr.length; i++) {
        let paramName = $('.param-name' , $(tbodyTr[i])).val().trim();
        if(paramName === "")
            continue;
        let paramValue = $('.param-value' , $(tbodyTr[i])).val();
        injectedSQL = injectedSQL.replace(paramName, paramValue);
    }
    let codeTag = $(document.createElement('code')).addClass('sql').text(injectedSQL)
    $('#sql-result').html(codeTag);
}

window.onload = function() {
    renderCodeBlock()
};

function renderCodeBlock() {
    if (window.hljs) {
        window.hljs.initHighlighting.called = false;
        window.hljs.initHighlighting();
    } else {
        let script = document.createElement('script');
        script.onload = () => window.hljs.initHighlighting();
        script.src = './plugin/highlight/highlight.min.js';
        document.body.appendChild(script);
    }
}


