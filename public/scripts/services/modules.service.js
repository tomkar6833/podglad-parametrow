'use strict';

angular.module('Modules')

.factory('modules', ['$http', '$state', '$filter', 'login', function($http, $state, $filter, login) {

    var factory = {};

    factory.search = {};

    factory.getAccountModules = function(){

        $http.get('/get_account_modules').then(function successCallback(response) {

            if(response.data.authenticated){

                factory.accountModules = response.data.modules;
                factory.tempAccountModules = response.data.modules;

                if(factory.accountModules.length === 0 ) factory.moduleAlert = true;

                if(factory.search.text.length > 0){

                    factory.searchText(factory.search.text);
                }
            }
            else {

                login.logout();
            }
        });

    };


    factory.searchText = function(searchText){

        var subtitle = '';

        if(searchText.length){

            searchText = searchText.toLowerCase();
            factory.accountModules = [];

            angular.forEach(factory.tempAccountModules, function(val){

                subtitle = val.id + ' ' + val.nazwa_modulu + ' ' + val.konto + ' ' + val.email_powiadomien + ' ' + $filter('infoController')(val.info_sterownika);

                if (subtitle.toLowerCase().indexOf(searchText) >= 0) {

                    factory.accountModules.push(val);
                }
            });
        }
        else{

            factory.accountModules = factory.tempAccountModules;
        }
    };

    return factory;

}]);
