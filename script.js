document.addEventListener("DOMContentLoaded", () => {
    // Elementos del DOM
    const filas1Input = document.getElementById("rows1");
    const columnas1Input = document.getElementById("cols1");
    const filas2Input = document.getElementById("rows2");
    const columnas2Input = document.getElementById("cols2");
    const crearMatricesBtn = document.getElementById("createMatrices");
    const calcularBtn = document.getElementById("calculate");
    const contenedorMatriz1 = document.getElementById("matrix1");
    const contenedorMatriz2 = document.getElementById("matrix2");
    const contenedorMatrizResultado = document.getElementById("resultMatrix");
    const contenedorMatrices = document.getElementById("matricesContainer");
    const contenedorCalcular = document.getElementById("calculateContainer");
    const contenedorResultado = document.getElementById("resultContainer");
    const contenedorError = document.getElementById("error");

    // Variables para almacenar las matrices
    let matriz1 = [];
    let matriz2 = [];

    // Evento para crear las matrices
    crearMatricesBtn.addEventListener("click", () => {
        const filas1 = Number.parseInt(filas1Input.value);
        const columnas1 = Number.parseInt(columnas1Input.value);
        const filas2 = Number.parseInt(filas2Input.value);
        const columnas2 = Number.parseInt(columnas2Input.value);

        // Validar dimensiones
        if (columnas1 !== filas2) {
            contenedorError.textContent =
                "Error: El número de columnas de la Matriz 1 debe ser igual al número de filas de la Matriz 2.";
            contenedorMatrices.style.display = "none";
            contenedorCalcular.style.display = "none";
            contenedorResultado.style.display = "none";
            return;
        }

        contenedorError.textContent = "";

        // Crear matriz 1
        crearInputsMatriz(contenedorMatriz1, filas1, columnas1, "matrix1");

        // Crear matriz 2
        crearInputsMatriz(contenedorMatriz2, filas2, columnas2, "matrix2");

        // Mostrar contenedores
        contenedorMatrices.style.display = "flex";
        contenedorCalcular.style.display = "block";
        contenedorResultado.style.display = "none";
    });

    // Evento para calcular la multiplicación
    calcularBtn.addEventListener("click", () => {
        const filas1 = Number.parseInt(filas1Input.value);
        const columnas1 = Number.parseInt(columnas1Input.value);
        const filas2 = Number.parseInt(filas2Input.value);
        const columnas2 = Number.parseInt(columnas2Input.value);

        // Obtener valores de la matriz 1
        matriz1 = obtenerValoresMatriz(filas1, columnas1, "matrix1");
        if (!matriz1) return;

        // Obtener valores de la matriz 2
        matriz2 = obtenerValoresMatriz(filas2, columnas2, "matrix2");
        if (!matriz2) return;

        // Multiplicar matrices
        try {
            const matrizResultado = multiplicarMatrices(matriz1, matriz2);
            mostrarMatrizResultado(matrizResultado);
            contenedorResultado.style.display = "block";
            contenedorError.textContent = "";
        } catch (error) {
            contenedorError.textContent = "Error: " + error.message;
            contenedorResultado.style.display = "none";
        }
    });

    // Función para crear los inputs de una matriz
    function crearInputsMatriz(contenedor, filas, columnas, nombreMatriz) {
        contenedor.innerHTML = "";
        const tabla = document.createElement("table");

        for (let i = 0; i < filas; i++) {
            const fila = document.createElement("tr");

            for (let j = 0; j < columnas; j++) {
                const celda = document.createElement("td");
                const input = document.createElement("input");
                input.type = "number";
                input.className = "matrix-input";
                input.id = `${nombreMatriz}-${i}-${j}`;
                input.value = "0";

                celda.appendChild(input);
                fila.appendChild(celda);
            }

            tabla.appendChild(fila);
        }

        contenedor.appendChild(tabla);
    }

    // Función para obtener los valores de una matriz
    function obtenerValoresMatriz(filas, columnas, nombreMatriz) {
        const matriz = [];
        let hayError = false;

        for (let i = 0; i < filas; i++) {
            const fila = [];

            for (let j = 0; j < columnas; j++) {
                const inputId = `${nombreMatriz}-${i}-${j}`;
                const input = document.getElementById(inputId);
                const valor = input.value.trim();

                // Validar que sea un número
                if (valor === "" || isNaN(valor)) {
                    contenedorError.textContent = `Error: El valor en la posición (${i + 1},${j + 1}) de la ${nombreMatriz === "matrix1" ? "Matriz 1" : "Matriz 2"} no es un número válido.`;
                    hayError = true;
                    break;
                }

                fila.push(Number.parseFloat(valor));
            }

            if (hayError) return null;
            matriz.push(fila);
        }

        return matriz;
    }

    // Función para multiplicar matrices
    function multiplicarMatrices(matriz1, matriz2) {
        const filas1 = matriz1.length;
        const columnas1 = matriz1[0].length;
        const filas2 = matriz2.length;
        const columnas2 = matriz2[0].length;

        // Verificar si se pueden multiplicar
        if (columnas1 !== filas2) {
            throw new Error("El número de columnas de la Matriz 1 debe ser igual al número de filas de la Matriz 2.");
        }

        // Inicializar matriz resultado con ceros
        const resultado = Array(filas1)
            .fill()
            .map(() => Array(columnas2).fill(0));

        // Realizar la multiplicación
        for (let i = 0; i < filas1; i++) {
            for (let j = 0; j < columnas2; j++) {
                let suma = 0;
                for (let k = 0; k < columnas1; k++) {
                    suma += matriz1[i][k] * matriz2[k][j];
                }
                resultado[i][j] = suma;
            }
        }

        return resultado;
    }

    // Función para mostrar la matriz resultante
    function mostrarMatrizResultado(matriz) {
        contenedorMatrizResultado.innerHTML = "";
        const tabla = document.createElement("table");
        tabla.className = "result-table";

        for (let i = 0; i < matriz.length; i++) {
            const fila = document.createElement("tr");

            for (let j = 0; j < matriz[0].length; j++) {
                const celda = document.createElement("td");
                celda.textContent = matriz[i][j];
                fila.appendChild(celda);
            }

            tabla.appendChild(fila);
        }

        contenedorMatrizResultado.appendChild(tabla);
    }
});
