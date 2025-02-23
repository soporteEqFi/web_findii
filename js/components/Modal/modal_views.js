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
                    .replace('{{estado}}', dato['estado'])
                    .replace('{{banco}}', dato['banco'])
                    .replace('{{producto_solicitado}}', dato['producto_solicitado'])
                    .replace('{{observaciones}}', dato['observacion'])
    
                modalCuerpo.innerHTML = htmlContent;
            })
            .catch(error => {
                console.error('Error loading HTML template:', error);
            });
    }
}
export default Modales;
