'use strict';

angular.module('Modules')

.controller('ModuleAlarmHistoryController', ['$scope', '$interval', '$mdDialog', 'tools', 'login', 'moduleData', 'moduleApp',
    function($scope, $interval, $mdDialog, tools, login, moduleData, moduleApp) {

        $scope.tools = tools;
        $scope.login = login;
        $scope.moduleData = moduleData;
        $scope.moduleApp = moduleApp;

        moduleApp.typeField = 'startAlarm';
        moduleApp.reverse = true;

        moduleApp.search.text = '';
        moduleApp.alarmHistoryAlert = false;
        moduleApp.showAlarmInfo = false;

        moduleData.clearIntervals();
        moduleData.getModuleAlarmHistory();

        $scope.showAlarm = function(ev, alarm) {

            moduleData.selectedAlarm = alarm;

            $mdDialog.show({
                controller: 'DialogController',
                templateUrl: 'views/info/alarm_history_info',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
        };

        moduleData.alarmHistoryInterval = $interval(function(){

            moduleData.getModuleAlarmHistory();
        }, 5000);

    }]);