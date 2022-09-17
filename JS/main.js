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
    // console.log(extras.selectedIndex);
    // console.log(extras.options[extras.selectedIndex].value);
    // console.log(iva);
    // console.log(typeof(iva));
    let cardText = document.getElementById("cardText");
    let cardCost = document.getElementById("cardCost");
    let flag = true;
    console.log(hours);

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

    if (isNaN(rate)) {
        console.log("Rate not a number");
        document.getElementById("inputRate").style.borderColor = "#FF0000"; 
        flag = false;  
    }else{
        document.getElementById("inputRate").value = rate;
        document.getElementById("inputRate").style.borderColor = "#00FF00";
    }
    
    if (flag){
        cardText.innerHTML = `Email: ${email} <br/> Name: ${name} <br/>
        We can quote a price of requirements:<br/> ${getRequirements(extras)}
        
        
        
        `;
        cardCost.innerHTML = "$"  + quote(hours,rate, iva, extras, changes, fixedCost).toFixed(2);
    }
    
//    cardText.innerHTML = quote(hours,rate, iva, extras.selectedIndex).toFixed(2);
    //cardText.innerHTML = "$" + quote(hours,rate, iva, extras, changes, fixedCost).toFixed(2);

});

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