/**
* SGComponent Clase base
*/
(function($){
    var evalString = function(string){
        try{ return JSON.parse(string); }
        catch(ex){}

        try{ return eval("(" + string + ")") }
        catch(ex){}

        return {};
    }
    
    this.SGComponent = Class.extend({
        init: function(element, options, callbacks){
            var callbaks = $.extend({
                onClick: function(){}
            }, callbacks || {}, evalString($(element).attr('data-callbacks')));
            
            var options = $.extend({
                url: null
            }, options || {}, evalString($(element).attr('data-options')));
            
            //Getters for private properties
            this.options = function(){ return options; }
            this.callbacks = function(){ return callbaks; }
            this.rawNode = function(){ return _rawNode; }
            
            //Private method
            var attach = function(){
                element.sgComponent = this;
                this.domNode = element;
            }
            
            //Create the new reder node
            var _rawNode = $(this.protoRender);
            
            //Clear the element
            $(element).empty();
            //Equivalente a render de React
            $(element).append(_rawNode);
            //nos agregamos al arbol DOM
            attach();
            
            //Iniciamos el comoponente
            this.setCustomComponent();
        },
        
        setCustomComponent: function(){console.log('If you see this, you don\'t finish you work yet');},
        protoRender: "<span>redeclare this part</span>",
    });
    
    //Static context
    this.SGComponent.evalString = evalString;
})(jQuery);

(function($){
    this.ButtonUploader = SGComponent.extend({
        init: function(element){
            var options = {
                labels: {
                    ready: 'Upload',
                    uploading: 'Uploading'
                }
            };
            this._super(element, options);
            
            //Some others initializations
        },
        
        setCustomComponent: function(){
            var _rawUploader = this.rawNode();
            var options = this.options();
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
        },
        protoRender: "<span class='btn btn-success fileinput-button'><span class='btn-label'></span><input type='file' /></span>"
    });
    
    this.ButtonUploader.create = function(selector){
        $(selector).each(this.createEach);
    };
    
    this.ButtonUploader.createEach = function(index, element){
        return new ButtonUploader(element);
    };
})(jQuery);