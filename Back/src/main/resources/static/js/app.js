// src/main/resources/static/js/app.js
const BlueprintsModule = (function() {
    // Estado interno
    let selectedAuthor = '';
    let blueprints = [];
    let totalPoints = 0;

    // Función privada para calcular total de puntos (cantidad de puntos por plano)
    function calculateTotalPoints() {
        totalPoints = blueprints.reduce((sum, bp) => sum + bp.points.length, 0);
    }

    // Función pública: setear autor
    function setAuthor(author) {
        selectedAuthor = author;
    }

    // Función pública: obtener autor
    function getAuthor() {
        return selectedAuthor;
    }

    // Función pública: obtener lista de planos
    function getBlueprints() {
        return blueprints;
    }

    // Función pública: obtener total de puntos
    function getTotalPoints() {
        return totalPoints;
    }

    // Función pública: obtener planos desde backend (fetch)
    async function fetchBlueprints() {
        if (!selectedAuthor) return;

        try {
            const response = await fetch(`/blueprints/${encodeURIComponent(selectedAuthor)}`);
            if (!response.ok) throw new Error('Error al obtener los planos');

            const data = await response.json();
            blueprints = data;
            calculateTotalPoints();
            updateView();
        } catch (error) {
            console.error(error);
            alert('No se pudieron cargar los planos del autor.');
            blueprints = [];
            totalPoints = 0;
            updateView();
        }
    }

    // Función privada para actualizar la vista
    function updateView() {
        // Autor
        document.getElementById('selected-author').textContent = selectedAuthor;

        // Tabla
        const tbody = document.getElementById('blueprints-table').querySelector('tbody');
        tbody.innerHTML = '';
        blueprints.forEach(bp => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${bp.name}</td><td>${bp.points.length}</td>`; // <-- puntos como cantidad
            tbody.appendChild(row);
        });

        // Total puntos
        document.getElementById('total-points').textContent = totalPoints;
    }


    return {
        setAuthor,
        getAuthor,
        getBlueprints,
        getTotalPoints,
        fetchBlueprints
    };
})();
