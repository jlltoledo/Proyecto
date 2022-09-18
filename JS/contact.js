let btnEnviar = document.getElementById("btnEnviar");
    let nombre = document.getElementById("inputName");
    let apellido = document.getElementById("inputLast");
    let correo = document.getElementById("inputEmail");
    let mensaje = document.getElementById("msgArea");
    let alertSend = document.getElementById("alertSend");
    let regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    console.log(nombre.value, apellido.value, correo.value, mensaje.value);


    
    
    
    
    //nombre:
    nombre.addEventListener("blur", function(e){
        e.preventDefault();
    if(

     (nombre.value.length >= 3)&&(nombre.value.length<=20)
    ){
        nombre.classList.remove("is-invalid");
        nombre.classList.add("is-valid");
    }else{
        nombre.classList.remove("is-valid");
        nombre.classList.add("is-invalid");
    }
    });//nombre


    //if/else apellido
    apellido.addEventListener("blur", function(e){
        e.preventDefault();
        
    if (
        (apellido.value.length >= 4) && (apellido.value.length<=20)
    ){
        apellido.classList.remove("is-invalid");
        apellido.classList.add("is-valid");
    }else{
        apellido.classList.remove("is-valid");
        apellido.classList.add("is-invalid");
    }
    });//apellido

    //input del correo:
    correo.addEventListener("blur", function(e){
        e.preventDefault()
        flagArroba=false;
        flagChar=false;
        flagPunto=false;   
    
        correo.classList.remove("is-invalid");
        correo.classList.add("is-valid");
    
        if ( (correo.value.length<3) || (correo.value.length>70) ){
            correo.classList.remove("is-valid");
            correo.classList.add("is-invalid");
        }//if
    
        for (let i = 0; i < correo.value.length; i++) {
    
        if(correo.value.charCodeAt(i)==64 && flagArroba ==false){
            flagArroba= true;        
        }if (correo.value.charCodeAt(i)==46 && flagPunto ==false){
            flagPunto=true;
        }
    
        if(  (
                 ( correo.value.toLowerCase().charCodeAt(i)<97)
                 ||
                 (correo.value.toLowerCase().charCodeAt(i)>122)
            )
            && ((correo.value.toLowerCase().charCodeAt(i)!=32) ) // espacio
            && ((correo.value.toLowerCase().charCodeAt(i)!=193) ) // Á
            && ((correo.value.toLowerCase().charCodeAt(i)!=201) ) // É
            && ((correo.value.toLowerCase().charCodeAt(i)!=205) ) // Í
            && ((correo.value.toLowerCase().charCodeAt(i)!=211) ) // Ó
            && ((correo.value.toLowerCase().charCodeAt(i)!=218) ) // Ú
            && ((correo.value.toLowerCase().charCodeAt(i)!=209) ) // Ñ
            && ((correo.value.toLowerCase().charCodeAt(i)!=64) )//@
            && ((correo.value.toLowerCase().charCodeAt(i)!=46) )// .
       ) {      
            flagChar=true;
            break;
       }//if 
    }; 
    
    if(flagArroba==false || flagPunto==false || flagChar==true)
     {
        correo.classList.remove("is-valid");
        correo.classList.add("is-invalid");
     }
    
    });//correo
        

    //input mensaje
    mensaje.addEventListener("blur", function (e){
        e.preventDefault()
    
    if (mensaje.value.length >= 15){
        mensaje.classList.remove("is-invalid");
        mensaje.classList.add("is-valid");
    }else{
        mensaje.classList.remove("is-valid");
        mensaje.classList.add("is-invalid");
    }
});
    



    
btnEnviar.addEventListener("click", function(e){
        e.preventDefault();
let sendNombre = nombre.value + " " + apellido.value;
let sendCorreo = correo.value;
let sendAsunto = "Pregunta-Contacto";
let sendCuerpo = "-El correo del usuario es: " + sendCorreo;

sendCuerpo += " - El nombre del usuario es: " +sendNombre+" -Y su mensaje es: " + mensaje.value;


if(nombre.value!="" && apellido.value !="" && correo.value != "" && mensaje.value != ""){
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "jltoledo.ux@gmail.com",
        Password : "F8368BFD72066CD5A05B6921D4C9A0D8CA40",
        To : 'jltoledo.ux@gmail.com',
        From : "jltoledo.ux@gmail.com",
        Subject : sendAsunto,
        Body : sendCuerpo
    }).then(
      message => alert("Success!")
    );
}else{
    alertSend.style.display = "block";
        setTimeout( ()=>{alertSend.style.display = "none"}, 5000);
}
})

;
