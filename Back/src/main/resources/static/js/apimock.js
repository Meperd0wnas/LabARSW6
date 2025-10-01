// src/main/resources/static/js/apimock.js
const BlueprintsMockModule = (function() {
    // Estado interno
    let selectedAuthor = '';
    let blueprints = [];
    let totalPoints = 0;

    // Datos "quemados" con más planos y puntos
    const mockData = {
        "daniel": [
            { name: "casa1", points: [{x:0,y:0},{x:10,y:10},{x:5,y:5}] },
            { name: "casa2", points: [{x:5,y:5},{x:15,y:15},{x:20,y:20},{x:25,y:25}] },
            { name: "casa3", points: [{x:1,y:1},{x:2,y:2}] }
        ],
        "maria": [
            { name: "jardin", points: [{x:20,y:20},{x:30,y:30}] },
            { name: "terraza", points: [{x:0,y:0},{x:1,y:1},{x:2,y:2},{x:3,y:3}] }
        ],
        "carlos": [
            { name: "edificio", points: [{x:40,y:40},{x:50,y:50},{x:60,y:60}] },
            { name: "garaje", points: [{x:10,y:10}] }
        ]
    };

    // Calcula total de puntos (suma de la longitud de points)
    function calculateTotalPoints() {
        totalPoints = blueprints.reduce((sum, bp) => sum + bp.points.length, 0);
    }

    // Actualiza la tabla y los campos de la vista
    function updateView() {
        document.getElementById('selected-author').textContent = selectedAuthor;

        const tbody = document.getElementById('blueprints-table').querySelector('tbody');
        tbody.innerHTML = '';
        blueprints.forEach(bp => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${bp.name}</td><td>${bp.points.length}</td>`;
            tbody.appendChild(row);
        });

        document.getElementById('total-points').textContent = totalPoints;
    }

    // Función pública: cambiar autor
    function setAuthor(author) {
        selectedAuthor = author.trim();
    }

    // Función pública: simula fetch y actualiza tabla
    function fetchBlueprints() {
        const authorKey = selectedAuthor.toLowerCase(); // No distingue mayúsculas/minúsculas
        blueprints = mockData[authorKey] || [];
        calculateTotalPoints();
        updateView();
    }

    // NUEVO: devuelve la lista de planos del autor vía callback
    function getBlueprintsByAuthor(author, callback) {
        const authorKey = author.toLowerCase();
        const list = mockData[authorKey] || [];
        callback(list); // Entrega la lista completa al callback
    }

    return {
        setAuthor,
        fetchBlueprints,
        getBlueprintsByAuthor // <-- exportamos la nueva función pública
    };
})();
