$(document).ready(() => {
    $.ajax({
        url: '/json',  
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            const productosContainer = document.getElementById('content-container');
            data.forEach(producto => {
                const productoDiv = document.createElement('div');
                productoDiv.className = 'producto';

                const imagen = document.createElement('img');
                imagen.src = producto['imagen-src']; 
                productoDiv.appendChild(imagen);

                const titulo = document.createElement('h3');
                titulo.textContent = producto.titulo;
                productoDiv.appendChild(titulo);

                const precio = document.createElement('p');
                precio.textContent = `Precio: ${producto.precio}`;
                productoDiv.appendChild(precio);

                productosContainer.appendChild(productoDiv);
            });
        },
        error: function (error) {
            console.error('Error al cargar los datos:', error);
        }
    });
});



