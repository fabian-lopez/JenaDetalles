

let Producto = function(img, tipo, detalle){
    this.imagen = img; //url
    this.tipo = tipo; // taza, tarro, ...
    this.detalle = detalle; // id 
}

let tipos = []; // filtros disponibles.


async function getAllTipos(){
    const promises = [];
    promises.push('taza');
    promises.push('tarro');
    promises.push('playera');
    tipos = await Promise.all(promises);
    return tipos;
}

async function generaControlesOpciones(tiposProductos){
    let tiposCrear = [...tiposProductos];
    let articulofiltros = document.querySelector(".filtros");

    tiposCrear.forEach(element => {
        let divOpcion = document.createElement("div");
        divOpcion.className = "form-check";

       // console.log(divOpcion);

        articulofiltros.appendChild(divOpcion);

        let checkInput = document.createElement("input");        
        checkInput.className = "form-check-input";
        checkInput.type = "checkbox";
        checkInput.id = `chb${element}`;
        checkInput.value = element;
        divOpcion.appendChild(checkInput);

        let checkLabel = document.createElement("label");        
        checkLabel.className = "form-check-label";
        checkLabel.for = `chb${element}`;
        checkLabel.textContent = element;

        divOpcion.appendChild(checkLabel);
    });

    let lCheckboxes = document.querySelectorAll(".form-check-input");
    lCheckboxes.forEach(chb => {
        chb.addEventListener('click', function(event){
            console.log("realizo click sobre chb");
            let lSeleccionados = [...document.querySelectorAll(".form-check-input")]
                .filter(input => input.checked)
                .map(input => input.value);

            if(lSeleccionados != null){
                if(lSeleccionados.length > 0)
                    buscaProductos(lSeleccionados);
                else
                    limpiaSeccion(document.querySelector(".imagenes"));
            }
        });
    });
}




function loadTazas() {
    let lProductos = [];
    lProductos.push(new Producto(
        'https://loremflickr.com/cache/resized/65535_52973403092_2bcce5c249_z_420_340_nofilter.jpg',
        'taza',
        'taza1'
    ));
    lProductos.push(new Producto(
        'https://loremflickr.com/cache/resized/65535_51394380169_208428dd43_z_420_340_nofilter.jpg',
        'taza',
        'taza2'
    ));
    lProductos.push(new Producto(
        'https://loremflickr.com/cache/resized/65535_51205267632_b732183c93_z_420_340_nofilter.jpg',
        'taza',
        'taza3'
    ));
    lProductos.push(new Producto(
        'https://loremflickr.com/cache/resized/65535_52008690043_4661a2fd3a_z_420_340_nofilter.jpg',
        'taza',
        'taza4'
    ));
    lProductos.push(new Producto(
        'https://loremflickr.com/cache/resized/65535_51540407572_26c9932725_420_340_nofilter.jpg',
        'taza',
        'taza5'
    ));

    return lProductos;
}

function loadTarros() {
    let lProductos = [];
    lProductos.push(new Producto(
        'https://loremflickr.com/cache/resized/4130_4833706190_9f6a0780d2_420_340_nofilter.jpg',
        'tarro',
        'tarro1'
    ));
    lProductos.push(new Producto(
        'https://loremflickr.com/cache/resized/65535_52928128800_0c74a6c5f2_z_420_340_nofilter.jpg',
        'tarro',
        'tarro2'
    ));
    lProductos.push(new Producto(
        'https://loremflickr.com/cache/resized/65535_52903951390_73cffc6068_z_420_340_nofilter.jpg',
        'tarro',
        'tarro3'
    ));
    lProductos.push(new Producto(
        'https://loremflickr.com/cache/resized/65535_52920804120_39bcfc5438_z_420_340_nofilter.jpg',
        'tarro',
        'tarro4'
    ));
    lProductos.push(new Producto(
        'https://loremflickr.com/cache/resized/7013_6500487417_e7de6cdb05_z_420_340_nofilter.jpg',
        'tarro',
        'tarro5'
    ));
    return lProductos;
}

function loadPlayeraBlanca() {
    let lProductos = [];
    lProductos.push(new Producto(
        'https://loremflickr.com/cache/resized/65535_52770924949_967fe32315_z_420_340_nofilter.jpg',
        'playera',
        'playera1'
    ));
    lProductos.push(new Producto(
        'https://loremflickr.com/cache/resized/65535_52928128800_0c74a6c5f2_z_420_340_nofilter.jpg',
        'playera',
        'playera2'
    ));
    lProductos.push(new Producto(
        'https://loremflickr.com/cache/resized/65535_52682761434_19dc34ea47_z_420_340_nofilter.jpg',
        'playera',
        'playera3'
    ));
    lProductos.push(new Producto(
        'https://loremflickr.com/cache/resized/7817_46261505165_d0734f3dc0_z_420_340_nofilter.jpg',
        'playera',
        'playera4'
    ));
    lProductos.push(new Producto(
        'https://loremflickr.com/cache/resized/65535_52450737287_db6bddaed9_z_420_340_nofilter.jpg',
        'playera',
        'playera5'
    ));
    return lProductos;
}


async function buscaProductos(opciones){

    let lProductos2 = await loadImages();
    console.log(lProductos2);
    lProductosFiltrados = [];

    if(opciones === null || opciones === undefined || opciones.length === 0){
        return lProductos2;
    }

    if(opciones.includes('taza')){        
        lProductosFiltrados = lProductosFiltrados.concat(lProductos2.filter(function(p){
            return p.tipo === 'taza'
        }));
    }

    if(opciones.includes('tarro')){        
        lProductosFiltrados = lProductosFiltrados.concat(lProductos2.filter(function(p){
            return p.tipo === 'tarro'
        }));
    }

    if(opciones.includes('playera')){        
        lProductosFiltrados = lProductosFiltrados.concat(lProductos2.filter(function(p){
            return p.tipo === 'playera'
        }));
    }

    console.log("que se esta iterando?",lProductosFiltrados)
    dibujaImagenes(lProductosFiltrados);
}

async function dibujaImagenes(listaFiltrada){
    let articulosGaleria = document.querySelector(".imagenes");

    console.log("limiando articulo/seccion");
    limpiaSeccion(articulosGaleria);

    console.log("empezando a iterar objetos");


    for(let o = 0; o < listaFiltrada.length; o++) {
        //console.log(listaFiltrada[o]);
        let divImagen = document.createElement("div");
        divImagen.className = "contenedorImagen";

        //console.log(divImagen);
        articulosGaleria.appendChild(divImagen);

        let newImg = document.createElement("img");
        newImg.className = "img-fluid";
        newImg.id = `img${listaFiltrada[o].detalle}`;
        newImg.alt = listaFiltrada[o].tipo;
        newImg.src = listaFiltrada[o].imagen;
        divImagen.appendChild(newImg);
    };
}


function limpiaSeccion(seccionLimpiar){

    while (seccionLimpiar.firstChild) {
        seccionLimpiar.removeChild(seccionLimpiar.firstChild);
    }

    seccionLimpiar.innerHtml = "";
    
}

async function loadImages(){
    let lTazas = loadTazas();
    let lProductos = [];

    if(lTazas != null && lTazas != undefined ){
        lProductos = lProductos.concat(lTazas);
    }

    let lTarros = await loadTarros();
    if(lTarros != null && lTarros != undefined ){
        lProductos = lProductos.concat(lTarros);
    }

    let lPlayeras = await loadPlayeraBlanca();
    if(lPlayeras != null && lPlayeras != undefined ){
        lProductos = lProductos.concat(lPlayeras);
    }

    let retorno = await Promise.all(lProductos);
    return retorno;
}


 //loadImages();









/*
var test = await fetch('https://loremflickr.com/json/420/340/tshirt',{
    method: 'GET', 
    mode: 'no-cors'
}); 
console.log(test); 
console.log(await function(){URL.createObjectURL(test.blob())});



var test = await fetch('https://picsum.photos/id/0/info',{
    method: 'GET', 
    mode: 'no-cors'
}); 
console.log(test); 
console.log(await function(){URL.createObjectURL(test.blob())});




for(let i = 0; i <= 10; i++){
        var obj = await fetch('https://loremflickr.com/json/420/340/tshirt',{ 
            mode: 'no-cors'
        }); 
                    
        obj = obj.json();
        promise.push( new Producto(obj.file, 'tarro', `tarro_${i}`));
    }









let url = 'https://loremflickr.com/json/420/340/coffee,mug';
 for(let i = 0; i <= 10; i++){
let obj2 = await fetch(url,{ mode: 'no-cors'});
console.log(obj2);
let test2 = await obj2.json();
console.log(test2.file);
 }
*/