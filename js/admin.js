class Producto {
    constructor(codigo, nombre, categoria, imagen, precio, stock) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.categoria = categoria;
        this.imagen = imagen;
        this.precio = precio;
        this.stock = stock;
    }
}

let contenedor_principal = document.querySelector("#contenedor_principal");
let user = JSON.parse(localStorage.getItem("usuario")) || {};

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let tableUser = document.querySelector("#tableUser");

let productos = JSON.parse(localStorage.getItem("productos")) || [];
let productTable = document.querySelector("#productTable");

let bodyModificaModal = document.querySelector("#bodyModificaModal");
let nuevo = false;

if (user.id === 9999) {
    function cargarTablaUsuarios() {
        tableUser.innerHTML = "";

        usuarios.forEach(function (user) {
            let contenido = "";
            let tr = document.createElement("tr");
            if (user.usuario === "admin") {
                contenido = `
                <th scope="row" class="text-center">${user.usuario}
                    <td class="text-center">${user.nombre}</td>
                    <td class="text-center">${user.email}</td>
                    <td class="text-center pr-3">${user.activo}</td>     
                </th>
        `;
            } else {
                contenido = `
                <th scope="row" class="text-center">${user.usuario}
                    <td class="text-center">${user.nombre}</td>
                    <td class="text-center">${user.email}</td>
                    <td class="text-center">${user.activo}</td>
                    <td class="text-center mr-2 my-1 mx-1"><a href="#" class="boton-${user.activo}" onclick="activarUser(${user.id})"><i class="fa fa-check-circle-o fa-2x" aria-hidden="true"></i></a></td>
                </th>
            `;
            }
            tr.innerHTML = contenido;
            tableUser.appendChild(tr);
        });
    }

    function activarUser(id) {
        let index = usuarios.findIndex(function (user) {
            return user.id === id;
        });
        usuarios[index].activo = !usuarios[index].activo;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        cargarTablaUsuarios();
    }

    function cargarTablaProductos() {
        productTable.innerHTML = "";
        productos.forEach(function (prod) {
            let contenido = "";
            let tr = document.createElement("tr");
            contenido = `
        <th scope="row" class="text-center">${prod.codigo}
            <td class="text-center">${prod.nombre}</td>
            <td class="text-center">${prod.categoria}</td>
            <td class="text-center">$${prod.precio}</td>
            <td class="text-center">${prod.stock}</td>
            <td class="text-center mr-2">
            <a href="#" class="btn btn-warning my-1 mx-1" onclick="modificarProd(${prod.codigo})"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a> 
            <a href="#" class="btn btn-danger my-1 mx-1" onclick="borrarProd(${prod.codigo})"><i class="fa fa-trash-o" aria-hidden="true"></i></a></td>
        </th>
        `;

            tr.innerHTML = contenido;
            productTable.appendChild(tr);
        });
    }

    function nuevoProducto() {
        nuevo = true
        cargaModalModif();
        $("#modificarModal").modal("show");
    };

    function cargaModalModif(objeto = null) {
        let contenido = "";
        let title = document.querySelector("#modificarModalLabel");

        if (objeto === null) {
            contenido = `
            <div class="form-row">
            <div class="form-group col-md-6">
                <label for="nombre">Producto</label>
                <input type="text" class="form-control" id="nombre" placeholder="Nombre">
            </div>
            <div class="form-group col-md-6">
                <label for="precio">Precio</label>
                <input type="number" class="form-control" id="precio" placeholder="0" value="0"
                    min=0 autocomplete='off'>
            </div>
        </div>
        <div class="form-group">
            <label for="imagen">Imagen</label>
            <input type="text" class="form-control" id="imagen" placeholder="https://...">
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="stock">Stock</label>
                <input type="number" class="form-control" id="stock" placeholder="0" value="0" min=0
                    autocomplete='off'>
            </div>
            <div class="form-group col-md-6">
                <label for="categoria">Categoria</label>
                <select id="categoria" class="form-control">
                    <option selected>Ropa Deportiva</option>
                    <option>Fitness y Musculacion</option>
                    <option>Suplementos y Shakers</option>
                </select>
            </div>
        </div>
        `;
            title.innerHTML = "Nuevo producto";
        } else {
            contenido = `
            <div class="form-row">
            <div class="form-group col-md-6">
                <label for="nombre">Producto</label>
                <input type="text" class="form-control" id="nombre" value="${objeto.nombre}">
            </div>
            <div class="form-group col-md-6">
                <label for="precio">Precio</label>
                <input type="number" class="form-control" id="precio" value="${objeto.precio}" min=0 autocomplete='off'>
            </div>
        </div>
        <div class="form-group">
            <label for="imagen">Imagen</label>
            <input type="text" class="form-control" id="imagen" value="${objeto.imagen}>
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="stock">Stock</label>
                <input type="number" class="form-control" id="stock" placeholder="0" value="${objeto.stock}" min=0 autocomplete='off'>
            </div>
            <div class="form-group col-md-6">
                <label for="categoria">Categoria</label>
                <select id="categoria" class="form-control" value="${objeto.categoria}">
                    <option>Ropa Deportiva</option>
                    <option>Fitness y Musculacion</option>
                    <option>Suplementos y Shakers</option>
                </select>
            </div>
        </div>
        `;
            title.innerHTML = "Modificar producto";
        }
        bodyModificaModal.innerHTML = contenido;
    };

    document.querySelector("#formModif").addEventListener("submit", function (event) {
        event.preventDefault();

        let codigo = new Date().getTime();
        let nombre = document.querySelector("#nombre").value;
        let categoria = document.querySelector("#categoria").value;
        let imagen = document.querySelector("#imagen").value;
        let precio = document.querySelector("#precio").value;
        let stock = document.querySelector("#stock").value;

        if (imagen === "") {
            imagen = "https://bitsofco.de/content/images/2018/12/broken-1.png";
        }

        if (nuevo) {
            let newProduct = new Producto(codigo, nombre, categoria, imagen, parseFloat(precio), stock);
            productos.push(newProduct);
        } else {
            let index = productos.findIndex(function (prod) {
                return prod.codigo === producto.codigo;
            });
            productos[index].nombre = nombre;
            productos[index].categoria = categoria;
            productos[index].imagen = imagen;
            productos[index].precio = precio;
            productos[index].stock = stock;
        }
        localStorage.setItem("productos", JSON.stringify(productos));

        cargarTablaProductos();
        $("#modificarModal").modal("hide");
    });

    function borrarProd(codigo) {
        let index = productos.findIndex(function (prod) {
            return prod.codigo === codigo;
        });

        let validar = confirm(`¿Seguro eliminará ${productos[index].nombre}?`);

        if (validar) {
            productos.splice(index, 1);
            localStorage.setItem("productos", JSON.stringify(productos));
            cargarTablaProductos();
        }
    };

    function modificarProd(codigo) {
        nuevo = false;
        producto = productos.find(function (prod) {
            return prod.codigo == codigo;
        });

        cargaModalModif(producto);
        $("#modificarModal").modal("show");
    };

    cargarTablaProductos();
    cargarTablaUsuarios();
} else {
    contenedor_principal.innerHTML = "";

    let contenido = `  
    <div class="row">
        <div class="col">
            <div class="alert alert-danger" role="alert">
                Acceso denegado! Debe loguearse como administrador.
            </div>
        </div>
    </div>`;
    contenedor_principal.innerHTML = contenido;
}