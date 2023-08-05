// let filtro = {
//     categorias: [], // disnay, toons, movies, marvel, dc, tv shows, personalizado, etc
//     tiposProductos: [], // taza, tarro, gorra, telas, playeras, destapadores, rompecabezas, etc
//     colores: [] // taza 'azul', tarro 'negro', tarro 'transparente', etc
// }

let Producto = function(img, tipo, detalle){
    this.imagen = img;
    this.tipo = tipo;
    this.detalle = detalle;
}

let tipos = [];
let lProductos = [];
let lProductosFiltrados = [];

async function getAllTipos(){
    const promises = [];
    promises.push('taza');
    promises.push('tarro');
    promises.push('playera');
    tipos = await Promise.all(promises);
    return tipos;
}

async function loadTazas() {
    let url = 'https://loremflickr.com/json/420/340/coffee,mug';
    let promise = [];
    var temp = undefined;
        for(let i = 0; i <= 10; i++){
            //let obj = await (await fetch(url)).json(); // funciona pero marca el cors

            // let test = await (await fetch(url, {
            //     method: 'GET',
            //     headers: new Headers({ 'Content-type': 'application/json'}),
            //     mode: 'no-cors'
            // }));

            let obj = await fetch(url,{ mode: 'no-cors'});
            console.log(obj);
            let test = await obj.json();
            console.log(test.file);

            // let obj = await (await fetch(url, {
            //     method: 'GET',
            //     headers: new Headers({ 'Content-type': 'application/json'}),
            //     mode: 'no-cors'
            // })).json();
            promise.push( new Producto(test.file, 'taza', `taza_${i}`));
        }
        
    return promise;
}

async function loadTarros() {
    let url = 'https://loremflickr.com/json/420/340/beer,jar';
    let promise = [];
    for(let i = 0; i <= 10; i++){
        // let obj = await (await fetch(url, {
        //     method: 'GET',
        //     headers: new Headers({ 'Content-type': 'application/json'}),
        //     mode: 'no-cors'
        // })).json();
        let obj = await fetch(url,{ 
            mode: 'no-cors'
        }); 
                    
        obj = await obj.json();
        promise.push( new Producto(obj.file, 'tarro', `tarro_${i}`));
    }
    var temp = await Promise.all(promise);
    return temp;
}

async function loadPlayeraBlanca() {
    let url = 'https://loremflickr.com/json/420/340/tshirt';
    let promise = [];
    for(let i = 0; i <= 10; i++){
        // let obj = await (await fetch(url, {
        //     method: 'GET',
        //     headers: new Headers({ 'Content-type': 'application/json'}),
        //     mode: 'no-cors'
        // })).json();
        let obj = await fetch(url,{
            mode: 'no-cors'
        }); 
                    
        obj = await obj.json();
        promise.push( new Producto(obj.file, 'playera', `playera_${i}`));
    }
    var temp = await Promise.all(promise);
    return temp;
}


function buscaProductos(opciones){

    if(opciones === null || opciones === undefined || opciones.length === 0){
        return lProductos;
    }

    if(opciones.includes('taza')){        
        lProductosFiltrados.push(lProductos.filter(function(p){
            return p.tipo === 'taza'
        }));
    }

    if(opciones.includes('tarro')){        
        lProductosFiltrados.push(lProductos.filter(function(p){
            return p.tipo === 'tarro'
        }));
    }

    if(opciones.includes('playera')){        
        lProductosFiltrados.push(lProductos.filter(function(p){
            return p.tipo === 'playera'
        }));
    }
}


async function loadImages(){
    await getAllTipos(); // no necesario await ya que lo que necesito es que se cargue todo... por el momento.
    let lTazas = loadTazas();
    
    console.log(lTazas);
    
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


    console.log(lProductos);
    // buscaProductos(['playera','tarro']);
    // console.log(lProductosFiltrados);
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