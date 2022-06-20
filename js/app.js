
function campoRequerido(elemento) {
  console.log("en la funcion campo requerido");
  //   let elemento = document.querySelector('#nombre');
  if (elemento.value === "") {
    elemento.className = "form-control is-invalid";
    return false;
  } else {
    elemento.className = "form-control is-valid";
    return true;
  }
}

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

function validarNumeros(input) {
  if (input.value != "" && !isNaN(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

function validarCantidadCaracteres(input) {
  if (input.value != '' && input.value.length >= 10) {
    input.className = 'form-control is-valid';
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}


function validarCheck() {
  console.log(checkbox.checked)
  if (checkbox.checked) { //if(checkbox.checked == true)
    checkbox.className = 'form-check-input is-valid';
    return true;
  } else {
    checkbox.className = 'form-check-input is-invalid';
    return false;
  }
}

function validarGeneral(event) {
  event.preventDefault(); //Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo. basicamente no me permite actualizar la pantalla 
  console.log('dentro de la funcion validar general' + event);
  let mensaje = [];

  let alerta = document.getElementById("msjEnvio");
  if (campoRequerido(document.getElementById('nombre')) &&
    validarMail(document.getElementById('email')) &&
    validarNumeros(document.getElementById('telefono')) &&
    validarCantidadCaracteres(document.getElementById('consulta')) &&
    validarCheck()) {

    alerta.className = "alert alert-success my-3"
    alerta.innerHTML = "Los datos se enviaron correctamente"
    let nombre = document.querySelector("#nombre").value;
    let telefono = document.querySelector("#telefono").value;
    let email = document.querySelector("#email").value;
    let consulta = document.querySelector("#consulta").value;

    mensaje.push(nombre);
    mensaje.push(telefono);
    mensaje.push(email);
    mensaje.push(consulta);
    // mensaje.push(JSON.stringify(nombre));
    // mensaje.push(JSON.stringify(telefono));
    // mensaje.push(JSON.stringify(email));
    // mensaje.push(JSON.stringify(consulta));
    // console.log(mensaje);
    enviarMailConsulta(mensaje);

  } else {
    alerta.className = "alert alert-warning alert-dismissible fade show my-3"
    alerta.innerHTML = "Ocurrio un error, verifique los datos ingresados"

  }


}

// ===============Email JS===================== 

function enviarMailConsulta(array) {
  console.log(array);
  var templateParamsConsulta = {
    from_name: 'RITMO LATINO',
    user_name: array[0],
    destinatario: array[2],
    message: array[3]
  };
  // console.log(templateParamsConsulta.from_name);
  // console.log(templateParamsConsulta.user_name);
  // console.log(templateParamsConsulta.destinatario);
  // console.log(templateParamsConsulta.message);

  emailjs.send('service_pru7jpa', 'template_ojqof6y', templateParamsConsulta)
    .then(function (response) {
      console.log('SUCCESS!', response.status, response.text);
    }, function (error) {
      console.log('FAILED...', error);
    });
}