import Controller from "../controller/records_controller.js";


const Vista  = {

    mostrarTodasLosDatos(datosCombinados){
        const datos =datosCombinados
        

        const tablaDatos = document.getElementById('tablaDatos');
        tablaDatos.innerHTML = '';

        // Definir las columnas que deseas mostrar
        const columnasAMostrar = ['id_solicitante','nombre','numero_documento','profesion','nivel_estudio','correo','numero_celular','personas_a_cargo','direccion','ciudad_gestion','departamento','barrio','actividad_economica','empresa_labora', 'direccion_empresa','telefono_empresa', 'tipo_de_contrato','cargo_actual', 'ingresos', 'egresos','cuota_inicial', 'producto_solicitado','plazo_meses','observacion','segundo_titular'];

        // Crear encabezado
        const encabezadoRow = document.createElement('tr');
        for (const columna of columnasAMostrar) {

            const th = document.createElement('th');
            th.textContent = columna;
            encabezadoRow.appendChild(th);
        }
        tablaDatos.appendChild(encabezadoRow);
           
        // Crear filas de datos
        datos.forEach(dato => {
            const fila = document.createElement('tr');
            for (const columna of columnasAMostrar) {
                const celda = document.createElement('td');
                celda.textContent = dato[columna];

                fila.appendChild(celda);
            }
            tablaDatos.appendChild(fila);
        });
        
    },

    filtrarTabla() {
        const columnaBuscarComboBox = document.getElementById('columnaBuscar');
        const textoBuscar = document.getElementById('textoBuscar').value;

        columnaBuscarComboBox.addEventListener('change', () => {
            const estado = columnaBuscarComboBox.value;

            if (estado === "sin filtros") {
                Miscelaneas.recargarPagina(500)
                let textoBuscar = document.getElementById('textoBuscar');
                textoBuscar.value = ""
            }

        })

        const columnaBuscar = columnaBuscarComboBox.value;

        return { columnaBuscar, textoBuscar }

    },
    redirigirIndex(){
        location.href ="./login.html"
    },
    mostrarFiltrosActivos(filtroActivo, filtroValor) {
        const contenedorFiltrosActivos = document.getElementById('contenedorFiltrosActivos');
        const filtro = document.createElement('div')

        contenedorFiltrosActivos.innerHTML = '';

        filtro.innerHTML =
            `
        <button id="descargarVentasIntervalo" class="btn-black">Exportar <i class="fa-solid fa-file-arrow-down" aria-hidden="true"></i></button>

        <div class="filtro">
            <p>${filtroActivo}: ${filtroValor} <i id = "quitarFiltro" class="fa-solid fa-xmark quitar-filtro"></i></p>
        </div>

        `;

        contenedorFiltrosActivos.append(filtro);

        // Boton que permite filtrar los registros para un intervalo de fechas
        const descargarVentasIntervalo = document.getElementById('descargarVentasIntervalo');
        descargarVentasIntervalo.onclick = function () {
            Controlador.descargarDatosPorIntervalo();
        }

        const quitarFiltro = document.getElementById('quitarFiltro');
        quitarFiltro.onclick = function () {
            Tabla.vaciarCamposFiltros();
            filtro.innerHTML = '';
            Controller.mostrarDatos();
        }



    },


}

export default Vista;

document.addEventListener('DOMContentLoaded', function () {

    Controller.iniciar()

});
// Boton que permite filtrar los registros según una columna y texto a buscar
const btnFiltrarTabla = document.getElementById('btnFiltrarTabla');
btnFiltrarTabla.onclick = function () {
    Controller.filtrarTabla();
}