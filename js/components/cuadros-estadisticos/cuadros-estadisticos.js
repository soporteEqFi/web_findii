
const cuadrosEstadisticos = {

    llenarCuadroVentasTotales(cant_venta_totales, titulo) {
        const datos = document.getElementById("contenedorDatos")
        
        const contenidoDatos = document.createElement('div')
         
        contenidoDatos.innerHTML = '';
        contenidoDatos.classList.add("estadistica")
        contenidoDatos.innerHTML = `
    <div class="titulo">
        <p>${titulo}</p>
    </div>
     
    <div class="valor">
       <p>${cant_venta_totales}</p>
    </div>

    <div class="icono">
       <i class="fa-solid fa-money-check-dollar"></i>
    </div>
`
        datos.append(contenidoDatos)
    },

}

export default cuadrosEstadisticos;