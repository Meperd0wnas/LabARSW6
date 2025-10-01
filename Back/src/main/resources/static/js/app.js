// src/main/resources/static/js/app.js
const BlueprintsModule = (function() {
    // Estado privado
    let selectedAuthor = '';
    let blueprints = [];

    // Función privada para actualizar la vista desde el listado transformado
    function updateViewFromList(transformedList) {
        const tbody = $('#blueprints-table tbody');
        tbody.empty(); // vaciar tabla

        // Agregar filas con jQuery
        transformedList.map(bp => {
            const row = `<tr><td>${bp.name}</td><td>${bp.points}</td></tr>`;
            tbody.append(row);
        });

        // Calcular total de puntos con reduce
        const totalPoints = transformedList.reduce((sum, bp) => sum + bp.points, 0);
        $('#total-points').text(totalPoints);
    }

    // Función pública: cambiar autor
    function setAuthor(author) {
        selectedAuthor = author.trim();
    }

    // Función pública: actualizar listado desde apimock
    function updateBlueprintsByAuthor(author) {
        selectedAuthor = author.trim();

        // Llamada al módulo apimock con callback
        BlueprintsMockModule.getBlueprintsByAuthor(selectedAuthor, function(blueprintsList) {
            // Primer map: obtener {name, points}
            const transformed = blueprintsList.map(bp => ({
                name: bp.name,
                points: bp.points.length
            }));

            // Segundo map: actualizar tabla con jQuery
            updateViewFromList(transformed);

            // Guardar en estado privado si quieres usarlo luego
            blueprints = transformed;
        });
    }

    return {
        setAuthor,
        updateBlueprintsByAuthor
    };
})();


