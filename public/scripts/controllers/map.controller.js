'use strict';

angular.module('Modules')

.controller('MapController', ['$scope', '$state', '$mdSidenav', '$mdBottomSheet', 'maps', 'login', 'moduleData',
    function($scope, $state, $mdSidenav, $mdBottomSheet, maps, login, moduleData) {

        $scope.maps = maps;
        $scope.login = login;

        $scope.maps.search.text = '';
        $scope.maps.showMap = false;

        moduleData.clearIntervals();
        login.resetLoginForm();
        maps.getModules();

        $scope.toggleRight = function() {
            $mdSidenav('right').toggle();
        };

        $scope.openBottomSheet = function() {
            $mdBottomSheet.show ({
                templateUrl: 'views/module_list',
                controller: 'DialogController'
            });
        };

    }]);