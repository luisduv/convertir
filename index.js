class convertir {
    constructor() {
        this.unidad = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
        this.DiezDieciseis = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis'];
        this.decenas = ['treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
        this.elMensage = document.getElementById('mensage');
        this.addListener();
    }

    addListener(){
        let elInput = document.getElementById('campo-numero');
        elInput.addEventListener('keyup',() => {

            if(elInput.value !== ''){
                this.convertiraTexto(elInput.value);
            }
            else{
                this.elMensage.innerText = ''
            }

        });
    }

    convertiraTexto(numero){
      numero = this.eliminarCero(numero);
        if(!this.validarNumero(numero)){
            this.elMensage.innerText='Solo se aceptan numeros enteros positivos';
            return;
        }
        this.elMensage.innerText = this.nombreNumero(numero);

    }

    eliminarCero(numero){

        let i = 0;
        let esCero = true;
        for ( i = 0; i < numero.length; i++) {
            if(numero.charAt(i)!=0){
                esCero = false;
                break;
            }
        }
        return esCero ? '0' : numero.substr(i);
    }

    validarNumero(numero){

        if(isNaN(numero) || numero === ''|| numero===undefined){
            return false;
        }
        if(numero.indexOf('.')>=0){
            return false;
        }
        if(numero.indexOf('-')>=0){
            return false;
        }
        return true;
    }

    nombreNumero(numero){
        numero = this.eliminarCero(numero);
        if(numero.length === 1){
            return this.dameUnidad(numero);
        }

        if(numero.length === 2){
            return this.dameDecena(numero);
        }

        if(numero.length === 3){
            return this.dameCentena(numero);
        }

        if(numero.length < 7){
            return this.dameMiles(numero);
        }

        if(numero.length < 13){
            return this.damePeriodo(numero,6,'millon');
        }

        if(numero.length < 19){
            return this.damePeriodo(numero,12,'billon');
        }


        return'numero demasiado grande';

    }

    dameUnidad(numero){
        let numeroEntero = parseInt(numero);
        return this.unidad[numeroEntero];
    }

    dameDecena(numero){
        //let numeroEntero = parseInt(numero);
        let unidad = numero.charAt(1);
        if(numero<17){
            return this.DiezDieciseis[numero - 10]
        }
        if(numero<20){
            return 'dieci' + this.dameUnidad(unidad)
        }
        if(numero==20){
            return 'veinte'
        }
        if(numero >20 && numero<30){
            return 'veinti' + this.dameUnidad(unidad)
        }

        let nombre = this.decenas[numero.charAt(0) - 3];
        if(unidad > 0){
            return nombre +' y ' + this.dameUnidad(unidad)
        }
        return nombre;
    }

    dameCentena(numero){

        let name = '';
        let centena = numero.charAt(0);
        let decena = numero.substr(1);

        if(numero == 100){
            return 'cien';
        }

        switch (centena) {
            case '1':
                name = 'cineto'
                break;
                
            case '5':
                name = 'quinientos'
                break;

            case '7':
                name = 'setecientos'
                break;

            case '9':
                name = 'novecientos'
        }

        if(name === ''){
            name  = this.dameUnidad(centena) + 'cinetos';
        }
        if(decena > 0){
            name += ' ' + this.nombreNumero(decena);
        }
        return name;
    }

    dameMiles(numero){

        let name = 'mil';
        let largoMiles = numero.length - 3;
        let miles = numero.substr(0,largoMiles);
        let centena = numero.substr(largoMiles);

        if(miles > 1){
            name = this.nombreNumero(miles).replace('uno','un') + ' mil';
        }
        if(centena > 0){
            name += ' ' + this.nombreNumero(centena);
        }
        return name;
    }

    damePeriodo(numero,digitoDercha,nombrePeriodo){

        let name = 'un ' + nombrePeriodo;
        let largoPeriodo = numero.length - digitoDercha;
        let digitosPeriodo = numero.substr(0,largoPeriodo);//periodoMillon
        let digitosPrevios = numero.substr(largoPeriodo);

        if(digitosPeriodo > 1){
            name = this.nombreNumero(digitosPeriodo).replace('uno','un') + ' '+ nombrePeriodo + 'es';
        }
        if(digitosPrevios > 0){
            name += ' ' + this.nombreNumero(digitosPrevios);
        }
        return name;

    }






}

new convertir();