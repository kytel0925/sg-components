var ButtonUploader = {
    someShit: 'someShit',
    new: function(selector){
        //Aqui viene mucho codigo encapsulable
        $(selector).each(this.set);
    },
    
    set: function(index, element){
        var options = SGComponent.evalString(element.getAttribute('data-options'));
        var callbacks = SGComponent.evalString(element.getAttribute('data-callbacks'));
        
        $(element).empty();
        
        var _rawUploader = $("<span class='btn btn-success fileinput-button'><span class='btn-label'></span><input type='file' /></span>");
        $('span.btn-label', _rawUploader).html(options.labels.ready);
        
        $('input[type=file]', _rawUploader).fileupload({
            url: options.url,
            dataType: 'json',
            done: function(e, data){
                console.log(e); console.log(data);
            },
            progressall: function(e, data){
                var progress = parseInt(data.loaded / data.total * 100, 10);
                /*$('#progress .progress-bar').css(
                    'width',
                    progress + '%'
                );*/
                console.log(progress);
            }
        });
        
        $(element).append(_rawUploader);
    }
}

var SGComponent = {
    
    evalString: function(string){
        try{ return JSON.parse(string); }
        catch(ex){}

        try{ return eval("(" + string + ")") }
        catch(ex){}
        
        return {};
    }
}