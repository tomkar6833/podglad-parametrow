'use strict';

angular.module('Modules')

.controller('ModuleInfoController', ['$scope', '$interval', 'tools', 'login', 'moduleData', 'moduleApp',
    function($scope, $interval, tools, login, moduleData, moduleApp) {

        $scope.tools = tools;
        $scope.login = login;
        $scope.moduleData = moduleData;
        $scope.moduleApp = moduleApp;

        moduleApp.module = {};

        moduleData.clearIntervals();
        moduleData.getModuleInfo(moduleData.currentModule);

        moduleData.infoInterval = $interval(function(){

            moduleData.getModuleInfo(moduleData.currentModule);
        }, 5000);
    }]);