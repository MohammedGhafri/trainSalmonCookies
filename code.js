'use strict;'
var names = ['Seattle', 'Amman', 'Irbid', 'Dubai', 'Paris'];
var minimum = [23, 3, 11, 20, 2];
var maximum = [65, 24, 38, 38, 16];
var average = [6.3, 1.2, 3.7, 2.3, 4.6];
var olock = ['6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14;00', '15:00', '16:00', '17:00', '18:00', '19:00'];
var forVerticalTot = [];

function Shops(name, minCust, maxCust, avgSale) {
    this.name = name;
    this.minCust = minCust;
    this.maxCust = maxCust;
    this.avgSale = avgSale;
    this.rCus = [];
    this.saleR = [];
    this.totalSalePerShop = 0;
    Shops.all.push(this);

}

Shops.all = [];

Shops.prototype.sales = function () {
    this.rCus = randomCus(this.minCust, this.maxCust);
    this.saleR = (calculation(this.avgSale, this.rCus));
    this.totalSalePerShop = totalPerShop(this.saleR);
}
for (var i = 0; i < names.length; i++) {
    new Shops(names[i], minimum[i], maximum[i], average[i]);
    Shops.all[i].sales();


}

function randomCus(min, max) {
    var a = [];
    for (var i = 0; i < 14; i++) {
        a.push(Math.floor(Math.random() * (max - min)) + min);
    }
    return a;
}
function calculation(aa, barray) {

    var a = [];
    for (var i = 0; i < barray.length; i++) {


        a.push(Math.round(aa * barray[i]));

    }

    return a;
}
TableRendering();

function TableRendering() {
    var table1 = document.createElement('table');
    table1.setAttribute('id', 'table1');
    document.getElementById('divOne').appendChild(table1);
    var tr1 = document.createElement('tr');
    table1.appendChild(tr1)
    var a = document.createElement('td')
    a.textContent = null;
    tr1.appendChild(a);
    for (var i = 0; i < olock.length; i++) {
        var a = document.createElement('td')
        // console.log(i);

        a.textContent = olock[i];

        tr1.appendChild(a);
    }
    var a = document.createElement('td')
    // console.log(i);

    a.textContent = 'Tota Sale per Shop';

    tr1.appendChild(a);

    for (var j = 0; j < Shops.all.length; j++) {
        var tr1 = document.createElement('tr');
        table1.appendChild(tr1)
        var a = document.createElement('td')
        a.textContent = Shops.all[j].name;
        tr1.appendChild(a);

        for (var i = 0; i < olock.length; i++) {
            var a = document.createElement('td')
            a.textContent = Shops.all[j].saleR[i];
            tr1.appendChild(a);
        }
        var a = document.createElement('td')
        a.textContent = Shops.all[j].totalSalePerShop;
        // a.textContent = totalPerShop(Shops.all[j].saleR);
        tr1.appendChild(a);
    }
    var tr1 = document.createElement('tr');
    table1.appendChild(tr1)
    var a = document.createElement('td')
    a.textContent = 'Total vertically';
    tr1.appendChild(a);
    var vTotFinal = 0;
    for (var i = 0; i < olock.length; i++) {
        var vTot = 0;
        for (var j = 0; j < Shops.all.length; j++) {
            vTot += Shops.all[j].saleR[i];
            if (i == 0) {
                vTotFinal += Shops.all[j].totalSalePerShop;
            }
        }
        var a = document.createElement('td')
        a.textContent = vTot;
        tr1.appendChild(a);

    }
    var a = document.createElement('td')
    a.textContent = vTotFinal;
    tr1.appendChild(a);


}
document.getElementById('formOne').addEventListener('submit', startForm);


function startForm() {
    event.preventDefault();
    var name1 = capetalize(event);


    var min1 = parseInt(event.target.minForm.value);
    var max1 = parseInt(event.target.maxForm.value);
    var avg1 = parseFloat(event.target.avgForm.value);

    checkOr(name1, min1, max1, avg1);

}




function checkOr(name1, min1, max1, avg1) {
    for (var i = 0; i < Shops.all.length; i++) {
        if (name1 == Shops.all[i].name) {
            Shops.all[i].minCust = min1;
            Shops.all[i].maxCust = max1;
            Shops.all[i].avgSale = avg1;
            Shops.all[i].sales();
            console.log(Shops.all);
            // if(document.getElementById('divOne')){
            document.getElementById('table1').remove();
            TableRendering();
            break;
            // }
        } else {
            new Shops(name1, min1, max1, avg1).sales();
            console.log(Shops.all);
            document.getElementById('table1').remove();
            TableRendering();
            break;
        }
    }

}


function capetalize(event) {
    var name1 = event.target.nameForm.value;
    name1 = name1.split('');
    name1[0] = name1[0].toUpperCase();
    name1 = name1.join('')
    console.log(name1);
    return name1;
}

function totalPerShop(a) {
    // console.log(a);
    var tot = 0;
    for (var i = 0; i < a.length; i++) {
        // console.log(a[i]);
        tot += a[i];
    }
    forVerticalTot.push(tot);
    // console.log(forVerticalTot);
    // console.log(tot);
    return tot;
}