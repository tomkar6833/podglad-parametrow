'use strict';

angular.module('Modules')

.controller('DialogController', ['$scope', '$mdDialog', 'tools', 'maps', 'moduleData', 'moduleApp',
    function($scope, $mdDialog, tools, maps, moduleData, moduleApp) {

        $scope.tools = tools;
        $scope.maps = maps;
        $scope.moduleApp = moduleApp;
        $scope.moduleData = moduleData;

        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    }]);