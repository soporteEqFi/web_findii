import Controller from "../controller/records_controller.js";


const Vista  = {

    mostrarTodasLosDatos(datosCombinados){
        const datos =datosCombinados
        

        const tablaDatos = document.getElementById('tablaDatos');
        tablaDatos.innerHTML = '';

        // Definir las columnas que deseas mostrar
        const columnasAMostrar = ['id_solicitante','nombre','numero_documento','profesion','nivel_estudio','correo','numero_celular','personas_a_cargo','direccion','ciudad','departamento','barrio','actividad_economica','empresa_labora', 'direccion_empresa','telefono_empresa', 'tipo_de_contrato','cargo_actual', 'ingresos', 'egresos','cuota_inicial', 'producto_solicitado','plazo_meses','observacion','segundo_titular'];

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
        
    }

}

export default Vista;

document.addEventListener('DOMContentLoaded', function () {

    Controller.iniciar()

});