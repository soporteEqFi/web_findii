 
 const dateUtils = {

    agregarCeroAlInicio(numero) {
        return numero < 10 ? `0${numero}` : numero;
    },

    get_actual_date() {
        const fecha = new Date();

        const dia = dateUtils.agregarCeroAlInicio(fecha.getDate());
        const mes = dateUtils.agregarCeroAlInicio(fecha.getMonth() + 1); // ¡Recuerda que los meses comienzan desde 0!
        const año = dateUtils.agregarCeroAlInicio(fecha.getFullYear());

        return `${dia}/${mes}/${año}`;
    }
}

export default dateUtils;