// src/main/resources/static/js/app.js
const BlueprintsModule = (function() {
    // Estado privado
    let selectedAuthor = '';
    let blueprints = []; // Lista de objetos { name: "nombre plano", points: cantidad de puntos }
    let totalPoints = 0;

    // Función privada para calcular total de puntos
    function calculateTotalPoints() {
        totalPoints = blueprints.reduce((sum, bp) => sum + bp.points, 0);
    }

    // Función privada para actualizar la vista
    function updateView() {
        document.getElementById('selected-author').textContent = selectedAuthor;

        const tbody = document.getElementById('blueprints-table').querySelector('tbody');
        tbody.innerHTML = '';
        blueprints.forEach(bp => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${bp.name}</td><td>${bp.points}</td>`;
            tbody.appendChild(row);
        });

        document.getElementById('total-points').textContent = totalPoints;
    }

    // Función privada para transformar la respuesta del fetch
    function transformData(rawData) {
        // Cada Blueprint -> {name, points: cantidad de puntos}
        return rawData.map(bp => ({
            name: bp.name,
            points: bp.points.length
        }));
    }

    // Función pública: cambiar autor seleccionado
    function setAuthor(author) {
        selectedAuthor = author.trim();
    }

    // Función pública: obtener planos del autor desde el backend
    async function fetchBlueprints() {
        if (!selectedAuthor) {
            alert('Por favor seleccione un autor');
            return;
        }

        try {
            const response = await fetch(`/blueprints/${encodeURIComponent(selectedAuthor)}`);
            if (!response.ok) {
                throw new Error(`Autor no encontrado: ${selectedAuthor}`);
            }
            const data = await response.json();
            blueprints = transformData(data);
            calculateTotalPoints();
            updateView();
        } catch (error) {
            blueprints = [];
            totalPoints = 0;
            updateView();
            alert(error.message);
        }
    }

    // Exposición pública
    return {
        setAuthor,
        fetchBlueprints
    };
})();

