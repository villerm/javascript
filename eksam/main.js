class Ratas {
    constructor (id, liik, hind, viivis=2.5, laenatud=null, plaanTagastus=null, tagastatud=null) {
        this.id = id;
        this.liik = liik;
        this.hind = hind;
        this.viivis = viivis;
        this.laenatud = laenatud;
        this.plaanTagastus = plaanTagastus;
        this.tagastatud = tagastatud;
    }
    //kuup2eva teisendamine stringist > date
    stringToDate(_date,_format = 'YYYY-MM-DD',_delimiter = '-') {
            var formatLowerCase=_format.toLowerCase();
            var formatItems=formatLowerCase.split(_delimiter);
            var dateItems=_date.split(_delimiter);
            var monthIndex=formatItems.indexOf("mm");
            var dayIndex=formatItems.indexOf("dd");
            var yearIndex=formatItems.indexOf("yyyy");
            var month=parseInt(dateItems[monthIndex]);
            month-=1;
            var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
            return formatedDate;
    }
    dateToString(_date){
        var monthNames = ["jaanuar", "veebruar", "märts", "aprill", "mai", "juuni",
        "juuli", "august", "september", "oktoober", "november", "detsember"];
        var dateObj = _date;
        var month = monthNames[dateObj.getMonth()];
        var day = String(dateObj.getDate()).padStart(2, '0');
        var year = dateObj.getFullYear();
        var output = day  + '. ' + month + ' ' + year + "a";

        return output;
    }
    Laenamine(startDate, endDate){
        startDate = this.stringToDate(startDate);
        endDate = this.stringToDate(endDate);
        if(startDate && endDate){
            if(this.laenatud == null || this.tagastatud < startDate){
                this.laenatud =  this.dateToString(startDate);
                this.plaanTagastus =  this.dateToString(endDate);
                this.tagastatud = null;
                return true;
            } else {
                console.log('Probleem laenamisega! Kontrolli kas on juba laenatud või laenamise alg kuupäeva!');
                return false;
            }
        } else {
            console.log('Sisesta mõlemad kuupäevad!');
            return false;
        }
    }
    Tagastamine(endDate){
        endDate = this.stringToDate(endDate);
        if(this.laenatud !== null && this.laenatud < endDate){
            this.tagastatud = endDate;
            var diffTime = Math.abs(this.laenatud - this.plaanTagastus);
            var plannedDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            if(endDate > this.plaanTagastus){
                var daysOver = Math.abs(endDate - this.plaanTagastus);
                var daysOverNum = Math.ceil(daysOver / (1000 * 60 * 60 * 24)); 
                var summa = this.hind * (plannedDays + daysOverNum * this.viivis / 100);
            } else {
                var summa = plannedDays * this.hind;
            }
            console.log(summa);
            return summa;
        } else {
            console.log('Ratas pole laenutatud või kuupäev pole möödas!');
            return false;
        }
    }
}
class Laenutus{
    constructor(){
        this.rattad = [];
    }
    lisaRatas(id, liik, hind, viivis=2.5, laenatud=null, plaanTagastus=null, tagastatud=null){
        var id = parseInt(id);
        var hind = parseInt(hind);
        var viivis = parseInt(viivis);
        var uusratas = new Ratas(id, liik, hind, viivis=2.5, laenatud=null, plaanTagastus=null, tagastatud=null);
        var unique = true;
        for (var r of this.rattad) {
            if(r.id == id) {
                unique = false;
            }
        }
        if(unique){
            this.rattad.push(uusratas);
            return true;
        } else {
            console.log('Antud ID-ga on ratas juba lisatud!');
            return false;
        }
    }
    eemaldaRatas(id){
        for (var r of this.rattad) {
            if(r.id == id) {
                this.rattad.splice(r.id-1, 1);
                console.log('Ratas eemaldatud!');
                return true;
            }
        }
        console.log('Puudub antud ID-ga ratas!');
        return false;
    }
    otsiLiik(liik){
        var tulemus = this.rattad.filter(x => x.liik === liik);
        if(tulemus.length>0){
            return tulemus;
        } else {
            console.log('Otsitud liiki ei leitud!');
            return false;
        }
    }
}