'use strict';

angular.module('Modules')

.factory('moduleData', ['$http', '$state', '$interval', 'moduleApp', 'modules', function($http, $state, $interval, moduleApp, modules) {

    var factory = {};

    factory.module = {};

    factory.getSelectModule = function(module){

        if(window.getSelection().toString().length === 0){

            factory.currentModule = module;
            $state.go('module_info');
        }
    };

    factory.clearIntervals = function(){

        $interval.cancel(factory.infoInterval);
        $interval.cancel(factory.menuInterval);
        $interval.cancel(factory.zoneInterval);
        $interval.cancel(factory.tileInterval);
        $interval.cancel(factory.selectInterval);
        $interval.cancel(factory.alarmHistoryInterval);
        $interval.cancel(factory.alarmInterval);

        moduleApp.moduleZones = [];
        moduleApp.moduleTiles = [];
        moduleApp.moduleAlarm = [];
        moduleApp.moduleAlarmHistory = [];
        moduleApp.moduleMenu = [];
        modules.accountModules = [];
    };

    factory.getModuleInfo = function(module){

        factory.selectedModule = true;

        $http.get('/get_module_info', { params: {moduleId: module.id} }).then(function successCallback(response) {

            moduleApp.module = response.data;

            moduleApp.module.maxDates = {
                maxMenu: moduleApp.module.maxDates.max_menu !== null ? moduleApp.module.maxDates.max_menu : null,
                maxTile: moduleApp.module.maxDates.max_tile !== null ? moduleApp.module.maxDates.max_tile : null,
                maxZone: moduleApp.module.maxDates.max_zone !== null ? moduleApp.module.maxDates.max_zone : null
            };

            if(moduleApp.module.info_sterownika !== null){

                var info = moduleApp.module.info_sterownika.split(',');
                moduleApp.module.info_sterownika = info[8] + ' ' + info[4];
            }

            var date = new Date(moduleApp.module.kiedy);
            moduleApp.module.kiedy = ("0" + date.getDate()).slice(-2) + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" + date.getFullYear() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
        });
    };

    factory.getModuleMenu = function(){

        $http.get('/get_module_menu', { params: {moduleId: moduleApp.module.id} }).then(function successCallback(response) {

            moduleApp.moduleMenu = response.data;
            moduleApp.tempModuleMenu = response.data;

            if(moduleApp.moduleMenu.length === 0){

                moduleApp.menuAlert = true;
            }

            if(moduleApp.search.text.length > 0){

                moduleApp.searchText(moduleApp.search.text, 'menu');
            }

            moduleApp.makeMenuTree();
        });
    };

    factory.getModuleTiles = function(){

        $http.get('/get_module_tiles', { params: {moduleId: moduleApp.module.id} }).then(function successCallback(response) {

            moduleApp.moduleTiles = response.data;
            moduleApp.tempModuleTiles = response.data;

            if(moduleApp.moduleTiles.length === 0){

                moduleApp.tilesAlert = true;
            }

            if(moduleApp.search.text.length > 0){

                moduleApp.searchText(moduleApp.search.text, 'tile');
            }
        });
    };
    factory.getModuleZones = function(){

        $http.get('/get_module_zones', { params: {moduleId: moduleApp.module.id} }).then(function successCallback(response) {

            moduleApp.moduleZones = response.data;
            moduleApp.tempModuleZones = response.data;

            if(moduleApp.moduleZones.length === 0 || moduleApp.moduleZones.elements.length === 0){
                moduleApp.zoneAlert = true;
            }
        });
    };

    factory.getModuleAlarm = function(){

        $http.get('/get_module_alarm', { params: {moduleId: moduleApp.module.id} }).then(function successCallback(response) {

            moduleApp.moduleAlarm = response.data;
            moduleApp.tempModuleAlarm = response.data;

            if(moduleApp.moduleAlarm.length === 0){

                moduleApp.alarmAlert = true;
            }

            if(moduleApp.search.text.length > 0){

                moduleApp.searchText(moduleApp.search.text, 'alarm');
            }
        });
    };

    factory.getModuleAlarmHistory = function(){

        $http.get('/get_module_alarm_history', { params: {moduleId: moduleApp.module.id} }).then(function successCallback(response) {

            moduleApp.moduleAlarmHistory = response.data;
            moduleApp.tempModuleAlarmHistory = response.data;


            if(moduleApp.moduleAlarmHistory.length === 0){

                moduleApp.alarmHistoryAlert = true;
            }

            if(moduleApp.search.text.length > 0){

                moduleApp.searchText(moduleApp.search.text, 'alarm_history');
            }
        });
    };


    return factory;

}]);