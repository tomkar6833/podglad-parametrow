'use strict';

angular.module('Modules')

.controller('MenuController', ['$scope', '$state', 'maps', 'login', 'moduleData',
    function($scope, $state, maps, login, moduleData) {

        $scope.maps = maps;
        $scope.login = login;
        $scope.moduleData = moduleData;

    }]);