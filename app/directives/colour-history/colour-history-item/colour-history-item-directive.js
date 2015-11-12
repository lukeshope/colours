'use strict';

angular.module('angularColour.colourHistoryItem', ['angularColour.colourService'])
.controller('colourHistoryItemController', ['$scope', 'colourService', colourHistoryItemController])
.directive('colourHistoryItem', ['colourService', function(colourService) {
  return {
    restrict: 'E',
    controller: 'colourHistoryItemController',
    controllerAs: 'colourHistoryItem',
    bindToController: true,
    scope: {
      colour: '='
    },
    link: colourHistoryItemLink,
    template: '<div class="colour-history-item" '
      + 'ng-style="{\'background-color\': colourHistoryItem.cssColour}"'
      + 'ng-click="colourHistoryItem.click()"'
      + '></div>'
  }
}]);

function colourHistoryItemController($scope, colourService) {
  this.service = colourService;
  this.cssColour = null;
}

function colourHistoryItemLink(scope, element, attributes, controller) {
  scope.$watch(
    angular.bind(controller, function() {
      return controller.colour.h + ',' + controller.colour.s + ',' + controller.colour.l;
    }),
    angular.bind(controller, function() {
      controller.cssColour = controller.service.convertHSLToCSS(controller.colour);
    })
  );
}

colourHistoryItemController.prototype.click = function click() {
  this.service.selectColour(this.colour);
}
