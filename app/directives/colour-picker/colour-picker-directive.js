'use strict';

angular.module('angularColour.colourPicker', [
  'angularColour.colourService',
  'angularColour.colourPickerItem'])
.controller('colourPickerController', ['colourService', colourPickerController])
.directive('colourPicker', ['colourService', function() {
  return {
    restrict: 'E',
    controller: 'colourPickerController',
    controllerAs: 'colourPicker',
    bindToController: true,
    templateUrl: 'directives/colour-picker/colour-picker.html'
  }
}]);

function colourPickerController(colourService) {
  this.service = colourService;
  this.rows = 50;
  this.cols = 50;
  this.totalItems = this.rows * this.cols;
  this.items = [];

  this.items.length = this.rows;
  for ( var j = 0; j < this.rows; j++ ) {
    this.items[j] = [];
    this.items[j].length = this.cols;
    for ( var i = 0; i < this.cols; i++ ) {
      this.items[j][i] = this.makeColour(i, j);
    }
  }
}

colourPickerController.prototype.makeRangeArray = function makeRangeArray(len) {
  var a = [];
  a.length = len;
  for ( var i = 0; i < len; i++ ) { a[i] = i; }
  return a;
};

colourPickerController.prototype.getColumns = function getColumns() {
  return this.makeRangeArray(this.cols);
};

colourPickerController.prototype.getRows = function getRows() {
  return this.makeRangeArray(this.rows);
};

colourPickerController.prototype.makeColour = function makeColour(i, j) {
  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }
  var hue = clamp(i / (this.cols - 1), 0.0, 1.0);
  var sat = clamp(j / (this.rows - 1), 0.0, 1.0);
  var grad = Math.max(0.0, ((this.rows - j * 2) / (this.rows - 1) - 0.5) * 2);
  var shift = (i / (this.cols - 1)) - 0.5;
  var lig = clamp(0.5 + grad * shift, 0.0, 1.0);
  return this.service.getHSL(hue, sat, lig);
};

colourPickerController.prototype.getColour = function getColour(i, j) {
  return this.items[j][i];
}
