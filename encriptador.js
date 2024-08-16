// variables

let palabra= "";


function condicionesIniciales () {

    asignarTextoElemento('h1','Mensaje Secreto');
    asignarTextoElemento('p','¿Qué quieres hacer?');
    
    //inhablitar cajon
    document.querySelector('#cajonTexto').setAttribute('disabled','true');
 
    //habilitar opciones
    document.getElementById('desencriptar').removeAttribute('disabled');

    //ocultar botones 
    ocultarBoton('reset');
    ocultarBoton('copiar');
}

function ocultarBoton(id) {
    const elemento = document.getElementById(id);
    elemento.style.display = 'none';
    return;
}

function mostrarBoton(id) {
    const elemento = document.getElementById(id);
    elemento.style.display = 'initial';
    return;
}

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function limpiarCaja() {
    let valorCaja = document.querySelector('#cajonTexto').value = '';
}

function verificarElemento(id) {
    const elemento = document.getElementById(id);
    if (elemento && elemento.disabled) {
        return true;
    } else if (elemento) {
        return false;
    } else {
        return null;
    }
}

/* -------- ENCRIPTAR -------- */

function encriptar(palabra) {
    // Convertir la palabra a minúsculas
    palabra = palabra.toLowerCase();
    
    // Objeto con las reglas de encriptación
    const reglas = {
        'a': 'ai',
        'e': 'enter',
        'i': 'imes',
        'o': 'ober',
        'u': 'ufat'
    }
    
    // Reemplazar cada vocal según las reglas
    let resultado = '';
    for (let i = 0; i < palabra.length; i++) {
        if (reglas[palabra[i]]) {
            resultado += reglas[palabra[i]];
        } else {
            resultado += palabra[i];
        }
    }
    
    return resultado;
}

function botonEncriptar () {
    if (verificarElemento('cajonTexto') == true) {

        //Habilitar cajon
        document.getElementById('cajonTexto').removeAttribute('disabled');

        // mostrar botones
        mostrarBoton("reset");
        mostrarBoton("copiar");

        //cambio de texto
        asignarTextoElemento('h1','Encriptador');
        asignarTextoElemento('p','Ingresa mensaje a encriptar');

    } else {
        let palabraOriginal = document.getElementById('cajonTexto').value;
        let palabraEncriptada = encriptar(palabraOriginal);

        //Seguimiento en consola
        console.log(`La palabra original es ${palabraOriginal}`);
        console.log(`Palabra encriptada: ${palabraEncriptada}`);
        
        //mostrar texto encriptado
        asignarTextoElemento('p',`El texto encriptado es:</p> <resaltado>"${palabraEncriptada}"</resaltado> </p> </p> Ingresa mensaje a desencriptar`);
        asignarTextoElemento('h1','Desencripta tu mensaje')
        
        //inhabilitar el boton de encriptar y habilitar el de desencriptar
        document.querySelector('#encriptar').setAttribute('disabled','true');
        document.getElementById('desencriptar').removeAttribute('disabled');

        //limpiar caja
        limpiarCaja();

        // Valor palabra
        palabra = palabraEncriptada
    }
    return;
}

/* -------- DESENCRIPTAR -------- */

function desencriptar(palabraEncriptada) {
    // Convertir la palabra a minúsculas
    palabraEncriptada = palabraEncriptada.toLowerCase();
    
    // Objeto con las reglas de desencriptación
    const reglas = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };
    
    // Reemplazar cada secuencia encriptada por su vocal correspondiente
    let resultado = palabraEncriptada;
    for (let clave in reglas) {
        resultado = resultado.split(clave).join(reglas[clave]);
    }
    
    return resultado;
}

function botonDesencriptar () {
    if (verificarElemento('cajonTexto') == true) {

        //Habilitar cajon
        document.getElementById('cajonTexto').removeAttribute('disabled');
        
        // mostrar botones
        mostrarBoton("reset");
        mostrarBoton("copiar");

        //deshabilitar boton encriptar
        document.querySelector('#encriptar').setAttribute('disabled','true');

        //cambio de texto
        asignarTextoElemento('h1','Desencriptador');
        asignarTextoElemento('p','Ingresa mensaje a desencriptar')
               
    } else {
        let palabraEncriptada = document.getElementById('cajonTexto').value;
        let palabraOriginal = desencriptar(palabraEncriptada);

        //mostrar texto desencriptado
        asignarTextoElemento('p',`El texto desencriptado es:</p> <resaltado>"${palabraOriginal}"</resaltado> </p>Ingresa mensaje a encriptar`)
        asignarTextoElemento('h1','Encripta tu mensaje')

        //inhabilitar el boton de desencriptar y habilitar el de encriptar
        document.querySelector('#desencriptar').setAttribute('disabled','true');
        document.getElementById('encriptar').removeAttribute('disabled');

        //limpiar caja
        limpiarCaja();

        // Valor palabra
        palabra = palabraOriginal
    }
    return;
}

/* -------- RESET -------- */

function botonReset () {
    condicionesIniciales();
}

/* -------- COPIAR -------- */

function copiarAlPortapapeles(texto) {
    navigator.clipboard.writeText(texto).then(function() {
        console.log('Texto copiado al portapapeles');
    }).catch(function(err) {
        console.error('Error al copiar texto: ', err);
    });
}

function botonCopiar () {
    let copiar = palabra;
    copiarAlPortapapeles(copiar);
    console.log(`La palabra copiada es ${copiar}`);
    asignarTextoElemento('p','Mensaje copiado')
    }

/* ----- >> EJECUCIÓN << ----- */  

condicionesIniciales();

