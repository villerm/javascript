class Konto {
    constructor (kontonumber, intress = 1.5) {
        this.kontonumber = kontonumber;
        this.saldo = 0;
        this.aastaintress = intress;
    }
    lisa(summa){
        if(typeof summa!="number"){
            console.log("ei ole number");
            return false;
        } else if (summa < 0){
            console.log("summa peab olema positiivne");
            return false;
        } else{
            this.saldo += summa;
            return this.saldo;
        }
    }
    eemalda(summa){
        if(typeof summa!="number"){
            console.log("ei ole number");
            return false;
        } else if (summa < 0){
            console.log("summa peab olema positiivne");
            return false;
        } else{
            this.saldo -= summa;
            return this.saldo;
        }
    }
    kysiSaldot(n){
        var s = this.saldo;
        var intress = this.aastaintress/100;
        for (var i = 1; i <= n; i++){
            s += s*intress;
        }
        return s;
    }
    maksa(saaja, summa){
        if(this.saldo >= summa){
            saaja.lisa(summa);
            this.eemalda(summa);
            console.log("Ülekanne sooritatud");
            return true;
        } else {
            console.log("Kontol ei ole piisavalt vahendeid");
            return false;
        }
    }
}
class Pank {
    constructor (){
        this.kontod = [];
    }
    lisaKonto(){
        var kontonr = Math.random().toString().substring(2,10);
        var uuskonto = new Konto(kontonr);
        this.kontod.push(uuskonto);
        return uuskonto;
    }
    otsiKonto(kontonr){
        for ( var k of this.kontod){
            if(k.kontonumber == kontonr){
                return k;
            }
        }
        return null;
    }
}

//TESTIMINE
var minuPank = new Pank();
var numbrid = [];
var n;
for (var i = 0;i < 3; i++){
    n = minuPank.lisaKonto()
    numbrid.push(n.kontonumber);
}
console.log(numbrid);
minuPank.kontod[0].lisa(100);
minuPank.kontod[0].maksa(minuPank.kontod[1], 50);
minuPank.kontod[0].maksa(minuPank.kontod[1], 150);

