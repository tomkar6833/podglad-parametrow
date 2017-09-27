'use strict';

angular.module('Modules')

.factory('moduleApp', ['tools', function(tools) {

    var factory = {};

    factory.search = {};

    factory.makeMenuTree = function(){

        factory.menuTree = [];

        var margin = 0;

        angular.forEach(factory.tempModuleMenu, function(val){

            if(val.id === 0){

                margin = 30;
                val['margin'] = 30;
                factory.menuTree.push(val);
                factory.searchNode(val, margin + 100);
            }
        });
    };

    factory.searchNode = function(parent, margin){

        angular.forEach(factory.tempModuleMenu, function(val){

            if(val.parentId === parent.id && val.id !== 0 && val.menuType === parent.menuType){

                val['margin'] = margin;
                factory.menuTree.push(val);

                if(val.type === 0 || val.type === 35){

                    factory.searchNode(val, margin + 100);
                }
            }
        })
    };

    factory.searchText = function(searchText, type){

        var subtitle = '';
        var params = {};

        if(type === 'menu'){

            params['modules'] = 'moduleMenu';
            params['tempModules'] = 'tempModuleMenu';
        }
        else if(type === 'tile'){

            params['modules'] = 'moduleTiles';
            params['tempModules'] = 'tempModuleTiles';
        }
        else if(type === 'alarm'){

            params['modules'] = 'moduleAlarm';
            params['tempModules'] = 'tempModuleAlarm';
        }
        else if(type === 'alarm_history'){

            params['modules'] = 'moduleAlarmHistory';
            params['tempModules'] = 'tempModuleAlarmHistory';
        }


        if(searchText.length){

            searchText = searchText.toLowerCase();
            factory[params.modules] = [];

            angular.forEach(factory[params.tempModules], function(val){


                if(type === 'menu'){

                    subtitle = tools.subtitle(val.txtId) + ' ' + tools.getDay(val) + ' ' + val.id;
                }
                else if( type === 'tile'){

                    subtitle = (val.params.txtId ? tools.subtitle(val.params.txtId) : val.params.description) + ' ' + val.id;
                }
                else if( type === 'alarm' || type === 'alarm_history'){

                    subtitle = tools.subtitle(val.txtId) + ' ' + val.id;
                }

                if (subtitle.toLowerCase().indexOf(searchText) >= 0) {

                    factory[params.modules].push(val);
                }
            });
        }
        else{

            factory[params.modules] = factory[params.tempModules];
        }
    };


    factory.showAlarm = function(type, alarm){

        if(type === 'show'){

            factory.alarm = alarm;
            factory.showAlarmInfo = true;
        }
        else {

            factory.showAlarmInfo = false;
        }
    };

    factory.getControllerModeName = function(){

        var array = [3109, 811, 809, 1401];

        return tools.subtitle(array[factory.moduleZones.controllerParameters.controllerMode.value]);
    };

    factory.setOrder = function(type){

        if(type === factory.typeField){

            factory.reverse = !factory.reverse;
        }
        else{
            factory.typeField = type;
            factory.reverse = false;
        }
    };

    return factory;

}]);