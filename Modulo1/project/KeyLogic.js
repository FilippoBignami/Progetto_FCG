//Filippo Bignami

var pxArea1=590, pzArea1=250;
var pxArea2=320, pzArea2=286;
var pxArea3=30, pzArea3=60;
var pxArea4=-550, pzArea4=286;
//var pxPizza, pyPizza, pzPizza;
var insideArea1 = false; //default = red, green when the pizza can be delivered
var insideArea2 = false;
var insideArea3 = false;
var insideArea4 = false;

//var leavePizza = [false, false, false]; 
var CatchedKey = 0; 
var CatchedKey1 = false;
var CatchedKey2 = false;
var CatchedKey3 = false;
var open_tower = false;

function catchKey() {
	if (key[4] && insideArea1) { //BAR SPACE clicked
		key[4]=false;
		CatchedKey++; //3
		CatchedKey1 = true;
        show();
    }
	 if (key[4] && insideArea2) { //BAR SPACE clicked
		key[4]=false;
		CatchedKey++; //3
		CatchedKey2 = true;
		show();
     }
	 if (key[4] && insideArea3) { //BAR SPACE clicked
		key[4]=false;
		CatchedKey++; //3
		CatchedKey3 = true;
		show();}

    
    if (key[4] && insideArea4)  { //BAR SPACE clicked
		key[4]=false;
        open_tower = true;
        show();
}

}

 function show(){
    let string; 
    if (CatchedKey > 3) {
        alert("HAI GIA' RACCOLTO TUTTE LE CHIAVI");}
    if (open_tower){
        string = "COMPLIMENTI HAI LIBERATO LA PRINCIPESSA ED HAI VINTO!! ORA PUOI CONTINUARE A GIROVAGARE NELLA CITTA'";
    
    }
    
    
    if (CatchedKey === 1 ) string = "COMPLIMENTI! HAI RACCOLTO " + CatchedKey + " CHIAVE SU 3! NE RESTANO DUE DA TROVARE.";
    if (CatchedKey === 2 ) string = "COMPLIMENTI! HAI RACCOLTO " + CatchedKey + " CHIAVI SU 3! NE RESTA SOLO UNA  DA TROVARE.";
    if (CatchedKey === 3 && !open_tower) string = "COMPLIMENTI! HAI RACCOLTO " + CatchedKey + " CHIAVI SU 3! ORA DIRIGITI VERSO LA TORRE E LIBERA LA PRINCIPESSA INTRAPPOLATA! ";
    document.getElementById('text').innerHTML = string;
 }


