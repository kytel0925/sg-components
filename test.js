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

    var attach = function(component, element){
        element.sgComponent = component;
        component.domNode = element;
    }

    var setCustomComponent = function(){console.log('If you see this, you don\'t finish you work yet');}

    this.SGComponent = Class.extend({
        init: function(element, options, callbacks){
            this.callbacks = $.extend(this._callbacks, callbacks || {}, evalString($(element).attr('data-callbacks')));
            this.options = $.extend(this._options, options || {}, evalString($(element).attr('data-options')));
            //nos agregamos al arbol DOM
            attach(this, element);
            
            //Create the new reder node
            this._rawNode = $(this.protoRender);
            
            //Clear the element
            $(element).empty();
            //Equivalente a render de React
            $(element).append(this._rawNode);
            //Iniciamos el comoponente
            this.setCustomComponent();
        },

        domNode: null,
        _callbacks: {},
        _options: {},
        protoRender: "<span>redeclare this part</span>",
        setCustomComponent: setCustomComponent
    });
    
    //Static context shared methods
    this.SGComponent.evalString = evalString;
})(jQuery);

(function($){
    var callbacks = {
        onUpload: function(){},
        onUploadStart: function(){},
        onUploadEnd: function(){},
        onUploadSuccess: function(e, data){ console.log(data); },
        onUploadError: function(){},
        onUploadFailure: function(){},

        onProgress: function(e, data){console.log(parseInt(data.loaded / data.total * 100, 10));},
        onError: function(){},

        //Old callback for busy transaction
        onBusy: function(){}
    }

    var setCustomComponent = function(){
        var _rawUploader = this._rawNode;
        var options = this.options;
        var callbacks = this.callbacks;

        var inputFile = $('input[type=file]', _rawUploader);
        $('span.btn-label', _rawUploader).html(options.labels.ready);
        inputFile.fileupload(options);

        //https://github.com/blueimp/jQuery-File-Upload/wiki/Options#add
        //var mapCallbacks = ['fileuploadadd', 'fileuploadsubmit', 'fileuploadsend', 'fileuploaddone', 'fileuploadfail', 'fileuploadalways', 'fileuploadprogress', 'fileuploadprogressall.onProgress', 'fileuploadstart', 'fileuploadstop', 'fileuploadchange', 'fileuploadpaste', 'fileuploaddrop', 'fileuploaddragover', 'fileuploadchunksend', 'fileuploadfail', 'fileuploadalways'];
        var mapCallbacks = ['fileuploadadd', 'fileuploadsubmit', 'fileuploadsend', 'fileuploaddone->onUploadSuccess', 'fileuploadfail', 'fileuploadalways', 'fileuploadprogress', 'fileuploadprogressall->onProgress', 'fileuploadstart', 'fileuploadstop', 'fileuploadchange', 'fileuploadpaste', 'fileuploaddrop', 'fileuploaddragover', 'fileuploadchunksend', 'fileuploadfail', 'fileuploadalways'];
        $.each(mapCallbacks, function(index, mapCall){
            var _map = mapCall.split('->');
            (_map.length > 1) && inputFile.bind(_map[0], callbacks[_map[1]]);
        });
    }

    this.ButtonUploader = SGComponent.extend({
        init: function(element){
            this._super(element);
        },

        _options: {
            url: false,
            dataType: 'json',
            paramName: 'files[]',
            multipleUploads: null,
            formData: {},
            labels: {
                ready: 'Upload',
                uploading: 'Uploading'
            }
        },
        //Algo de documentacion por favor gracias
        _callbacks: callbacks,
        
        setCustomComponent: setCustomComponent,
        protoRender: "<span class='btn btn-success fileinput-button'><span class='btn-label'></span><input type='file' /></span>"
    });

    this.ButtonUploader.create = function(selector){
        $(selector).each(this.createEach);
    }

    this.ButtonUploader.createEach = function(index, element){
        return new ButtonUploader(element);
    }
})(jQuery);