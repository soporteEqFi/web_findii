const Modales = {
    
    modalContent(modalCuerpo, content_type) {
        fetch(`../js/components/Modal/content_types/sells_content.html`)
            .then(response => response.text())
            .then(htmlContent => {
                modalCuerpo.innerHTML = htmlContent;
            })
            .catch(error => {
                console.error('Error loading HTML content:', error);
            });
    },
    
    editSellModal(modalCuerpo, dato) {
        const rol = localStorage.getItem('rol')
        fetch('../js/components/Modal/content_types/edit_sell.html')
            .then(response => response.text())
            .then(template => {
                // Reemplaza los marcadores de posición con los datos
                let htmlContent = template
                    .replace('{{nombre_completo}}', dato['nombre'])
                    .replace('{{tipo_documento}}', dato['tipo_documento'])
                    .replace('{{numero_documento}}', dato['numero_documento']) 
                    .replace('{{numero_celular}}', dato['numero_celular'])
                    .replace('{{correo_electronico}}', dato['correo'])
                    .replace('{{ciudad_gestion}}', dato['ciudad_gestion'])
                    .replace('{{fecha_nacimiento}}', dato['fecha_nacimiento'])
                    .replace('{{nivel_estudio}}', dato['nivel_estudio'])
                    .replace('{{profesion}}', dato['profesion'])
                    .replace('{{estado_civil}}', dato['estado_civil'])
                    .replace('{{personas_a_cargo}}', dato['personas_a_cargo'])
                    .replace('{{direccion_residencia}}', dato['direccion_residencia'])
                    .replace('{{tipo_vivienda}}', dato['tipo_vivienda'])
                    .replace('{{barrio}}', dato['barrio'])
                    .replace('{{departamento}}', dato['departamento'])
                    .replace('{{estrato}}', dato['estrato'])
                    .replace('{{actividad_economica}}', dato['actividad_economica'])
                    .replace('{{empresa_labora}}', dato['empresa_labora'])
                    .replace('{{fecha_vinculacion}}', dato['fecha_vinculacion'])
                    .replace('{{direccion_empresa}}', dato['direccion_empresa'])
                    .replace('{{telefono_empresa}}', dato['telefono_empresa'])
                    .replace('{{tipo_contrato}}', dato['tipo_contrato'])
                    .replace('{{cargo_actual}}', dato['cargo_actual'])
                    .replace('{{ingresos}}', dato['ingresos'] || '')
                    .replace('{{valor_inmueble}}', dato['valor_inmueble'] || '')
                    .replace('{{cuota_inicial}}', dato['cuota_inicial'] || '')
                    .replace('{{porcentaje_financiar}}', dato['porcentaje_financiar'] || '')
                    .replace('{{total_egresos}}', dato['total_egresos'] || '')
                    .replace('{{total_activos}}', dato['total_activos'] || '')
                    .replace('{{total_pasivos}}', dato['total_pasivos'] || '')
                    .replace('{{tipo_credito}}', dato['tipo_credito'] || '')
                    .replace('{{plazo_meses}}', dato['plazo_meses'] || '')
                    .replace('{{segundo_titular}}', dato['segundo_titular'] || '')
                    .replace('{{observacion}}', dato['observacion'] || '')
    
                modalCuerpo.innerHTML = htmlContent;

                // Si el rol es banco, deshabilitar todos los campos excepto estado y observaciones
                if (rol === 'banco') {
                    const inputs = modalCuerpo.querySelectorAll('input, select');
                    inputs.forEach(input => {
                        if (input.id !== 'estado' && input.id !== 'observaciones') {
                            input.disabled = true;
                        }
                    });
                }

            })
            .catch(error => {
                console.error('Error loading HTML template:', error);
            });
    },
    
}
export default Modales;
