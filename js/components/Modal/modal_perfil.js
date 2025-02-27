const ModalProfile = {
    
    modalContent(modalCuerpo, content_type) {
        fetch(`../js/components/Modal/content_types/edit_profile.html`)
            .then(response => response.text())
            .then(htmlContent => {
                modalCuerpo.innerHTML = htmlContent;
            })
            .catch(error => {
                console.error('Error loading HTML content:', error);
            });
    },
    
    editProfileModal(modalCuerpo, datos) {
        // const rol = localStorage.getItem('rol')

        fetch('../js/components/Modal/content_types/edit_profile.html')
            .then(response => response.text())
            .then(template => {
                // Reemplaza los marcadores de posición con los datos
                let htmlContent = template
                    
                    .replace('{{nombre_completo}}', datos['nombre'])
                    .replace('{{nombre}}', datos['nombre'])
                    .replace('{{empresa}}', datos['empresa'])
                    .replace('{{cedula}}', datos['cedula'])
                    .replace('{{rol}}', datos['rol'])
                 
    
                modalCuerpo.innerHTML = htmlContent;
            })
            .catch(error => {
                console.error('Error loading HTML template:', error);
            });
    }
}
export default ModalProfile;