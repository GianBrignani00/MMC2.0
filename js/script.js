
function mostrarMensajeAdquisicion(producto) {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Adquiriste ${producto.nombre}`,
        showConfirmButton: false,
        timer: 1500
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

    function agregarAlCarro(id) {
        const productoEncontrado = productos.find(producto => producto.id === id);
        carrito.push(productoEncontrado);
        sessionStorage.setItem('carrito', JSON.stringify(carrito));

        mostrarMensajeAdquisicion(productoEncontrado);
        mostrarCarrito();
    }

    const productos = [
        {
            id: 1,
            nombre: 'PLAN DEFINICION 2023',
            precio: 3900,
            adquirido: false
        },
        {
            id: 2,
            nombre: 'PLAN HOME+DEFINICION',
            precio: 4500
        },
        {
            id: 3,
            nombre: 'GYM+DEFINICION 2023',
            precio: 5500
        },
        {
            id: 4,
            nombre: 'PLAN GYM',
            precio: 4000
        },
        {
            id: 5,
            nombre: 'PLAN HOME',
            precio: 3000
        },
        {
            id: 6,
            nombre: 'PACK DESAFIOS',
            precio: 3800
        },
    ];

    const botonesAdquirir = document.querySelectorAll('.btn.btn-primary');
    botonesAdquirir.forEach((boton, index) => {
        boton.setAttribute('data-id', productos[index].id); 
        boton.addEventListener('click', function () {
            const idProducto = parseInt(boton.getAttribute('data-id'));
            agregarAlCarro(idProducto);
        });
    });

    function mostrarCarrito() {
        const carritoContainer = document.getElementById('carritoContainer');
        carritoContainer.innerHTML = ''; 

        const table = document.createElement('table');
        table.classList.add('table', 'table-striped');

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const thProducto = document.createElement('th');
        thProducto.textContent = 'Producto';

        const thPrecio = document.createElement('th');
        thPrecio.textContent = 'Precio';

        const thAcciones = document.createElement('th');
        thAcciones.textContent = 'Acciones';

        headerRow.appendChild(thProducto);
        headerRow.appendChild(thPrecio);
        headerRow.appendChild(thAcciones);
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        let total = 0;

        carrito.forEach((producto, index) => {
            const row = document.createElement('tr');

            const nombreProducto = document.createElement('td');
            nombreProducto.textContent = producto.nombre;

            const precioProducto = document.createElement('td');
            precioProducto.textContent = `$${producto.precio}`;

            const acciones = document.createElement('td');
            const eliminarBtn = document.createElement('button');
            eliminarBtn.textContent = 'X';
            eliminarBtn.classList.add('btn', 'btn-danger');
            eliminarBtn.addEventListener('click', () => eliminarProducto(index));

            acciones.appendChild(eliminarBtn);

            row.appendChild(nombreProducto);
            row.appendChild(precioProducto);
            row.appendChild(acciones);
            tbody.appendChild(row);

            total += producto.precio;
        });

        table.appendChild(tbody);
        carritoContainer.appendChild(table);

        const totalContainer = document.getElementById('totalContainer');
        totalContainer.textContent = `Total: $${total}`;
    }

    function eliminarProducto(index) {
        carrito.splice(index, 1);
        sessionStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    }

    const botonComprar = document.getElementById('botonComprar');
    botonComprar.addEventListener('click', realizarCompra);

    function realizarCompra() {
        Swal.fire({
            icon: 'success',
            title: 'Compra realizada',
            text: 'Gracias por tu compra. ¡Disfruta de tus productos!',
            showConfirmButton: false,
            timer: 2000
        });

        carrito.length = 0;
        sessionStorage.setItem('carrito', JSON.stringify(carrito));

        mostrarCarrito();
    }

    mostrarCarrito();
});

const emailInput = document.getElementById('InputEmail1');
const passwordInput = document.getElementById('InputPassword1');
const submitButton = document.getElementById('submitButton');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

emailInput.addEventListener('input', validateForm);
passwordInput.addEventListener('input', validateForm);

function validateForm() {
    if (!emailInput.validity.valid) {
        emailInput.classList.add('invalid-input');
        emailError.textContent = 'Please enter a valid email address.';
    } else {
        emailInput.classList.remove('invalid-input');
        emailError.textContent = '';
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/;
    if (!passwordPattern.test(passwordInput.value)) {
        passwordInput.classList.add('invalid-input');
        passwordError.textContent = 'Password must contain at least one lowercase letter, one uppercase letter, and one number.';
    } else {
        passwordInput.classList.remove('invalid-input');
        passwordError.textContent = '';
    }

    if (emailInput.validity.valid && passwordPattern.test(passwordInput.value)) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}