'use strict';

angular.module('angularColour.colourPickerItem', ['angularColour.colourService'])
.controller('colourPickerItemController', ['colourService', colourPickerItemController])
.directive('colourPickerItem', ['colourService', function(colourService) {
  return {
    restrict: 'E',
    controller: 'colourPickerItemController',
    controllerAs: 'colourItem',
    bindToController: true,
    scope: {
      colour: '='
    },
    link: colourPickerItemLink,
    template: '<div ng-class="{\'colour-picker-item\': true, '
      + '\'colour-picker-item-selected\': colourItem.isSelected}" '
      + 'ng-click="colourItem.click()" '
      + 'ng-style="{\'background-color\': colourItem.cssColour}"></div>'
  }
}]);

function colourPickerItemController(colourService) {
  this.service = colourService;
}

function colourPickerItemLink(scope, element, attrs, controller, transcludeFn) {
  controller.cssColour = controller.service.convertHSLToCSS(controller.colour);
  scope.$watch(
    angular.bind(controller, function() { return this.service.getSelectedColour() }),
    angular.bind(controller, controller.update)
  );
}

colourPickerItemController.prototype.update = function update() {
  this.isSelected = this.service.isSelected(this.colour);
}

colourPickerItemController.prototype.click = function click() {
  this.service.selectColour(this.colour);
}
