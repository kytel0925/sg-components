(function($){
    var valor = function(){
        return Date.now();
    }
    var getter = function(){
        return this.contexto_private;
    }

    var metodo = function(){
        console.log('WTF');
    }

    this.padre = Class.extend({
        init: function(){
            this.contexto_private = 'contexto privado';
            this.propiedad = 'se puede redeclarar';
            this.getter = getter;
            metodo();
        },

        otra_priedad: 'otro_valor',
        //Esto deberia de tener el mismo valor siempre
        puntero: valor
    });
})(jQuery);

(function($){
    var valor = function(){
        return "En otro contenxo: " + Date.now();
    }

    this.hijo = padre.extend({
        init: function(){
            this._super();
        },
        puntero: valor
    })
})(jQuery);

//test case
var _hijo = new hijo();
console.log(_hijo.puntero());
console.log(_hijo.getter());

var _padre = new padre();
console.log(_padre.puntero());
console.log(_padre.getter());