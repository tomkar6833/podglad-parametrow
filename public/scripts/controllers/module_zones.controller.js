'use strict';

angular.module('Modules')

.controller('ModuleZonesController', ['$scope', '$interval', '$mdDialog', 'tools', 'login', 'moduleData', 'moduleApp',
    function($scope, $interval, $mdDialog, tools, login, moduleData, moduleApp) {

        $scope.tools = tools;
        $scope.login = login;
        $scope.moduleData = moduleData;
        $scope.moduleApp = moduleApp;

        moduleApp.zoneAlert = false;

        moduleApp.reverse = false;
        moduleApp.typeField = 'zoneName';


        moduleData.clearIntervals();
        moduleData.getModuleZones(moduleData.currentModule);

        $scope.showZone = function(ev, zone) {

            moduleData.selectedZone = zone;

            $mdDialog.show({
                controller: 'DialogController',
                templateUrl: 'views/info/zone_info',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
        };

        $scope.showSchedule = function(ev, schedule) {

            moduleData.selectedSchedule = schedule;

            $mdDialog.show({
                controller: 'DialogController',
                templateUrl: 'views/info/schedule_info',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
        };

        moduleData.zoneInterval = $interval(function(){

            moduleData.getModuleZones(moduleData.currentModule);
        }, 5000);

    }]);