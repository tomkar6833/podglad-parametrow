'use strict';

angular.module('Modules')

.controller('ModuleTilesController', ['$scope', '$interval', '$mdDialog', 'tools', 'login', 'moduleData', 'moduleApp',
    function($scope, $interval, $mdDialog, tools, login, moduleData, moduleApp) {

        $scope.tools = tools;
        $scope.login = login;
        $scope.moduleData = moduleData;
        $scope.moduleApp = moduleApp;

        moduleApp.typeField = 'orderId';
        moduleApp.reverse = false;

        moduleApp.search.text = '';
        moduleApp.tilesAlert = false;

        moduleData.clearIntervals();
        moduleData.getModuleTiles();

        $scope.showTile = function(ev, tile) {

            moduleData.selectControl = tools.convertTileParameters(tile);

            $mdDialog.show({
                controller: 'DialogController',
                templateUrl: 'views/info/info_view',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
        };

        moduleData.tileInterval = $interval(function(){

            moduleData.getModuleTiles();
        }, 5000);

    }]);