'use strict';

angular.module('Modules')

.filter('customOrderBy', ['$filter', 'tools', function($filter, tools) {
    return function(items, field, reverse) {

        var filtered = [];

        var val = reverse ? -1 : 1;

        angular.forEach(items, function(item) {
            filtered.push(item);
        });

        filtered.sort(function (a, b) {

            switch (field) {

                case 'txtId':
                    return tools.subtitle(a.txtId).toLowerCase() > tools.subtitle(b.txtId).toLowerCase ? val : -val;
                    break;

                case 'menuType':

                    if(a[field] === b[field]){

                        return   a['orderId'] > b['orderId'] ? val : -val;
                    }
                    else{

                        return a[field] > b[field] ? val : -val;
                    }
                    break;

                case 'zoneName':

                    var nameA = a.description.name !== 'default' ? a.description.name.toLowerCase : 'Strefa ' + (a.zone.id + 1);
                    var nameB = b.description.name !== 'default' ? b.description.name.toLowerCase : 'Strefa ' + (b.zone.id + 1);

                    return nameA > nameB ? val : -val;
                    break;

                case 'zoneId':

                    return a.zone.id > b.zone.id ? val : -val;
                    break;

                case 'zoneMode':

                    return ($filter)('zoneMode')(a.mode.mode) > ($filter)('zoneMode')(b.mode.mode) ? val : -val;
                    break;

                case 'zoneRelayState':

                    return a.zone.flags.relayState > b.zone.flags.relayState ? val : -val;
                    break;

                case 'zoneState':

                    return a.zone.zoneState > b.zone.zoneState ? val : -val;
                    break;

                case 'actuators':

                    return a.actuators.length > b.actuators.length ? val : -val;
                    break;

                case 'windowsSensor':

                    return a.windowsSensors.length > b.windowsSensors.length ? val : -val;
                    break;

                case 'zoneLastUpdate':

                    return a.zone.time > b.zone.time ? val : -val;
                    break;

                case 'nazwa_modulu':
                case 'konto':

                    var aa = a[field] ? a[field].toLowerCase() : '';
                    var bb = b[field] ? b[field].toLowerCase() : '';

                    return aa > bb ? val : -val;

                    break;

                default:

                    if (field === 'tileName'){
                        a[field] =  a.params.txtId > 0 ? tools.subtitle(a.params.txtId) : a.params.description;
                        b[field] =  b.params.txtId > 0 ? tools.subtitle(b.params.txtId) : b.params.description;
                    }

                    if (field === 'orderId'){
                        a[field] = a[field] === null ? 999 : a[field];
                        b[field] = b[field] === null ? 999 : b[field];
                    }


                    return a[field] > b[field] ? val : -val;
            }
        });

        return filtered;

    };
}])

.filter('menuType', function() {

    return function (value) {

        switch (value) {

            case 'MI':
                value = 'Menu instalatora';
                break;

            case 'MU':

                value = 'Menu użytkownika';
                break;

            case 'MS':

                value = 'Menu serwisowe';
                break;

            case 'MP':

                value = 'Menu producenta';
                break;
        }

        return value;
    };
})

.filter('dayName', ['tools', function(tools){

    return function (value){


        switch(value){

            case 0:         value = tools.subtitle(445);           break;
            case 1:         value = tools.subtitle(590);           break;
            case 2:         value = tools.subtitle(894);           break;
            case 3:         value = tools.subtitle(708);           break;
            case 4:         value = tools.subtitle(235);           break;
            case 5:         value = tools.subtitle(516);           break;
            case 6:         value = tools.subtitle(703);           break;
            case 7:         value = tools.subtitle(588);           break;
            case 8:         value = tools.subtitle(701);           break;
            case 9:         value = tools.subtitle(818);           break;

        }

        return value;
    }
}])
.filter('minHour', function(){

    var min, hour;

    return function (value, correctValue){

        //correctValue - większa od 1440, ale poprawna (defaultowe)

        if(value > 1440 && !correctValue) return '--:--';

        min = value % 60;
        hour = (value - min) / 60;
        value = ('0'+Math.round(hour)).slice(-2) + ':' + ('0' + min).slice(-2);

        return value;
    }
})
.filter('infoController', function(){


    return function (value){

        if(value !== null){

            var info = value.split(',');

            value = info[8] + ' ' + info[4];
        }

        return value;
    }
})
.filter('underfloorMode', function(){

    return function(value){

        switch (value) {

            case 'off':
                value = 'Wyłączony';
                break;

            case 'floorProtection':

                value = 'Ochrona podłogi';
                break;

            case 'sustain':

                value = 'Podtrzymanie';
                break;
        }

        return value;
    }

})
.filter('underfloorCurrentMode', function(){

    return function(value){

        switch (value) {

            case 'alarm':
                value = 'Błąd pracy';
                break;

            case 'off':

                value = 'Wyłączone';
                break;

            case 'floorTooCold':

                value = 'Podłoga za zimna';
                break;

            case 'floorTooHot':

                value = 'Podłoga za ciepła';
                break;

            case 'parametersReached':

                value = 'Parametry osiągnięte';
                break;

            case 'antifreezeProtection':

                value = 'Ochrona przeciwzamrożeniowa';
                break;
        }

        return value;
    }

})
.filter('sensorType', function() {

    return function (value) {

        switch (value) {

            case 'noSensor':

                value = 'Brak czujnika';
                break;

            case 'wireless':

                value = 'Bezprzewodowy czujnik podłogowy';
                break;
        }

        return value;
    };
})
.filter('actuatorState', function() {

    return function (value) {

        switch (value) {

            case 'lowBattery':

                value = 'Niski poziom baterii';
                break;

            case 'damaged':

                value = 'Uszkodzony';
                break;

            case 'noCommunication':

                value = 'Brak komunikacji';
                break;

            case 'unregistered':

                value = 'Niezarejestrowany';
                break;

            case 'noAlarm':

                value = 'Brak alarmów';
                break;
        }

        return value;
    };
})
.filter('zoneMode', function() {

    return function (value) {

        switch (value) {

            case 'constantTemp':
                value = 'Stała temperatura';
                break;

            case 'timeLimit':

                value = 'Stała z ograniczeniem czasu';
                break;

            case 'localSchedule':

                value = 'Harmonogram lokalny';
                break;

            case 'globalSchedule':

                value = 'Harmonogram globalny';
                break;
        }

        return value;
    };
})
.filter('zoneState', function() {

    return function (value) {

        switch (value) {

            case 'sensorDamaged':
                value = 'Czujnik uszkodzony';
                break;

            case 'noCommunication':

                value = 'Brak komunikacji';
                break;

            case 'zoneUnregistered':

                value = 'Niezarejestrowana';
                break;

            case 'zoneOff':

                value = 'Wyłączona';
                break;

            case 'noAlarm':

                value = 'Brak alarmów';
                break;
        }

        return value;
    };
})
.filter('iconZoneType', function() {

    return function (value) {

        switch (value) {

            case 'living_room':
                value = 'Salon';
                break;

            case 'bathroom':

                value = 'Łazienka';
                break;

            case 'kitchen':

                value = 'Kuchnia';
                break;

            case 'bedroom':

                value = 'Sypialnia';
                break;

            case 'children':

                value = 'Pokój dzieci';
                break;

            case 'wardrobe':

                value = 'Garderoba';
                break;

            case 'corridor':

                value = 'Korytarz';
                break;

            case 'garage':

                value = 'Garaż';
                break;
        }

        return value;
    };
})
.filter('controlType', function() {

    return function (value) {



        switch (value) {

            case 0:
            case 35:

                value += ' -  Element zbiorczy menu';
                break;

            case 1:
            case 2:

                value += ' - Numeryczna (1 suwak)';
                break;

            case 3:
            case 4:
            case 5:

                value += ' - Numeryczna (2 suwaki)';
                break;

            case 106:

                value += ' - Uniwersalna';
                break;

            case 107:

                value += ' Ustawienie daty';
                break;

            case 10:

                value += ' - Załącz/Wyłącz';
                break;

            case 11:

                value += ' - Wybór jeden z wielu';
                break;

            case 12:

                value += ' - Tygodniówka plus/minus';
                break;

            case 13:

                value += ' - Tygodniówka on/off';
                break;

            case 100:

                value += ' - Tygodniówka uniwersalna';
                break;

            case 15:

                value += ' - Wybór wielu z wielu';
                break;

            case 20:

                value += ' - Dialog';
                break;

            case 30:

                value += ' - Krzywa grzewcza';
                break;

            case 32:

                value += ' - Grupa admin. statystyk';
                break;

            case 45:

                value += ' - Tabela danych';
                break;

            case 46:

                value += ' - Tabela danych niejednolitych';
                break;

        }

        return value;
    };
})
.filter('tileType', function() {

    return function (value) {

        switch (value) {

            case 1:

                value += ' -  Czujnik temperatury';
                break;

            case 2:

                value += ' - Czujnik ognia';
                break;

            case 3:

                value += ' - Rozpalanie/Wygaszanie';
                break;

            case 6:

                value += ' - Kontrolka uniwersalna';
                break;

            case 11:

                value += ' - Przekaźnik';
                break;

            case 21:

                value += ' - Pompa dodatkowa';
                break;

            case 22:

                value += ' - Wentylator';
                break;

            case 23:

                value += ' - Zawór wbudowany';
                break;

            case 24:

                value += ' - Zawór dodatkowy';
                break;

            case 31:

                value += ' - Zapas paliwa';
                break;

            case 32:

                value += ' - Dezynfekcja';
                break;

            case 40:

                value += ' - Informacja tekstowa';
                break;

            case 41:

                value += ' - Data godzina';
                break;

            case 50:

                value += ' - Wersja oprogramowania sterownika';
                break;

            case 51:

                value += ' - Wersja oprogramowania układu peryferyjnego ';
                break;

            case 60:

                value += ' - Kontener';
                break;

            case 70:

                value += ' - Statystyka';
                break;

            case 100:

                value += ' - CWU listwy';
                break;

        }

        return value;
    };
});

