'use strict';

angular.module('angularColour.colourHistory', ['angularColour.colourService', 'angularColour.colourHistoryItem'])
.controller('colourHistoryController', ['colourService', colourHistoryController])
.directive('colourHistory', ['colourService', function(colourService) {
  return {
    restrict: 'E',
    controller: 'colourHistoryController',
    controllerAs: 'colourHistory',
    bindToController: true,
    templateUrl: 'directives/colour-history/colour-history.html'
  }
}]);

function colourHistoryController(colourService) {
  this.service = colourService;
}

colourHistoryController.prototype.getItems = function getItems () {
  return this.service.getHistory();
}
