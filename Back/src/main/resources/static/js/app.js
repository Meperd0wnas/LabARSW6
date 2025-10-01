const BlueprintsModule = (function() {
    // Estado privado
    let selectedAuthor = '';
    let blueprints = [];

    // Actualiza la tabla y agrega botones "Dibujar"
    function updateViewFromList(transformedList) {
        const tbody = $('#blueprints-table tbody');
        tbody.empty();

        transformedList.forEach(bp => {
            const row = $('<tr></tr>');
            row.append(`<td>${bp.name}</td>`);
            row.append(`<td>${bp.points}</td>`);

            // Botón Dibujar
            const btn = $('<button class="btn btn-success btn-sm">Dibujar</button>');
            btn.click(() => drawBlueprint(selectedAuthor, bp.name));
            row.append($('<td></td>').append(btn));

            tbody.append(row);
        });

        const totalPoints = transformedList.reduce((sum, bp) => sum + bp.points, 0);
        $('#total-points').text(totalPoints);

        // Guardar en estado privado
        blueprints = transformedList;
    }

    // Dibuja plano en canvas
    function drawBlueprint(author, planName) {
        BlueprintsMockModule.getBlueprintsByNameAndAuthor(author, planName, function(blueprint) {
            if (!blueprint || !blueprint.points) return;

            // Crear o actualizar campo del plano actual
            let planField = $('#current-plan');
            if (planField.length === 0) {
                $('<div class="mb-3"><strong>Plano dibujado: </strong><span id="current-plan"></span></div>')
                    .insertBefore('#blueprints-canvas');
                planField = $('#current-plan');
            }
            planField.text(blueprint.name);

            // Canvas
            const canvas = document.getElementById('blueprints-canvas');
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const points = blueprint.points;
            if (points.length === 0) return;

            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 2;
            ctx.stroke();
        });
    }

    // Cambiar autor
    function setAuthor(author) {
        selectedAuthor = author.trim();
    }

    // Actualizar listado desde apimock
    function updateBlueprintsByAuthor(author) {
        selectedAuthor = author.trim();

        BlueprintsMockModule.getBlueprintsByAuthor(selectedAuthor, function(blueprintsList) {
            const transformed = blueprintsList.map(bp => ({
                name: bp.name,
                points: bp.points.length
            }));
            updateViewFromList(transformed);
        });
    }

    // Devuelve listado de planos
    function getBlueprints() {
        return blueprints;
    }

    return {
        setAuthor,
        updateBlueprintsByAuthor,
        drawBlueprint,
        getBlueprints
    };
})();
