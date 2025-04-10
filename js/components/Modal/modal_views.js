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
        console.log(dato)
        const rol = localStorage.getItem('rol')
        fetch('../js/components/Modal/content_types/edit_sell.html')
            .then(response => response.text())
            .then(template => {
                // Primero reemplazamos el estado para cada opción
                let htmlContent = template;
                const estado = dato['estado'] || 'Pendiente';
                const banco = dato['banco'] || 'Bancolombia';
                
                // Reemplazamos la selección para cada estado posible
                htmlContent = htmlContent
                    .replace(/{{#if \(eq estado 'Pendiente'\)}}selected{{\/if}}/g, estado === 'Pendiente' ? 'selected' : '')
                    .replace(/{{#if \(eq estado 'Aprobado'\)}}selected{{\/if}}/g, estado === 'Aprobado' ? 'selected' : '')
                    .replace(/{{#if \(eq estado 'Desembolsado'\)}}selected{{\/if}}/g, estado === 'Desembolsado' ? 'selected' : '')
                    .replace(/{{#if \(eq estado 'Radicado'\)}}selected{{\/if}}/g, estado === 'Radicado' ? 'selected' : '')
                    .replace(/{{#if \(eq estado 'Negado'\)}}selected{{\/if}}/g, estado === 'Negado' ? 'selected' : '')
                    .replace(/{{#if \(eq estado 'Estudio_de_credito'\)}}selected{{\/if}}/g, estado === 'Estudio de credito' ? 'selected' : '')

                // Reemplazamos la selección para cada banco posible
                htmlContent = htmlContent
                    .replace(/{{#if \(eq banco 'Bancolombia'\)}}selected{{\/if}}/g, banco === 'Bancolombia' ? 'selected' : '')
                    .replace(/{{#if \(eq banco 'BBVA'\)}}selected{{\/if}}/g, banco === 'BBVA' ? 'selected' : '')
                    .replace(/{{#if \(eq banco 'Scotia'\)}}selected{{\/if}}/g, banco === 'Scotia' ? 'selected' : '')
                    .replace(/{{#if \(eq banco 'Davivienda'\)}}selected{{\/if}}/g, banco === 'Davivienda' ? 'selected' : '')
                    
                // Continuamos con el resto de reemplazos
                htmlContent = htmlContent
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
                    .replace('{{direccion_residencia}}', dato['direccion'])
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
                    .replace('{{replace_archivos_ruta}}', dato['ruta_imagen'] ? dato['ruta_imagen'].map(ruta => `<a href="${ruta}" target="_blank"><i class="fa-solid fa-2xl fa-file-lines"></i></a>`).join(' ') : '')

                modalCuerpo.innerHTML = htmlContent;
            
                if (rol.toLowerCase()) {
                    const inputs = modalCuerpo.querySelectorAll('input, select');
                    inputs.forEach(input => {
                        if (input.id == 'numero_documento') {
                            input.disabled = true;
                        }
                    });
                }

                // Si el rol es banco, deshabilitar todos los campos excepto estado y observaciones
                if (rol.toLowerCase() === 'banco') {
                    const inputs = modalCuerpo.querySelectorAll('input, select');
                    inputs.forEach(input => {
                        if (input.id !== 'estado' && input.id !== 'observaciones') {
                            input.disabled = true;
                        }
                    });
                }

                if (rol.toLowerCase() === 'asesor') {
                    const inputs = modalCuerpo.querySelectorAll('input, select');
                    inputs.forEach(input => {
                        if (input.id !== 'observaciones') {
                            input.disabled = true;
                        }
                    });
                }

                // if (rol.toLowerCase() === 'findii') {
                //     const inputs = modalCuerpo.querySelectorAll('input, select');
                //     inputs.forEach(input => {
                //         if (input.id !== 'observaciones') {
                //             input.disabled = true;
                //         }
                //     });
                // }
            })
            .catch(error => {
                console.error('Error loading HTML template:', error);
            });
    },
    
}
export default Modales;
