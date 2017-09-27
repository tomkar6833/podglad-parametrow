'use strict';

angular.module('Modules', ['ui.router', 'ngMaterial', 'ngSanitize', 'ngMap'])

    .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', '$mdThemingProvider', '$mdAriaProvider', function($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, $mdThemingProvider, $mdAriaProvider) {

        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('red');
        $mdAriaProvider.disableWarnings();

        $httpProvider.interceptors.push(['$injector', '$q', function ($injector, $q) {
            return {

                'responseError': function (response) {
                        window.location.reload();

                    return $q.reject(response);
                }
            };
        }]);

        $httpProvider.defaults.headers.common['Pragma'] = 'no-cache'; // angular IE caching issue

        if (window.history && window.history.pushState) {

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }

        $stateProvider

            .state('map', {
                url: '/map',
                views: {
                       mainView: {

                        templateUrl: 'views/maps',
                        controller: 'MapController',
                        controllerAs: 'mapController'
                       }
                }
            })

            .state('modules_list', {
                url: '/modules_list',
                views: {
                    headerView: {
                        templateUrl: 'views/menu',
                        controller: 'MenuController'
                    },
                    mainView: {
                        templateUrl: 'views/module/list',
                        controller: 'ModulesListController',
                        controllerAs: 'listController'
                    }
                }
            })

            .state('module_info', {
                url: '/module_info',
                views: {
                    headerView: {
                        templateUrl: 'views/menu',
                        controller: 'MenuController'
                    },
                    submenuView: {
                        templateUrl: 'views/submenu',
                        controller: 'MenuController'
                    },
                    mainView: {
                        templateUrl: 'views/module/info',
                        controller: 'ModuleInfoController'
                    }
                }
            })

            .state('module_menu', {
                url: '/module_menu',
                views: {
                    headerView: {
                        templateUrl: 'views/menu',
                        controller: 'MenuController'
                    },
                    submenuView: {
                        templateUrl: 'views/submenu',
                        controller: 'MenuController'
                    },
                    mainView: {
                        templateUrl: 'views/module/menu',
                        controller: 'ModuleMenuController'
                    }
                }
            })

            .state('module_tiles', {
                url: '/module_tiles',
                views: {
                    headerView: {
                        templateUrl: 'views/menu',
                        controller: 'MenuController'
                    },
                    submenuView: {
                        templateUrl: 'views/submenu',
                        controller: 'MenuController'
                    },
                    mainView: {
                        templateUrl: 'views/module/tiles',
                        controller: 'ModuleTilesController'
                    }
                }
            })

            .state('module_zones', {
                url: '/module_zones',
                views: {
                    headerView: {
                        templateUrl: 'views/menu',
                        controller: 'MenuController'
                    },
                    submenuView: {
                        templateUrl: 'views/submenu',
                        controller: 'MenuController'
                    },
                    mainView: {
                        templateUrl: 'views/module/zones',
                        controller: 'ModuleZonesController'
                    }
                }
            })

            .state('module_alarm', {
                url: '/module_alarm',
                views: {
                    headerView: {
                        templateUrl: 'views/menu',
                        controller: 'MenuController'
                    },
                    submenuView: {
                        templateUrl: 'views/submenu',
                        controller: 'MenuController'
                    },
                    mainView: {
                        templateUrl: 'views/module/alarm',
                        controller: 'ModuleAlarmController'
                    }
                }
            })

            .state('module_alarm_history', {
                url: '/module_alarm_history',
                views: {
                    headerView: {
                        templateUrl: 'views/menu',
                        controller: 'MenuController'
                    },
                    submenuView: {
                        templateUrl: 'views/submenu',
                        controller: 'MenuController'
                    },
                    mainView: {
                        templateUrl: 'views/module/alarm_history',
                        controller: 'ModuleAlarmHistoryController'
                    }
                }
            })

            .state('error_404', {
                url: '/404',
                views: {
                    errorView: {
                        templateUrl: 'views/error_404'
                    }
                }
            });

        $urlRouterProvider.otherwise('/404');

    }])

    .run(['$rootScope', '$state', '$http', 'login',
        function ($rootScope, $state, $http, login) {

            $rootScope.state = $state;

            login.isAuthenticated();

    }]);