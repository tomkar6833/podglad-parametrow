'use strict';

angular.module('Modules')

.factory('tools', ['$http', '$filter', '$mdDialog', function($http, $filter, $mdDialog) {

    var factory = {};

    factory.subtitles = [];
    var parameters = [];

    factory.getSubtitles = function(){

        $http.get('/get_subtitles').then(function successCallback(response) {

            factory.subtitles = response.data;
        });

    };

    factory.subtitle = function(id){

        return id > 0 ? factory.subtitles[id] : '';
    };

    factory.showAlert = function(ev, title, text, button) {

        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title(title)
                .textContent(text)
                .ok(button)
                .targetEvent(ev)
        );
    };


    factory.getDay = function(module){

        var dayName = '';

        if(module.type === 12 || module.type === 13 || module.type === 100){

            dayName = ($filter)('dayName')(module.params.dayId);

        }

        return dayName;

    };

    factory.getCompanies = function(){

        $http.get('/get_companies').then(function successCallback(response) {

            factory.companies = response.data;
        });
    };


    factory.company= function(id){

        return id === null ? '--' : factory.companies[id];
    };

    factory.getType = function(id){

        id = id === null ? 0 : id;

        var type = [
            'Pellet',
            'Listwa',
            'Kocioł węglowy',
            'Solar',
            'Pompa ciepła',
            'Rekuperator',
            'Kominek',
            'Sterownik instalacji'

        ];

        return type[id];
    };

    factory.convertMenuParameters = function(module){

        parameters = [
            {
                name: 'Nazwa',
                param: factory.subtitle(module.txtId)
            },
            {
                name: 'Id',
                param: module.id
            },
            {
                name: 'Id rodzica',
                param: module.parentId
            },
            {
                name: 'Indeks',
                param: module.orderId
            },
            {
                name: 'Rodzaj menu',
                param: module.menuType
            },
            {
                name: 'Id  napisu',
                param: module.txtId
            },
            {
                name: 'Id wiki',
                param: module.wikiTxtId
            },
            {
                name: 'Id ikony',
                param: module.iconId
            },
            {
                name: 'Widoczność',
                param: module.access ? 'Tak' : 'Nie'
            },
            {
                name: 'W trakcie zmiany',
                param: module.duringChange ? 'Tak' : 'Nie'
            },
            {
                name: 'Ostatnia aktualizacja',
                param: module.lastUpdate
            },
            {
                name: 'Dane z bazy',
                param: module.rawData
            }
        ];

        parameters = factory.getSpecialParameters(module, parameters);

        return parameters;
    };

    factory.getSpecialParameters = function(module, parameters){

        var data = '';

        switch(module.type){

            case 0:
            case 35:

                parameters.push({
                    name: 'Typ',
                    param: module.type + ' - Element grupujący'
                });

                if(module.params.password){

                    parameters.push({
                        name: 'Hasło',
                        param: module.params.password[0]
                    })
                }
                break;

            case 1:
            case 2:
            case 106:

                parameters.push({
                    name: 'Typ',
                    param: module.type + ' - Kontrolka numeryczna (1 suwak)'
                });
                parameters.push({
                    name: 'Aktualna',
                    param: module.params.value
                });
                parameters.push({
                    name: 'Minimalna',
                    param: module.params.min
                });
                parameters.push({
                    name: 'Maksymalna',
                    param: module.params.max
                });
                parameters.push({
                    name: 'Domyślna',
                    param: module.params.default
                });

                if (module.params.txtId){
                    parameters.push({
                        name: 'Jednostka',
                        param: factory.subtitle(module.params.txtId)
                    });
                }

                if (module.type === 106){

                    parameters.push({
                        name: 'Format',
                        param: module.params.format
                    });
                    parameters.push({
                        name: 'Skok',
                        param: module.params.jump
                    });
                }

                break;


            case 3:
            case 4:
            case 5:

                parameters.push({
                    name: 'Typ',
                    param: module.type + ' - Kontrolka numeryczna (2 suwaki)'
                });
                parameters.push({
                    name: 'Aktualna',
                    param: ($filter)('minHour')(module.params.value, true)
                });
                parameters.push({
                    name: 'Minimalna',
                    param: ($filter)('minHour')(module.params.min, true)
                });
                parameters.push({
                    name: 'Maksymalna',
                    param: ($filter)('minHour')(module.params.max, true)
                });
                parameters.push({
                    name: 'Domyślna',
                    param: ($filter)('minHour')(module.params.default, true)
                });

                if (module.params.txtId){
                    parameters.push({
                        name: 'Jednostka',
                        param: factory.subtitle(module.params.txtId)
                    });
                }

                break;


            case 107:
                parameters.push({
                    name: 'Typ',
                    param: module.type + ' - Edycja daty'
                });
                parameters.push({
                    name: 'Dzień',
                    param: module.params.day
                });
                parameters.push({
                    name: 'Miesiąc',
                    param: module.params.month
                });
                parameters.push({
                    name: 'Rok',
                    param: module.params.year
                });

                break;

            case 10:
                parameters.push({
                    name: 'Typ',
                    param: module.type + ' - Załącz/Wyłącz'
                });
                parameters.push({
                    name: 'Aktualna',
                    param: module.params.value
                });
                parameters.push({
                    name: 'Domyślna',
                    param: module.params.default
                });

                break;

            case 11:
                parameters.push({
                    name: 'Typ',
                    param: module.type + ' - Jeden z wielu'
                });
                parameters.push({
                    name: 'Aktualna',
                    param: module.params.value
                });
                parameters.push({
                    name: 'Domyślna',
                    param: module.params.default
                });

                angular.forEach(module.params.options, function(val){
                    parameters.push({
                        name: 'Opcja : ' + val.value,
                        param: val.txtId + ' - ' + factory.subtitle(val.txtId)
                    })
                });

                break;

            case 15:
                parameters.push({
                    name: 'Typ',
                    param: module.type + ' - Wiele z wielu'
                });
                parameters.push({
                    name: 'Aktualna',
                    param: module.params.value
                });
                parameters.push({
                    name: 'Domyślna',
                    param: module.params.default
                });

                angular.forEach(module.params.options, function(val, key){
                    parameters.push({
                        name: 'Opcja : ' + key,
                        param: val + ' - ' + factory.subtitle(val)
                    })
                });

                break;

            case 12:
                parameters.push({
                    name: 'Typ',
                    param: module.type + ' - Tygodniówka plus/minus'
                });
                parameters.push({
                    name: 'Dzień tygodnia',
                    param: factory.getDay(module) + ' ' + module.params.dayId
                });
                parameters.push({
                    name: 'Id kontrolki dnia poprzedniego',
                    param: module.params.prevObjId
                });
                parameters.push({
                    name: 'Id kontrolki dnia następnego',
                    param: module.params.nextObjId
                });
                parameters.push({
                    name: 'Id kontrolki zmiennej korygowanej',
                    param: module.params.valueObjId
                });
                parameters.push({
                    name: 'Wartość minimalna',
                    param: module.params.min
                });
                parameters.push({
                    name: 'Wartość maksymalna',
                    param: module.params.max
                });

                if(module.params.values.length){

                    angular.forEach(module.params.values, function(val, key){
                        parameters.push({
                            name: 'Godzina : ' + key,
                            param:  + val < 0 ? '-' + val : '+' + val
                        })
                    });
                }
                else {

                    parameters.push({
                        name: 'Opcja',
                        param: 'Wartości domyślne / pusta tablica'
                    })
                }

                break;

            case 13:
                parameters.push({
                    name: 'Typ',
                    param: module.type + ' - Tygodniówka włącz/wyłącz'
                });
                parameters.push({
                    name: 'Dzień tygodnia',
                    param: factory.getDay(module) + ' ' + module.params.dayId
                });
                parameters.push({
                    name: 'Id kontrolki dnia poprzedniego',
                    param: module.params.prevObjId
                });
                parameters.push({
                    name: 'Id kontrolki dnia następnego',
                    param: module.params.nextObjId
                });
                var current = parseInt(module.params.value, 10).toString(2);
                current = current.split("").reverse().join("") + '000000000000000000000000000000000000000000000000';

                parameters.push({
                    name: 'Wartość aktualna',
                    param: current.slice(0, module.params.noZones) + ' ' + module.params.value
                });
                var defaultVal = parseInt(module.params.default, 10).toString(2);
                defaultVal = defaultVal.split("").reverse().join("") + '000000000000000000000000000000000000000000000000';

                parameters.push({
                    name: 'Wartość domlyślna',
                    param: defaultVal.slice(0, module.params.noZones) + ' ' + module.params.default
                });
                parameters.push({
                    name: 'Liczba stref',
                    param: module.params.noZones
                });
                parameters.push({
                    name: 'Opis własny',
                    param: module.params.daySubtitles
                });

                break;

            case 100:
                parameters.push({
                    name: 'Typ',
                    param: module.type + ' - Tygodniówka uniwersalna'
                });
                parameters.push({
                    name: 'Dzień tygodnia',
                    param: factory.getDay(module) + ' ' + module.params.dayId
                });
                parameters.push({
                    name: 'Id kontrolki dnia poprzedniego',
                    param: module.params.prevObjId
                });
                parameters.push({
                    name: 'Id kontrolki dnia następnego',
                    param: module.params.nextObjId
                });
                parameters.push({
                    name: 'Typ harmonogramu',
                    param: module.params.type
                });
                parameters.push({
                    name: 'Krok harmonogramu',
                    param: module.params.step
                });
                parameters.push({
                    name: 'Liczba wierszy',
                    param: module.params.numRows
                });
                parameters.push({
                    name: 'Liczba kolumn',
                    param: module.params.numCols
                });
                parameters.push({
                    name: 'Kolumny (właściwości)',
                    param: ''
                });
                angular.forEach(module.params.cols, function(val){
                    parameters.push({
                        name: factory.subtitle(val.txtId),
                        param: 'Typ: ' + val.type +  ' | min: ' + val.min + ' | max: ' + val.max + ' | interval: ' + val.interval
                    });
                });
                parameters.push({
                    name: 'Wiersze',
                    param: ''
                });
                angular.forEach(module.params.rows, function(val, key){
                    parameters.push({
                        name: 'Wiersz: ' + parseInt(key + 1) + ' (czas)',
                        param: 'Start:' + val.startTime + ' | Start - domyślny: ' + val.defaultStartTime + ' | Koniec: ' + val.endTime + ' | Koniec - domyślny: ' + val.defaultEndTime
                    });
                    parameters.push({
                        name: 'Wiersz: ' + parseInt(key + 1) + ' (kolumny)',
                        param: 'Poziom: ' + val.valueFirstColumn + ' | Poziom - domyślny: ' + val.defaultFirstColumn + ' | Temperatura: ' + val.valueSecondColumn + ' | Temperatura - domyślna: ' + val.defaultSecondColumn
                    });
                });

                break;

            case 20:
                parameters.push({
                    name: 'Typ',
                    param: module.type + ' - Dialog'
                });
                parameters.push({
                    name: 'Napis powiadomienia',
                    param: factory.subtitle(module.params.txtId)
                });
                parameters.push({
                    name: 'Typ dialogu',
                    param: module.params.type
                });
                parameters.push({
                    name: 'Wartość wybrana',
                    param: module.params.value
                });
                parameters.push({
                    name: 'Blokowanie ukrywania kontrolki włączone',
                    param: module.params.blockHide === 1 ? 'Tak' : 'Nie'
                });

                break;

            case 30:
                parameters.push({
                    name: 'Typ',
                    param: module.type + ' - Krzywa grzewcza'
                });
                parameters.push({
                    name: 'Wartość minimalna ',
                    param: module.params.min
                });
                parameters.push({
                    name: 'Wartość maksymalna',
                    param: module.params.max
                });
                parameters.push({
                    name: 'Punkty',
                    param: ''
                });

                angular.forEach(module.params.points, function(val, key){

                    parameters.push({
                        name: 'Parametry punktu: ' + parseInt(key + 1),
                        param: 'Wartość aktualna: ' + val.value + ' | wartość domyślna: ' + val.default + ' | położenie: ' + val.position
                    });
                });

                break;

            case 31:
                parameters.push({
                    name: 'Typ',
                    param: module.type + ' - Krzywa grzewcza przesunięcie/nachylenie'
                });
                parameters.push({
                    name: 'Nachylenie',
                    param: module.params.slope
                });
                parameters.push({
                    name: 'Minimalne nachylenie',
                    param: module.params.minSlope
                });
                parameters.push({
                    name: 'Maksymalne nachylenie',
                    param: module.params.maxSlope
                });
                parameters.push({
                    name: 'Domyślne nachylenie',
                    param: module.params.defaultSlope
                });
                parameters.push({
                    name: 'Przesunięcie',
                    param: module.params.shift
                });
                parameters.push({
                    name: 'Minimalne przesunięcie',
                    param: module.params.minShift
                });
                parameters.push({
                    name: 'Maksymalne przesunięcie',
                    param: module.params.maxShift
                });
                parameters.push({
                    name: 'Domyślne przesunięcie',
                    param: module.params.defaultShift
                });
                parameters.push({
                    name: 'Maksymalna zadana',
                    param: module.params.maxValue
                });

                break;

            case 36:

                parameters.push({
                    name: 'Typ',
                    param: module.type + ' - Podgląd parametrów serwisowych'
                });

                angular.forEach(module.params, function(val, key){

                    parameters.push({
                        name: 'Paramentr: ' + key,
                        param: 'Id napisu: '+ val.txtId + ' | wartość: ' + val.value + ' | typ: ' + val.type + ' : | id jednostki: ' + val.unit + ' | aktywność: ' + val.activity
                    })
                });

                break;

            case 45:

                parameters.push({
                    name: 'Typ',
                    param: module.type + ' - Tabela danych'
                });
                parameters.push({
                    name: 'Liczba kolumn',
                    param: module.params.noCols
                });
                parameters.push({
                    name: 'Liczba wierszy',
                    param: module.params.noRows
                });
                parameters.push({
                    name: 'Nazwy kolumn',
                    param: ''
                });
                angular.forEach(module.params.colsDef, function(val, key){
                    parameters.push({
                        name: 'Kolumna ' + parseInt(key + 1),
                        param: 'Napis: ' + factory.subtitle(val.idSubtitle) + ' | typ: ' + val.type
                    })
                });
                if(module.params.rowsData.length > 0){

                    parameters.push({
                        name: 'Wiersze',
                        param: ''
                    });
                }
                else{
                    parameters.push({
                        name: 'Brak danych dla wierszy',
                        param: ''
                    })
                }

                angular.forEach(module.params.rowsData, function(val, key){
                    data = '';

                    for(var i = 0; i<val.length; i++){

                        data += ' Kolumna ' + parseInt(i+1) + ' : ' + val[i]
                    }

                    parameters.push({
                        name: 'Wiersz ' + parseInt(key + 1) + ' dane: ',
                        param: data
                    })
                });

                break;

            case 46:

                parameters.push({
                    name: 'Typ',
                    param: module.type + ' - Tabela danych - niejednolite wiersze'
                });
                parameters.push({
                    name: 'Liczba kolumn',
                    param: module.params.noCols
                });
                parameters.push({
                    name: 'Liczba wierszy',
                    param: module.params.noRows
                });
                parameters.push({
                    name: 'Kolumny',
                    param: ''
                });

                angular.forEach(module.params.colsDef, function(val, key){

                    parameters.push({
                        name: 'Kolumna ' + parseInt(key + 1),
                        param: 'Napis: ' + factory.subtitle(val)
                    })
                });

                parameters.push({
                    name: 'Wiersze',
                    param: ''
                });


                angular.forEach(module.params.rowsData, function(val, key){

                    data = '';

                    angular.forEach(val, function(value, kolumna){

                        data += ' | Kolumna: ' + parseInt(kolumna + 1) + ' wartość: ' + value.value + ' typ: ' + value.type
                    });

                    parameters.push({
                        name: 'Wiersz ' + parseInt(key + 1),
                        param: data
                    })

                });

                break;
        }

        return parameters;

    };


    factory.convertTileParameters = function(tile){

        parameters = [
            {
                name: 'Nazwa',
                param: tile.params.txtId > 0 ? factory.subtitle(tile.params.txtId) : tile.params.description
            },
            {
                name: 'Id',
                param: tile.id
            },
            {
                name: 'Id rodzica',
                param: tile.parentId
            },
            {
                name: 'Typ',
                param: $filter('tileType')(tile.type)
            },
            {
                name: 'Widoczność',
                param: tile.visibility ? 'Widoczny' : 'Ukryty'
            },
            {
                name: 'Kolejność',
                param: tile.orderId === null ?  'Nieustalono' : tile.orderId
            },
            {
                name: 'Id elementu menu',
                param: tile.menuId
            },
            {
                name: 'Ostatnia aktualizacja',
                param: tile.lastUpdate
            },
            {
                name: 'Dane z bazy',
                param: tile.rawData
            }
        ];

         parameters = factory.getTileSpecialParameters(tile, parameters);

        return parameters;
    };

    factory.getTileSpecialParameters = function(tile, parameters){

        switch(tile.type){


            case 1:

                parameters.push({
                    name: 'Czujnik sprawny',
                    param: tile.params.workingStatus ? 'Tak' : 'Nie'
                });
                parameters.push({
                    name: 'Wartość',
                    param: tile.params.value > -200 ? Math.round(tile.params.value * 10) / 100 : '--'
                });
                parameters.push({
                    name: 'Poziom bateria',
                    param: tile.params.batteryLevel > 0 ? tile.params.batteryLevel : '--'
                });
                parameters.push({
                    name: 'Poziom sygnału',
                    param: tile.params.signalStrength > 0 ? tile.params.signalStrength : '--'
                });


                break;

            case 2:

                parameters.push({
                    name: 'Czujnik sprawny',
                    param: tile.params.workingStatus ? 'Tak' : 'Nie'
                });
                parameters.push({
                    name: 'Wartość',
                    param: tile.params.value > -200 ? Math.round(tile.params.value * 10) / 100 : '--'
                });

                break;

            case 3:

                parameters.push({
                    name: 'Stan',
                    param: tile.params.firingUp === 1 ? 'Rozpalanie' : 'Wygaszanie'
                });

                break;

            case 6:

                parameters.push({
                    name: 'Stan (pasek po lewej)',
                    param: tile.params.statusId === 1 ? 'Wł' : 'Wył'
                });
                parameters.push({
                    name: 'Id ikony',
                    param: tile.params.iconId
                });
                parameters.push({
                    name: 'Wartość 1: napis',
                    param: tile.params.widget1.txtId + ' - ' + factory.subtitle(tile.params.widget1.txtId)
                });
                parameters.push({
                    name: 'Wartość 1: wartość',
                    param: tile.params.widget1.value
                });
                parameters.push({
                    name: 'Wartość 1: jednostka',
                    param: tile.params.widget1.unit
                });
                parameters.push({
                    name: 'Wartość 1: typ',
                    param: tile.params.widget1.type
                });
                parameters.push({
                    name: 'Wartość 1: parametry',
                    param: tile.params.widget1.params
                });
                parameters.push({
                    name: 'Wartość 2: napis',
                    param: tile.params.widget2.txtId + ' - ' + factory.subtitle(tile.params.widget2.txtId)
                });
                parameters.push({
                    name: 'Wartość 2: wartość',
                    param: tile.params.widget2.value
                });
                parameters.push({
                    name: 'Wartość 2: jednostka',
                    param: tile.params.widget2.unit
                });
                parameters.push({
                    name: 'Wartość 2: typ',
                    param: tile.params.widget2.type
                });
                parameters.push({
                    name: 'Wartość 2: parametry',
                    param: tile.params.widget2.params
                });

                break;

            case 11:

                parameters.push({
                    name: 'Stan',
                    param: tile.params.workingStatus ? 'Włączony' : 'Wyłączony'
                });
                parameters.push({
                    name: 'Id ikony',
                    param: tile.params.iconId
                });

                break;

            case 21:

                parameters.push({
                    name: 'Stan',
                    param: tile.params.workingStatus ? 'Włączona' : 'Wyłączona'
                });
                parameters.push({
                    name: 'Numer pompy',
                    param: tile.params.pumpNumber
                });

                break;

            case 22:

                parameters.push({
                    name: 'Stan',
                    param: tile.params.workingStatus ? 'Włączony' : 'Wyłączony'
                });
                parameters.push({
                    name: 'Numer wentylatora',
                    param: tile.params.fanNumber
                });
                parameters.push({
                    name: 'Bieg',
                    param: tile.params.gear
                });

                break;

            case 23:
            case 24:

                parameters.push({
                    name: 'Stan',
                    param: tile.params.workingStatus ? 'Włączony' : 'Wyłączony'
                });
                parameters.push({
                    name: 'Numer zaworu',
                    param: tile.params.valveNumber
                });
                parameters.push({
                    name: 'Temperatura bieżąca',
                    param: Math.round(tile.params.currentTemp * 10) / 100
                });
                parameters.push({
                    name: 'Temperatura powrotu',
                    param: Math.round(tile.params.returnTemp * 10) /100
                });
                parameters.push({
                    name: 'Korekta temperatury zadanej',
                    param: tile.params.setTempCorrection
                });
                parameters.push({
                    name: 'Procent otwarcia',
                    param: tile.params.openingPercentage
                });
                parameters.push({
                    name: 'Numer pompy zaworu',
                    param: tile.params.valvePump
                });
                parameters.push({
                    name: 'Ochrona kotła',
                    param: tile.params.boilerProtection === 1 ? 'Włączona' : 'Wyłączona'
                });
                parameters.push({
                    name: 'Ochrona powrotu',
                    param: tile.params.returnProtection === 1 ? 'Włączona' : 'Wyłączona'
                });
                parameters.push({
                    name: 'Temperatura zadana',
                    param: tile.params.setTemp
                });
                parameters.push({
                    name: 'Dodatkowy napis',
                    param: tile.params.txtId !== null ? tile.params.txtId : '--'
                });

                break;


            case 31:

                parameters.push({
                    name: 'Procent',
                    param: tile.params.percentage
                });
                parameters.push({
                    name: 'Godziny',
                    param: tile.params.hours
                });

                break;

            case 40:

                parameters.push({
                    name: 'Napis nagłówka',
                    param: tile.params.headerId + ' - ' + factory.subtitle(tile.params.headerId)
                });
                parameters.push({
                    name: 'Napis statusu',
                    param: tile.params.statusId + ' - ' + factory.subtitle(tile.params.statusId)
                });
                parameters.push({
                    name: 'Id ikony',
                    param: tile.params.iconId
                });

                break;

            case 41:

                parameters.push({
                    name: 'Rok',
                    param: tile.params.year
                });
                parameters.push({
                    name: 'Miesiąc',
                    param: tile.params.month
                });
                parameters.push({
                    name: 'Dzień',
                    param: tile.params.day
                });
                parameters.push({
                    name: 'Dzień tygodnia',
                    param: tile.params.dayId + ' - ' + ($filter)('dayName')(tile.params.dayId)
                });
                parameters.push({
                    name: 'Godzin',
                    param: tile.params.hours
                });
                parameters.push({
                    name: 'Minut',
                    param: tile.params.minutes
                });

                break;

            case 50:

                parameters.push({
                    name: 'Nazwa sterownika',
                    param: tile.params.controllerName
                });
                parameters.push({
                    name: 'Numer wersji',
                    param: tile.params.version
                });
                parameters.push({
                    name: 'Id firmy',
                    param: tile.params.companyId + ' - ' + factory.company(tile.params.companyId)
                });
                parameters.push({
                    name: 'Napis',
                    param: tile.params.txtId + ' - ' + factory.subtitle(tile.params.txtId)
                });
                parameters.push({
                    name: 'Id ikony',
                    param: tile.params.iconId
                });
                parameters.push({
                    name: 'Id sterownika głównego',
                    param: tile.params.mainControllerId
                });

                break;

            case 51:

                parameters.push({
                    name: 'Napis',
                    param: tile.params.txtId + ' - ' + factory.subtitle(tile.params.txtId)
                });
                parameters.push({
                    name: 'Numer wersji',
                    param: tile.params.version
                });
                parameters.push({
                    name: 'Id ikony',
                    param: tile.params.iconId
                });

                break;

            case 60:

                parameters.push({
                    name: 'Napis',
                    param: tile.params.txtId + ' - ' + factory.subtitle(tile.params.txtId)
                });
                parameters.push({
                    name: 'Id ikony',
                    param: tile.params.iconId
                });

                break;

            case 100:

                parameters.push({
                    name: 'Aktywność',
                    param: tile.params.isActive ? 'Aktywny' : 'Nieaktywny'
                });
                parameters.push({
                    name: 'Numer strefy zastąpionej',
                    param: tile.params.zoneNumber
                });
                parameters.push({
                    name: 'Tryb',
                    param: tile.params.mode === 1 ? 'Równolegle' : 'Wyłączony'
                });
                parameters.push({
                    name: 'Temperatura aktualna CWU',
                    param: Math.round(tile.params.currentTempDHW * 10) /100
                });
                parameters.push({
                    name: 'Temperatura aktualna C',
                    param: Math.round(tile.params.currentTempCH * 10) /100
                });
                parameters.push({
                    name: 'Temperatura zadana CWU',
                    param: Math.round(tile.params.setTempDHW * 10) /100
                });

                break;

        }

        return parameters;
    };

    return factory;

}]);