'use strict';

angular.module('Modules')

.controller('ModuleAlarmController', ['$scope','$interval', '$mdDialog', 'tools', 'login', 'moduleData', 'moduleApp',
    function($scope,  $interval, $mdDialog, tools, login, moduleData, moduleApp) {

        $scope.tools = tools;
        $scope.login = login;
        $scope.moduleData = moduleData;
        $scope.moduleApp = moduleApp;


        moduleApp.typeField = 'lastUpdate';
        moduleApp.reverse = true;

        moduleApp.search.text = '';
        moduleApp.alarmAlert = false;
        moduleApp.showAlarmInfo = false;

        moduleData.clearIntervals();
        moduleData.getModuleAlarm();


        $scope.showAlarm = function(ev, alarm) {

            moduleData.selectedAlarm = alarm;

            $mdDialog.show({
                controller: 'DialogController',
                templateUrl: 'views/info/alarm_info',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
        };

        moduleData.alarmInterval = $interval(function(){

            moduleData.getModuleAlarm();
        }, 5000);

    }]);