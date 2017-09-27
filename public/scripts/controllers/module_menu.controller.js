'use strict';

angular.module('Modules')

.controller('ModuleMenuController', ['$scope', '$mdDialog', '$interval', 'tools', 'login', 'moduleData', 'moduleApp',
    function($scope, $mdDialog, $interval, tools, login, moduleData, moduleApp) {

        $scope.tools = tools;
        $scope.login = login;
        $scope.moduleData = moduleData;
        $scope.moduleApp = moduleApp;

        moduleApp.typeField = 'menuType';
        moduleApp.reverse = false;

        moduleApp.search.text = '';
        moduleApp.menuAlert = false;

        moduleData.clearIntervals();
        moduleData.getModuleMenu();

        $scope.showControl = function(ev, control) {

            moduleData.selectControl = tools.convertMenuParameters(control);

            $mdDialog.show({
                controller: 'DialogController',
                templateUrl: 'views/info/info_view',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
        };

        moduleData.menuInterval = $interval(function(){

            moduleData.getModuleMenu();
        }, 5000);
    }]);