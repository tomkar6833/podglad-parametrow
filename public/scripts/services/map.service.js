'use strict';

angular.module('Modules')

.factory('maps', ['$http', '$window', 'NgMap', function($http, $window, NgMap) {

    var factory = {};

    factory.markers = [];
    factory.databasePromise = {};
    factory.dynMarkers = [];
    factory.onlyActive = true;
    factory.search = {};

    factory.markerClustererOptions = {
        minimumClusterSize: 2000
    };

    factory.getModules = function(){

        if(factory.markers.length > 0 ){

            factory.getMap();
            factory.dynMarkers = [];
            factory.markerClusterer.clearMarkers();
            factory.showMap = true;
        }
        else {

            $http.get('/get_modules').then(function successCallback(response) {

                factory.markers = response.data;
                factory.getMap();
                factory.showMap = true;
            });
        }
    };

    factory.getMap = function(){

        NgMap.getMap({ id: 'map'}).then(function(map) {

            factory.map = map;

            google.maps.event.trigger(map, "resize");

            var latlng = new google.maps.LatLng(47.208, 18.041);
            factory.map.setCenter(latlng);
            factory.map.setZoom(5);

            angular.forEach(factory.markers, function(val){

                if(val.params.controllerConnection === 'A' && val.params.moduleConnection === 'A'){

                    factory.addMarker(val);
                }
            });

            factory.tempMarkers = factory.dynMarkers;
            factory.markerClusterer = new MarkerClusterer(factory.map, factory.dynMarkers,factory.markerClustererOptions);
        });

    };


    factory.centerOnMarker = function(controller){

        if(controller.data.place){

            factory.map.setZoom(12);
            factory.map.setCenter(controller.position);
        }

    };

    factory.addMarker = function(val){

        var latLng = new google.maps.LatLng(val.latitude, val.longitude);

        factory.dynMarkers.push(new google.maps.Marker({
            position:latLng,
            title: val.params.name + '\n' + val.params.type + ' ' + val.params.company + (val.params.place !== null ? '\n' + val.params.place : ''),
            icon: 'img/'+ factory.getType(val.params.type) + '.png',
            data: {
                name: val.params.name,
                type: val.params.type,
                company: val.params.company,
                place: val.params.place,
                controllerConnection: val.params.controllerConnection,
                moduleConnection: val.params.moduleConnection
            }
        }));
    };

    factory.getType = function(type){

        var newType = '';

        if(type === 'Kocioł węglowy'){
            newType = 'Wegiel';
        }
        else if(type === 'Pompa ciepła'){

            newType = 'Pompa';
        }
        else{
            newType = type;
        }

        return newType;
    };

    factory.refreshMap = function() {

        factory.markerClusterer.clearMarkers();
        factory.markerClusterer = new MarkerClusterer(factory.map, factory.dynMarkers,factory.markerClustererOptions);
    };

    factory.searchText = function(searchText){

        var subtitle = '';

        if(searchText.length){

            searchText = searchText.toLowerCase();
            factory.dynMarkers = [];

            angular.forEach(factory.tempMarkers, function(val){

                subtitle = val.title.toLowerCase();

                if (subtitle.indexOf(searchText) >= 0) {

                    if((factory.onlyActive && val.data.controllerConnection === 'A' && val.data.moduleConnection === 'A') || factory.onlyActive === false){

                        factory.dynMarkers.push(val);
                    }
                }
            });

            factory.refreshMap();
        }
        else{

            factory.dynMarkers = factory.tempMarkers;
            factory.refreshMap();
        }
    };

    factory.changeOnlyActive = function(){

        factory.dynMarkers = [];
        factory.search.text = '';

       angular.forEach(factory.markers, function(val){

           if(factory.onlyActive){

               if(val.params.controllerConnection === 'A' && val.params.moduleConnection === 'A'){

                   factory.addMarker(val);
               }
           }
           else {

               factory.addMarker(val);
           }
       });

       factory.tempMarkers = factory.dynMarkers;
       factory.refreshMap();
    };

    return factory;
}]);
