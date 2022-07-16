//Filippo Bignami

// STATO DELLA MACCHINA
// (DoStep fa evolvere queste variabili nel tempo)
var px,py,pz,verso = 0; 	// posizione e orientamento
var mozzoA, mozzoP, sterzo; // stato interno
var vx,vy,vz; 				// velocita' attuale
var vxm, vym, vzm; // velocita' in spazio macchina
// costanti
var velSterzo, velRitornoSterzo, accMax, raggioRuotaA, raggioRuotaP, grip, 
attrito, attritoX, attritoY, attritoZ; // attriti
var key;
var posMaxX;
var posMaxZ;
var posMinX;
var posMinZ;


// DoStep: facciamo un passo di fisica (a delta-t costante)
// Indipendente dal rendering.
//
// Ricordiamoci che possiamo LEGGERE ma mai SCRIVERE la struttura controller da DoStep
function CarDoStep(){
	// computiamo l'evolversi della macchina
	

	// da vel frame mondo a vel frame macchina
	var cosf = Math.cos(verso*Math.PI/180.0);
	var sinf = Math.sin(verso*Math.PI/180.0);
	vxm = +cosf*vx - sinf*vz;
	vym = vy;
	vzm = +sinf*vx + cosf*vz;

	// gestione dello sterzo
	if (key[1]) sterzo+=velSterzo;
	if (key[3]) sterzo-=velSterzo;
	sterzo*=velRitornoSterzo; // ritorno a volante fermo

	if (key[0]) vzm-=accMax; // accelerazione in avanti
	if (key[2]) vzm+=accMax; // accelerazione indietro

	// attriti (semplificando)
	vxm*=attritoX; 
	vym*=attritoY;
	vzm*=attritoZ;

	// l'orientamento della macchina segue quello dello sterzo
	// (a seconda della velocita' sulla z)
	verso = verso- (vzm*grip)*sterzo;
	THETA = THETA - ((vzm*grip)*sterzo)/57.5;
	Theta_resetta = Theta_resetta - ((vzm*grip)*sterzo)/57.5;


	// rotazione mozzo ruote (a seconda della velocita' sulla z)
	var da ; //delta angolo
	da=(180.0*vzm)/(Math.PI*raggioRuotaA);
	mozzoA+=da;
	da=(180.0*vzm)/(Math.PI*(raggioRuotaP)); //gradi di rotazione, più alti sono, più le ruote sono lente
	mozzoP+=da;
	//console.log(degToRad(mozzoP));
	
	// ritorno a vel coord mondo
	vx = +cosf*vxm + sinf*vzm;
	vy = vym;
	vz = -sinf*vxm + cosf*vzm;

	//****************************************************************************************************
	//GESTIONE AREE

	
	if (Math.round(px) >= (pxArea1-10) && Math.round(px) <= (pxArea1+10)
		&& Math.round(pz) >= (pzArea1-10) && Math.round(pz) <= (pzArea1+10)) {
		
		insideArea1 = true;
	} else if (Math.round(px) >= (pxArea2-10) && Math.round(px) <= (pxArea2+10)
	&& Math.round(pz) >= (pzArea2-10) && Math.round(pz) <= (pzArea2+10)) {

	insideArea2 = true;
	}	else if 	(Math.round(px) >= (pxArea3-10) && Math.round(px) <= (pxArea3+10)	
	&& Math.round(pz) >= (pzArea3-10) && Math.round(pz) <= (pzArea3+10)) {
	
	insideArea3 = true;
	} else if 	(Math.round(px) >= (pxArea4-10) && Math.round(px) <= (pxArea4+10)	
	&& Math.round(pz) >= (pzArea4-10) && Math.round(pz) <= (pzArea4+10)) {
	
	insideArea4 = true;
	}
	else {
		insideArea1 = false;
		insideArea2 = false;
		insideArea3 = false;
		insideArea4 = false;
	
	}
	

	//****************************************************************************************************
	//GESTIONE OSTACOLI

	//suppongo che la macchina provi ad uscire dal mondo solo in avanti e non in retro
	const stepBack = 20;
	if (px >= 700 || px <= -1000|| pz >= 485 || pz <= -485) {
		px+= stepBack * Math.sin(degToRad(verso));
		py+= 0;
		pz+= stepBack * Math.cos(degToRad(verso));
	}
	else {
		px+=vx;
		py+=vy;
		pz+=vz;
		
	}
}

function CarInit(){
	// inizializzo lo stato della macchina
	// posizione e orientamento
	px = 690; py = 0; pz =425;
	verso = 90; //per vedere la parte frontale o posteriore della macchina --> 0: posteriore, 180: anteriore
	
	mozzoA = mozzoP = sterzo = 0; 	// stato
	vx = vy = vz = 0;      			// velocita' attuale
	// inizializzo la struttura di controllo
	key=[false, false, false, false, false];

	velSterzo=0.8;

	velRitornoSterzo=0.93; // B, sterzo massimo = A*B / (1-B)

	accMax = 0.01; //se aumenta, aumenta la velocità della car

	// attriti: percentuale di velocita' che viene mantenuta
	// 1 = no attrito
	// <<1 = attrito grande
	attritoZ = 0.991;  	// piccolo attrito sulla Z (nel senso di rotolamento delle ruote)
	attritoX = 0.8;  	// grande attrito sulla X (per non fare slittare la macchina)
	attritoY = 1.0;  	// attrito sulla y nullo

	// Nota: vel max = accMax*attritoZ / (1-attritoZ)
	raggioRuotaA = 0.25;
	raggioRuotaP = 0.25;
	
	grip = 0.45; // quanto il verso macchina si adegua velocemente allo sterzo
}

