
## Instalación

1. Descarga los archivos `index.html` y `script.js`
2. Colócalos en la misma carpeta

## Uso

1. Abre el archivo `index.html` en tu navegador web
2. Ingresa el número de filas y columnas para cada matriz
   - Recuerda que para poder multiplicar dos matrices, el número de columnas de la primera matriz debe ser igual al número de filas de la segunda matriz
3. Haz clic en el botón "Crear Matrices"
4. Ingresa los valores para cada elemento de ambas matrices
5. Haz clic en el botón "Calcular"
6. El resultado de la multiplicación se mostrará en la parte inferior

## Algoritmo de Multiplicación de Matrices

La multiplicación de matrices sigue estas reglas:
1. Si la Matriz A es de tamaño m×n y la Matriz B es de tamaño n×p, la Matriz Resultante C será de tamaño m×p
2. Cada elemento C[i,j] se calcula multiplicando los elementos correspondientes de la fila i de la Matriz A y la columna j de la Matriz B, y luego sumándolos:

C[i,j] = A[i,0] × B[0,j] + A[i,1] × B[1,j] + ... + A[i,n-1] × B[n-1,j]

## Ejemplo

Para multiplicar:
- Matriz A (2×3): [[1, 2, 3], [4, 5, 6]]
- Matriz B (3×2): [[7, 8], [9, 10], [11, 12]]

El resultado será una matriz 2×2 calculada así:
- C[0,0] = 1×7 + 2×9 + 3×11 = 58
- C[0,1] = 1×8 + 2×10 + 3×12 = 64
- C[1,0] = 4×7 + 5×9 + 6×11 = 139
- C[1,1] = 4×8 + 5×10 + 6×12 = 154

Resultando en: [[58, 64], [139, 154]]

## Notas Adicionales

- La aplicación incluye validación para asegurarse de que las dimensiones de las matrices sean compatibles para la multiplicación
- Todos los cálculos se realizan en el navegador del cliente
- Los valores pueden ser números enteros o decimales
