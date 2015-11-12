'use strict';

angular.module('angularColour.colourSimilar', ['angularColour.colourService'])
.controller('colourSimilarController', ['$scope', 'colourService', colourSimilarController])
.directive('colourSimilar', ['colourService', function(colourService) {
  return {
    restrict: 'E',
    controller: 'colourSimilarController',
    controllerAs: 'colourSimilar',
    bindToController: true,
    scope: {
      saturation: '@',
      lightness: '@',
      hue: '@'
    },
    link: colourSimilarItemLink,
    template: '<div class="colour-similar" '
      + 'ng-style="{\'background-color\': colourSimilar.cssColour}"'
      + 'ng-click="colourSimilar.click()"'
      + '><span>{{ colourSimilar.change }}</span></div>'
  }
}]);

function colourSimilarController($scope, colourService) {
  this.service = colourService;
  this.colour = null;
  this.change = '';
}

function colourSimilarItemLink(scope, element, attributes, controller) {
  scope.$watch(
    angular.bind(controller, function() { return this.service.getSelectedColour() }),
    angular.bind(controller, controller.update)
  );
}

colourSimilarController.prototype.update = function update() {
  var service = this.service;
  var shifts = service.getHSL(this.hue || 0, this.saturation || 0, this.lightness || 0);
  var baseColour = service.getSelectedColour();
  var shiftedColour = service.shiftHSL(baseColour, shifts);
  var changeAmount = parseFloat(this.hue || this.saturation || this.lightness);
  this.colour = shiftedColour;
  this.change = ( changeAmount > 0 ? '+' : '' ) + changeAmount.toFixed(0) + '%';
  this.cssColour = service.convertHSLToCSS(shiftedColour);
}

colourSimilarController.prototype.click = function click() {
  this.service.selectColour(this.colour);
}
