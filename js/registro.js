class Usuario {
    constructor(id, email, password, activo = true) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.activo = activo;
    }
}

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

let admin = new Usuario(9999, "ritmolatinogim@gmail.com", "ritmolatino123");

let validarAdmin = usuarios.find(function (user) {
    return user.email === admin.email;
});
if (validarAdmin === undefined) {
    usuarios.push(admin);
}


localStorage.setItem("usuarios", JSON.stringify(usuarios));

//-----------------------------

//queremos evitar que se refresque el submit
function idRandom() {
    return new Date().getTime();
}
/*============================== */
/*======Validaciones======== */
/*============================== */
function validarMail(input) {
    console.log("adentro de validar email", input.value)
    let expresion = /\w+@\w+\.[a-z]{2,4}$/;

    if (input.value != "" && expresion.test(input.value)) {
        input.className = "form-control is-valid";
        return true;
    } else {
        input.className = "form-control is-invalid";
        return false;
    }
}
function validadPassword(elemento) {
    console.log("en la funcion validad contrania");

    if (elemento.value === "") {
        elemento.className = "form-control is-invalid";
        return false;
    } else {
        elemento.className = "form-control is-valid";
        return true;
    }
}

function validadPasswordConfirm(elemento) {
    let pass = document.querySelector("#password").value;
    console.log(pass);

    if (elemento.value === "" || elemento.value !== pass) {
        elemento.className = "form-control is-invalid";
        return false;
    } else {
        elemento.className = "form-control is-valid";
        return true;
    }
}




function validarGeneral(event) {
    event.preventDefault(); //me detiene el refresco del submit
    let id = idRandom();
    // let usuario = document.querySelector('#user').value;
    let nombre = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let alerta = document.getElementById("msjRegistro");

    // console.log(validarMail(document.getElementById('email')), validadPassword(document.getElementById('password')) , validadPasswordConfirm(document.getElementById('password1')));
    if (validarMail(document.getElementById('email')) && validadPassword(document.getElementById('password')) && validadPasswordConfirm(document.getElementById('password1'))) {
        //console.log('datos enviados');
        let validar = usuarios.find(function (user) {
            return user.email === email
        });
        console.log(validar)
        if (validar !== undefined) {
            alert('usuario existente');
            document.querySelector('#btnSubmit').reset()

            return; document.querySelector('#email').focus();
        }
        let newUser = new Usuario(id, email, password);
        console.log(newUser);

        usuarios.push(newUser);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alerta.className = "alert alert-success my-3";
        alerta.innerHTML = "Los datos se enviaron correctamente";
        alert('se creo nuevo usuario');





        let mensaje = [nombre, 'telefono', email, ` Le queremos dar la bienvenida al nuestro gimnasio, para loguearse solo tiene que ingresar a nuestra pagina e ingresar con su email ${email} y su contraseña ${password}`];

        enviarMailRegistro(mensaje);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        document.querySelector('#btnSubmit').reset();


        setTimeout(function () {
            location.href = "login.html";
        }, 3000);

    } else {
        // console.log("No se envian los datos perrrrro")

        alerta.className = "alert alert-warning alert-dismissible fade show my-3";
        alerta.innerHTML = "Ocurrio un error, verifique los datos ingresados";

    }

}



// ===============Email JS===================== 

function enviarMailRegistro(array) {
    console.log(array);
    var templateParamsBienvenido = {
        from_name: 'RITMO LATINO',
        user_name: array[0],
        destinatario: array[2],
        message: array[3]
    };
    // console.log(templateParamsConsulta.from_name);
    // console.log(templateParamsConsulta.user_name);
    // console.log(templateParamsConsulta.destinatario);
    // console.log(templateParamsConsulta.message);

    emailjs.send('service_pru7jpa', 'template_g1qf5so', templateParamsBienvenido)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
            console.log('FAILED...', error);
        });
}