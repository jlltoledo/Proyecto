let btnQuote = document.getElementById("btnQuote");
let btnPrint = document.getElementById("btnPrint");

btnQuote.addEventListener("click", function(e){
    e.preventDefault();
    let hours = parseInt(document.getElementById("inputHours").value); 
    let rate = parseFloat(document.getElementById("inputRate").value);
    let iva = document.getElementById("checkIVA").checked;
    let extras = document.getElementById("inputExtras");
    let fixedCost = parseFloat(document.getElementById("inputFCost").value);
    fixedCost = (isNaN(fixedCost)?0:fixedCost); //if ternario
    let changes = parseInt(document.getElementById("inputChanges").value);
    let email = document.getElementById("inputEmail").value;
    let name = document.getElementById("inputName").value;
    changes = (isNaN(changes)?0:changes); //if ternario
    let cardText = document.getElementById("cardText");
    let cardCost = document.getElementById("cardCost");
    let flag = true;
    console.log(hours);
    
    
    


    
    //horas
    if (isNaN(hours)) {
        console.log("Hours not a number");
        console.log(document.getElementById("inputHours").style.borderColor);
        document.getElementById("inputHours").style.borderColor = "#FF0000";
        flag = false;
    }//if
    else{
        document.getElementById("inputHours").value = hours;
        document.getElementById("inputHours").style.borderColor = "#00FF00";
    }
    //tarifa
    if (isNaN(rate)) {
        console.log("Rate not a number");
        document.getElementById("inputRate").style.borderColor = "#FF0000"; 
        flag = false;  
    }else{
        document.getElementById("inputRate").value = rate;
        document.getElementById("inputRate").style.borderColor = "#00FF00";
    }
    //requirements
    if (flag){
        cardText.innerHTML = `Email: ${email} <br/> Name: ${name} <br/>
        We can quote a price of requirements:<br/> ${getRequirements(extras)}
        
        
        
        `;
        cardCost.innerHTML = "$"  + quote(hours,rate, iva, extras, changes, fixedCost).toFixed(2);
    }
    //botón enlazado al servidor de correos
    let sendNombre = name;
    let sendCorreo = email;
    let sendCuerpo = "El correo del ususario es: " + sendCorreo;
    let asunto = "Cotización";
   
    sendCuerpo += "\nEl asunto es: " +asunto+".  \nEl nombre del usuario es: " 
    +sendNombre+"   y su cotización es: " 
    +cardCost.innerHTML;
    
    if(asunto.value!=""&& name.value!="" && email.value !="" && cardCost.innerHTML != "")

    {
        Email.send({
            Host : "smtp.elasticemail.com",
            Username : "jltoledo.ux@gmail.com",
            Password : "F8368BFD72066CD5A05B6921D4C9A0D8CA40",
            To : 'jltoledo.ux@gmail.com',
            From : "jltoledo.ux@gmail.com",
            Subject : asunto,
            Body : sendCuerpo
        }).then(
          message => alert("Success!")
        );
    }else{
        alertSend.style.display = "block";
            setTimeout( ()=>{alertSend.style.display = "none"}, 5000);
    }


});//correo



btnPrint.addEventListener("click", function(e){
    e.preventDefault();
    window.print();

});

const getRequirements = (ex) => {
    let str = ` <br/><ul class="list-group col-4">`;
  
  

    for (let i = 0; i < ex.options.length; i++) {
         console.log( ex.options[i].selected);
            if(ex.options[i].selected){
                str +=` <li class="list-group-item list-group-item-action"> ${ex.options[i].text}  </li>`;
                     }
         }
         str += `</ul>`;
         return str;
}; 


//do while
function quote(h,r,vat, ex, p, fc){
    p/= 100; //p=p/100;
    let result = (h*r) * (1+p);
    let i = 0; //inicio
    do{
        console.log( ex.options[i].selected);
        if(ex.options[i].selected){
            result += parseFloat(ex.options[i].value);
        } //if
        i++; //incremento o decremento
    } while(i < ex.options.length);//while
    result += fc; //fixed costs

    if(vat){
    result *= 1.16;
    } 
    return result;


}