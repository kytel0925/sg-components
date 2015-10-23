/**
* SGComponent Clase base
*/
(function(){
    this.SGComponent = Class.extend({
        init: function(){
            this._name = 'SGComponent';
            this._author = 'Telmo Riofrio <telmo.riofrio@funiber.org>';
            this._callbacks = {};
            this._options = {};
            this._version = '0.0.1';
            
            this.name = function(){ return this._name; }
            this.author = function(){ return this._author; }
        },
        
        //Instance context
        callbacks: function(){ return this._name; },
        options: function(){ return this._options; },
        destroy: function(){ },
        events: function(){ return this._events; },
        version: function(){ return this._version; }
    });

    //Static context
    this.SGComponent.evalString = function(string){
            try{ return JSON.parse(string); }
            catch(ex){}

            try{ return eval("(" + string + ")") }
            catch(ex){}

            return {};
    };
    
    this.OtraMierda = this.SGComponent.extend({
        init: function(){
            this._super();
            
            this._name = 'Otro componente';
        }
    });
})();

var uno = new SGComponent();
uno.someShit = 'valor 1';
var dos = new OtraMierda();
dos.someShit = 'valor 2';

console.log(uno.name());
console.log(dos.name());

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