'use strict';

angular.module('Modules')

.controller('ModulesListController', ['$scope', '$state', '$interval', 'login', 'modules', 'moduleData', 'moduleApp', 'tools',
    function($scope, $state, $interval, login, modules, moduleData, moduleApp, tools) {

        $scope.login = login;
        $scope.modules = modules;
        $scope.moduleApp = moduleApp;
        $scope.moduleData = moduleData;
        $scope.tools = tools;

        moduleApp.typeField = 'id';
        moduleApp.reverse = true;

        modules.moduleAlert = false;
        $scope.modules.search.text = '';
        moduleData.module = {};


        if(tools.subtitles.length === 0){

            tools.getSubtitles();
            tools.getCompanies();
        }

        moduleData.clearIntervals();
        modules.getAccountModules();

        moduleData.selectInterval = $interval(function(){

            modules.getAccountModules();
        }, 5000);

}]);