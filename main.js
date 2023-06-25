/* window.onload = function () {
    // Check input in all number fields.
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            if (!this.validity.valid) {
                this.classList.add('invalid');
            } else {
                this.classList.remove('invalid');
            }
            checkInputs(); // Check inputs every time an input value changes
        });
    });
    checkInputs();  // Initial check
} */

/* window.onload = function () {
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            if (!this.validity.valid) {
                this.classList.add('invalid');
                if (this.validity.valueMissing) {
                    this.setCustomValidity("Por favor completar el campo");
                } else if (this.validity.patternMismatch) {
                    this.setCustomValidity("Solamente se permiten números positivos");
                }
            } else {
                this.classList.remove('invalid');
                this.setCustomValidity(''); // Reset the custom error message
            }
            checkInputs(); // Check inputs every time an input value changes
        });
    });
    checkInputs();  // Initial check
} */


window.onload = function() {
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (!this.validity.valid) {
                this.classList.add('invalid');
            } else {
                this.classList.remove('invalid');
            }
            checkInputs();
        });
        // Set custom validation messages
        input.addEventListener('invalid', function() {
            if (this.validity.valueMissing) {
                this.setCustomValidity("Este campo no puede quedar vacío");
            } else if (this.validity.patternMismatch) {
                this.setCustomValidity("Por favor, sigue el formato solicitado");
            } else {
                this.setCustomValidity('');
            }
        });
    });
    checkInputs();
}


// cambiamos el display de los inputs de z dependiendo de si es 2D o 3D

function toggleZInputs() {
    const dimension = document.getElementById('dimension').value; // 2D or 3D
    const display = dimension === '3' ? 'block' : 'none'; // si es 3D se muestra el input de z, de lo contrario se oculta
    const zInputs = [document.getElementById('z1'), document.getElementById('z2')]; // z1, z2
    zInputs.forEach(input => {
        input.style.display = display; // cambiamos el display de los inputs de z
        if (dimension === '3') {
            input.required = true; // required para 3D
            input.pattern = "\\d+(\\.\\d{1,2})?"; // pattern para 3D
        } else {
            input.required = false; // required para 2D
            input.removeAttribute("pattern"); // remove pattern attribute for 2D
        }
    });
    checkInputs();// Check inputs every time an input value changes
}

// calculamos la distancia

function calculateDistance() {
    const x1 = parseFloat(document.getElementById('x1').value); // parseFloat convierte el string en un numero decimal
    const y1 = parseFloat(document.getElementById('y1').value); // parseFloat convierte el string en un numero decimal
    const z1 = parseFloat(document.getElementById('z1').value || 0); // parseFloat convierte el string en un numero decimal
    const x2 = parseFloat(document.getElementById('x2').value); // parseFloat convierte el string en un numero decimal
    const y2 = parseFloat(document.getElementById('y2').value); // parseFloat convierte el string en un numero decimal
    const z2 = parseFloat(document.getElementById('z2').value || 0); // parseFloat convierte el string en un numero decimal

    // validamos que todos los campos sean numeros
    if ([x1, y1, z1, x2, y2, z2].some(isNaN)) {
        alert('Todos los inputs deberian ser numericos.');// si alguno de los campos no es un numero, se muestra un alert
        return;
    }

    let distance; // declaramos la variable distance
    const dimension = document.getElementById('dimension').value; // 2D or 3D
    // calculamos la distancia en 2D o 3D
    if (dimension === '2') {
        distance = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)); // Math.sqrt calcula la raiz cuadrada de un numero, Math.pow calcula la potencia de un numero
    } else {
        distance = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2) + Math.pow((z2 - z1), 2)); // Math.sqrt calcula la raiz cuadrada de un numero, Math.pow calcula la potencia de un numero
    }

    document.getElementById('result').innerHTML = 'Distance: ' + distance; // mostramos el resultado en el html
}

// validamos que todos los campos esten completos
function checkInputs() {
    const dimension = document.getElementById('dimension').value; // 2D or 3D
    const xInputs = [document.getElementById('x1'), document.getElementById('x2')]; // x1, x2
    const yInputs = [document.getElementById('y1'), document.getElementById('y2')]; // y1, y2
    const zInputs = [document.getElementById('z1'), document.getElementById('z2')]; // z1, z2

    const inputs = dimension === '2' ? [...xInputs, ...yInputs] : [...xInputs, ...yInputs, ...zInputs]; // 2D or 3D; si es 2D solo se toman los inputs de x e y, si es 3D se toman los inputs de x, y y z
    const allValid = inputs.every(input => input.validity.valid); // valida que todos los inputs sean validos
    document.querySelector('button').disabled = !allValid; // si todos los inputs son validos, se habilita el boton, de lo contrario se deshabilita
}



