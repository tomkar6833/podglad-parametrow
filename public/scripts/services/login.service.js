'use strict';

angular.module('Modules')

.factory('login', ['$http', '$state', 'tools', function($http, $state, tools) {

    var factory = {};

    factory.isAuthenticated = function(){

        $http.get('/is_authenticated').then(function successCallback(response) {


            factory.authenticated = response.data.authenticated;

            if(factory.authenticated){

                factory.accountName = response.data.accountName;
                factory.accountType = response.data.accountType;

                $state.go('modules_list');
            }
            else{
                factory.accountName = '';
                factory.accountType = 'user';
                $state.go('map');
            }
        });
    };

    factory.go = function(state){

        $state.go(state);
    };

    factory.resetLoginForm = function(){

        factory.account = '';
        factory.password = '';
        factory.type = 'user';
        factory.database = 'official';
    };

    factory.login = function(event){

        var text = '', title = '', button = '';

        if(factory.account.length > 0 && factory.password.length > 0){

            var data = JSON.stringify({
                'account' : factory.account,
                'password' : factory.password,
                'database' : factory.database,
                'type' : factory.type
            });

            $http.post('/login', data).then(function successCallback(response) {

                factory.resetLoginForm();

                factory.authenticated = response.data.authenticated;

                if(factory.authenticated){

                    $state.go('modules_list');
                    factory.accountName = response.data.accountName;
                    factory.accountType = response.data.accountType;
                }
                else {

                    title = 'Błąd';
                    text = 'Podano błędny login lub hasło';
                    button = 'Spróbuj ponownie';

                    tools.showAlert(event, title, text, button);
                }
            });
        }
        else {

            title = 'Błąd';
            text = 'Brak wpisanego loginu lub hasła';
            button = 'Spróbuj ponownie';

            tools.showAlert(event, title, text, button);
        }
    };

    factory.logout = function(){

        $http.post('/logout').then(function successCallback(response) {

            $state.go('map');

            factory.authenticated = response.data.authenticated;

            factory.accountName = '';
            factory.accountType = '';
        });

    };

    return factory;
}]);
