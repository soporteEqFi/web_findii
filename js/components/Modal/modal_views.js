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
        fetch('../js/components/Modal/content_types/edit_sell.html')
            .then(response => response.text())
            .then(template => {
                let htmlContent = template    
                modalCuerpo.innerHTML = htmlContent;
            })
            .catch(error => {
                console.error('Error loading HTML template:', error);
            });
    }
}



export default Modales;
