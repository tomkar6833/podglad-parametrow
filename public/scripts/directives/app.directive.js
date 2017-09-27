angular.module('Modules')

    .directive('resize', ['$window', function($window) {
        return function (scope, element, attr) {

            var w = angular.element($window);

            scope.$watch(function () {
                return {
                    'h': window.innerHeight,
                    'w': window.innerWidth
                };
            }, function (newValue) {

                scope.windowHeight = newValue.h;
                scope.windowWidth = newValue.w;

            }, true);

            w.bind('resize', function () {
                scope.$apply();
            });
        }
    }]);