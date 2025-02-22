
function modalContent(modalCuerpo, content_type) {
    fetch(`../js/components/Modal/content_types/sells_content.html`)
        .then(response => response.text())
        .then(htmlContent => {
            modalCuerpo.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('Error loading HTML content:', error);
        });
}

export default modalContent;
