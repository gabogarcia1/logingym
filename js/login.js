class Usuario {
    constructor(id, email, password, activo = true) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.activo = activo;
    }
}

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

let usuario = {};
// let usuarioLogueado={};
localStorage.setItem('usuario', JSON.stringify(usuario)); // cada vez que se inicie el login, si habia algo en la pantalla del login el usuario desaparece, lo creo de vuelta 
// let admin = new Usuario (9999,"ritmolatinogim@gmail.com","ritmolatino123");
// usuarios.push(admin);

// let admin1 = new Usuario (7999,"gabegarcia916@gmail.com","ritmolatino123");
// usuarios.push(admin1);

// localStorage.setItem("usuarios",JSON.stringify(usuarios));


function validarMail(input) {
    console.log("adentro de validar email")
    let expresion = /\w+@\w+\.[a-z]{2,4}$/;

    if (input.value != "" && expresion.test(input.value)) {

        input.className = "form-control is-valid";

        return true;
    } else {
        input.className = "form-control is-invalid";

        return false;
    }
}


function validar() {
    //  console.log('en funcion validar');
    let inputEmail = document.querySelector("#email");
    let inputPassword = document.querySelector("#password");

    //en usuarios traemos todos los usuarios
    let user = usuarios.find(function (user) {
        return user.email === inputEmail.value;
    });

    // aca va a retornar el usuario que escribi, si no lo encuentra manda un undefined
    if (user !== undefined) {

        if (user.password === inputPassword.value) {
            alert('Estas logueado');
            console.log(user.id)
            if (JSON.stringify(user.id) === "9999") {
                location.href = "admin.html";
            } else {
                location.href = "main.html";
            }

            usuario = {
                id: user.id,
                email: user.email
            }
            localStorage.setItem('usuario', JSON.stringify(usuario));
            //location.href = 'productos.html';
        } else {
            alert('Usuario o contrania incorrecta ')
        }
    } else {
        alert('Usuario o contrania incorrecta ')
    }
    document.querySelector('#btnSubmit').reset();
}

document.querySelector("#btnSubmit").addEventListener("submit", function (event) {
    event.preventDefault();
    validar();
});





/* ================================================= */
/* =============Recuperar contrasenia============= */
/* ================================================= */
function randomPassword() {
    return new Date().getTime()
}
let formularioRecu = document.querySelector('#recuperarSubmit');

formularioRecu.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("adentro de recuperar submit");

    let email = document.querySelector("#mailRecu").value;

    let validar = usuarios.find(function (user) {
        return user.email === email;
    });
    let index = usuarios.findIndex(function (user) {
        return user.email === email;
    });
    let validarAdmin = usuarios.find(function (user) {
        return user.email === 'ritmolatinogim@gmail.com';
    })
    console.log("validar", validar);
    if (validar === validarAdmin) {
        alert("No puedes cambiar la contrasenia del administrador");
        document.querySelector('#recuperarSubmit').reset();
        document.querySelector('#mailRecu').focus();
    }
    if (validar !== undefined && validar !== validarAdmin) {
        // console.log("encontro un usuario con ese mail");
        let newPassword = randomPassword();
        let emailOG = usuarios[index].email;
        let idOG = usuarios[index].id;
        // que hago con el activo?
        usuarios.splice(index, 1);
        // usuarios.push({
        //     id: idOG,
        //     email: emailOG,
        //     password: newPassword,
        //     activo: true
        // });
        //console.log(usuarios);
        let newUser = new Usuario(idOG, emailOG, JSON.stringify(newPassword), activo = true);
        //usuarios.push(newUser);
        console.log("otra vez");



        //console.log(usuarios);
        let mensaje = ['Querido socio', 'telefono', emailOG, `su nueva contraseña es ${newPassword}`];
        //enviarMailRecuperacionPassword(mensaje);
        usuarios.push(newUser);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        enviarMailRecuperacionPassword(mensaje);

        alert("Su contraseña fue cambiada con exito, revise su bandeja de entrada");
        document.querySelector('#recuperarSubmit').reset();
        setTimeout(function () {
            location.href = "login.html";
        }, 3000);

    } else {
        if (validar === undefined) { alert("No se encontro ningun usuario con ese mail"); }

        //document.querySelector('#recuperarSubmit').reset();
        document.querySelector('#mailRecu').focus();



    }
})

// ===============Email JS===================== 


function enviarMailRecuperacionPassword(array) {
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