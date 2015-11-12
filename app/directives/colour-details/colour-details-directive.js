'use strict';

angular.module('angularColour.colourDetails', ['angularColour.colourService', 'angularColour.colourSimilar'])
.controller('colourDetailsController', ['colourService', colourDetailsController])
.directive('colourDetails', ['colourService', function(colourService) {
  return {
    restrict: 'E',
    controller: 'colourDetailsController',
    controllerAs: 'colourDetails',
    bindToController: true,
    templateUrl: 'directives/colour-details/colour-details.html'
  }
}]);

function colourDetailsController(colourService) {
  this.service = colourService;
}
