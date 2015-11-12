'use strict';

var refreshPage = false;
var reallyLongTests = true;

var rows = 50;
var cols = 50;
var colourTests = [
  // Extremities
  { i: 0, j: 0, name: 'Black' },
  { i: 49, j: 0, name: 'White' },
  { i: 1, j: 0, name: 'Blackish' },
  { i: 48, j: 0, name: 'Whiteish' },
  { i: 25, j: 0, name: 'Boring Grey' },
  { i: 12, j: 0, name: 'Dark Grey' },
  { i: 37, j: 0, name: 'Light Grey' },
  { i: 0, j: 49, name: 'Red' },
  // Core colours
  { i: 2, j: 25, name: 'Red' },
  { i: 25, j: 25, name: 'Light Blue' },
  { i: 5, j: 25, name: 'Orange' },
  { i: 7, j: 25, name: 'Yellow' },
  { i: 12, j: 25, name: 'Green' },
  { i: 20, j: 25, name: 'Bluey Green' },
  { i: 30, j: 25, name: 'Blue' },
  { i: 35, j: 25, name: 'Deep Blue' },
  { i: 40, j: 25, name: 'Purple' },
  { i: 45, j: 25, name: 'Pink' },
  { i: 48, j: 25, name: 'Red' },
  // Nearly grey colours
  { i: 2, j: 10, name: 'Greyey Red' },
  { i: 25, j: 10, name: 'Greyey Light Blue' },
  { i: 5, j: 10, name: 'Greyey Orange' },
  { i: 7, j: 10, name: 'Greyey Yellow' },
  { i: 12, j: 10, name: 'Greyey Green' },
  { i: 20, j: 10, name: 'Greyey Bluey Green' },
  { i: 30, j: 10, name: 'Greyey Blue' },
  { i: 35, j: 10, name: 'Greyey Deep Blue' },
  { i: 40, j: 10, name: 'Greyey Purple' },
  { i: 45, j: 10, name: 'Greyey Pink' },
  { i: 48, j: 10, name: 'Greyey Light Red' },
  // Light colours
  { i: 35, j: 5, name: 'Greyey Blue' },
  { i: 40, j: 5, name: 'Greyey Light Purple' },
  { i: 45, j: 5, name: 'Greyey Light Pink' },
  { i: 48, j: 5, name: 'Greyey Almost-white Red' }
];
var colourRainbow = [
  'Red',
  'Orange',
  'Yellow',
  'Green',
  'Bluey Green',
  'Light Blue',
  'Blue',
  'Deep Blue',
  'Purple',
  'Pink',
  'Red'
];
var greyScale = [
  'Black',
  'Blackish',
  'Dark Grey',
  'Dark Grey',
  'Boring Grey',
  'Boring Grey',
  'Light Grey',
  'Light Grey',
  'Whiteish',
  'Whiteish',
  'White'
];
var saturationScale = [
  'Red',
  'Red',
  'Red',
  'Red',
  'Red',
  'Red',
  'Red',
  'Red',
  'Greyey Red',
  'Greyey Red',
  'Boring Grey'
];


function getIndex(i, j) {
  return j * cols + i;
}

describe('[Colour picker]', function() {

  beforeAll(function() {
    browser.get('index.html');
  });

  browser.driver.manage().window().maximize();

  describe('[Selection grid]', function() {

    beforeEach(function() {
      if ( refreshPage ) browser.get('index.html');
    });

    it('should display 2,500 colours in a grid', function() {
      expect(element.all(by.css('.colour-picker-item')).count()).
        toBe(2500);
    });

  });

  describe('[History]', function() {

    beforeEach(function() {
      if ( refreshPage ) browser.get('index.html');
    });

    it('should add items to history for each colour selected', function() {
      var colourGrid = element.all(by.css('.colour-picker-item'));
      var colourShortTests = colourTests.slice(0,5);
      for ( var i = 0; i < colourShortTests.length; i++ ) {
        var index = getIndex(colourShortTests[i].i, colourShortTests[i].j);
        colourGrid.get(index).click();
      };
      expect(element.all(by.css('.colour-history-item')).count()).toBe(5);
    });

    it('should reorder when a repeated item is selected', function() {
      var colourGrid = element.all(by.css('.colour-picker-item'));
      var colourShortTests = colourTests.slice(0,6).reverse();
      for ( var i = 0; i < colourShortTests.length; i++ ) {
        var index = getIndex(colourShortTests[i].i, colourShortTests[i].j);
        colourGrid.get(index).click();
      };
      expect(element.all(by.css('.colour-history-item')).count()).toBe(6);
      expect(element.all(by.css('.colour-history-item')).get(5).getAttribute('style')).toMatch(/background-color:\s?rgb\(0,\s?0,\s?0\)/);
    });

  });

  describe('[Similar grid]', function() {

    beforeEach(function() {
      if ( refreshPage ) browser.get('index.html');
    });

    it('should provide options for similar saturation', function() {
      expect(element.all(by.css('colour-similar[saturation=\'-10\'] div')).count()).toBe(1);
      expect(element.all(by.css('colour-similar[saturation=\'-5\'] div')).count()).toBe(1);
      expect(element.all(by.css('colour-similar[saturation=\'0\'] div')).count()).toBe(1);
      expect(element.all(by.css('colour-similar[saturation=\'+5\'] div')).count()).toBe(1);
      expect(element.all(by.css('colour-similar[saturation=\'+10\'] div')).count()).toBe(1);
    });

    it('should provide options for similar lightness', function() {
      expect(element.all(by.css('colour-similar[lightness=\'-10\'] div')).count()).toBe(1);
      expect(element.all(by.css('colour-similar[lightness=\'-5\'] div')).count()).toBe(1);
      expect(element.all(by.css('colour-similar[lightness=\'0\'] div')).count()).toBe(1);
      expect(element.all(by.css('colour-similar[lightness=\'+5\'] div')).count()).toBe(1);
      expect(element.all(by.css('colour-similar[lightness=\'+10\'] div')).count()).toBe(1);
    });

    it('should provide options for similar hue', function() {
      expect(element.all(by.css('colour-similar[hue=\'-10\'] div')).count()).toBe(1);
      expect(element.all(by.css('colour-similar[hue=\'-5\'] div')).count()).toBe(1);
      expect(element.all(by.css('colour-similar[hue=\'0\'] div')).count()).toBe(1);
      expect(element.all(by.css('colour-similar[hue=\'+5\'] div')).count()).toBe(1);
      expect(element.all(by.css('colour-similar[hue=\'+10\'] div')).count()).toBe(1);
    });

  });

  describe('[Colour names]', function() {

    var currentItem = 0;

    beforeAll(function() {
      if ( refreshPage ) browser.get('index.html');
    });

    for ( var i = 0; i < colourTests.length; i++ ) {
      (function ( test ) {
        var index = getIndex(test.i, test.j);
        it('should name the colour as ' + test.name + ' at (' + test.i + ', ' + test.j + ')', function() {
          // This is nasty and slow, but that's the idea for this demo
          element.all(by.css('.colour-picker-item')).get(index).click();
          expect(element(by.css('.colour-details h1')).getText()).toBe(test.name);
        });
      })(colourTests[i]);
    }

  });

  describe('[Similar hue]', function() {

    var lastColour = colourRainbow[0];
    var lastHue = 0.0;

    beforeAll(function() {
      if ( refreshPage ) browser.get('index.html');
      element.all(by.css('.colour-picker-item')).get(getIndex(0, 25)).click();
    });

    for ( var i = 1; i < colourRainbow.length; i++ ) {
      lastHue += 10.0;

      (function ( testColour, testLastColour, testHue ) {
        it('should show ' + testColour + ' as similar hue to ' + testLastColour + ' at ' + testHue.toFixed(1) + '%', function() {
          element(by.css('colour-similar[hue=\'+10\'] div')).click();
          expect(element(by.css('.colour-details h1')).getText()).toBe(testColour);
          expect(element(by.id('current-hue')).getText()).toBe(testHue.toFixed(1));
        });
      })(colourRainbow[i], lastColour, lastHue);

      lastColour = colourRainbow[i];
    }

  });

  describe('[Similar lightness]', function() {

    var lastColour = greyScale[0];
    var lastLightness = 0.0;

    beforeAll(function() {
      if ( refreshPage ) browser.get('index.html');
      element.all(by.css('.colour-picker-item')).get(getIndex(0, 0)).click();
    });

    for ( var i = 1; i < greyScale.length; i++ ) {
      lastLightness += 10.0;

      (function ( testColour, testLastColour, testLightness ) {
        it('should show ' + testColour + ' as similar lightness to ' + testLastColour + ' at ' + testLightness.toFixed(1) + '%', function() {
          element(by.css('colour-similar[lightness=\'+10\'] div')).click();
          expect(element(by.css('.colour-details h1')).getText()).toBe(testColour);
          expect(element(by.id('current-lightness')).getText()).toBe(testLightness.toFixed(1));
        });
      })(greyScale[i], lastColour, lastLightness);

      lastColour = greyScale[i];
    }

  });

  describe('[Similar saturation]', function() {

    var lastColour = saturationScale[0];
    var lastSaturation = 100.0;

    beforeAll(function() {
      if ( refreshPage ) browser.get('index.html');
      element.all(by.css('.colour-picker-item')).get(getIndex(0, 49)).click();
    });

    for ( var i = 1; i < saturationScale.length; i++ ) {
      lastSaturation -= 10.0;

      (function ( testColour, testLastColour, testSaturation ) {
        it('should show ' + testColour + ' as similar saturation to ' + testLastColour + ' at ' + testSaturation.toFixed(1) + '%', function() {
          element(by.css('colour-similar[saturation=\'-10\'] div')).click();
          expect(element(by.css('.colour-details h1')).getText()).toBe(testColour);
          expect(element(by.id('current-saturation')).getText()).toBe(testSaturation.toFixed(1));
        });
      })(saturationScale[i], lastColour, lastSaturation);

      lastColour = saturationScale[i];
    }

  });

  describe('[RGB display]', function() {

    beforeAll(function() {
      if ( refreshPage ) browser.get('index.html');
    });

    it('should display (255, 0, 0) for pure red', function() {
      element.all(by.css('.colour-picker-item')).get(getIndex(0, 49)).click();
      expect(element(by.id('current-red')).getText()).toBe('255');
      expect(element(by.id('current-green')).getText()).toBe('0');
      expect(element(by.id('current-blue')).getText()).toBe('0');
    });

    it('should display (255, 255, 255) for pure white', function() {
      element.all(by.css('.colour-picker-item')).get(getIndex(49, 0)).click();
      expect(element(by.id('current-red')).getText()).toBe('255');
      expect(element(by.id('current-green')).getText()).toBe('255');
      expect(element(by.id('current-blue')).getText()).toBe('255');
    });

    it('should display (0, 0, 0) for pure black', function() {
      element.all(by.css('.colour-picker-item')).get(getIndex(0, 0)).click();
      expect(element(by.id('current-red')).getText()).toBe('0');
      expect(element(by.id('current-green')).getText()).toBe('0');
      expect(element(by.id('current-blue')).getText()).toBe('0');
    });

  });

  describe('[Hex display]', function() {

    beforeAll(function() {
      if ( refreshPage ) browser.get('index.html');
    });

    it('should display #FF0000 for pure red', function() {
      element.all(by.css('.colour-picker-item')).get(getIndex(0, 49)).click();
      expect(element(by.id('current-hex')).getText()).toBe('#FF0000');
    });

    it('should display #FFFFFF for pure white', function() {
      element.all(by.css('.colour-picker-item')).get(getIndex(49, 0)).click();
      expect(element(by.id('current-hex')).getText()).toBe('#FFFFFF');
    });

    it('should display #000000 for pure black', function() {
      element.all(by.css('.colour-picker-item')).get(getIndex(0, 0)).click();
      expect(element(by.id('current-hex')).getText()).toBe('#000000');
    });

  });

  describe('[HSL display]', function() {

    beforeAll(function() {
      if ( refreshPage ) browser.get('index.html');
    });

    it('should display (0.0%, 100.0%, 50.0%) for pure red', function() {
      element.all(by.css('.colour-picker-item')).get(getIndex(0, 49)).click();
      expect(element(by.id('current-hue')).getText()).toBe('0.0');
      expect(element(by.id('current-saturation')).getText()).toBe('100.0');
      expect(element(by.id('current-lightness')).getText()).toBe('50.0');
    });

    it('should display (0.0%, 0.0%, 100.0%) for pure white', function() {
      element.all(by.css('.colour-picker-item')).get(getIndex(49, 0)).click();
      expect(element(by.id('current-hue')).getText()).toBe('0.0');
      expect(element(by.id('current-saturation')).getText()).toBe('0.0');
      expect(element(by.id('current-lightness')).getText()).toBe('100.0');
    });

    it('should display (0.0%, 0.0%, 0.0%) for pure black', function() {
      element.all(by.css('.colour-picker-item')).get(getIndex(0, 0)).click();
      expect(element(by.id('current-hue')).getText()).toBe('0.0');
      expect(element(by.id('current-saturation')).getText()).toBe('0.0');
      expect(element(by.id('current-lightness')).getText()).toBe('0.0');
    });

  });

  /**
   *  This code is HORRENDOUS. For purely performance-related reasons
   *  we're marshalling each of the promises manually here and storing up
   *  the expectations until the end of the row. This cuts the time this
   *  set of tests takes from 50 seconds per row to 8.
   */
  if ( !reallyLongTests ) return;
  describe('[All colour test]', function() {

    beforeAll(function() {
      if ( refreshPage ) browser.get('index.html');
    });

    for ( var rowId = 0; rowId < rows; rowId++ ) {
      (function(r) {
        it('should provide a name for all of row ' + (r + 1), function() {
          var colourNames = {};
          var colourElement = element(by.id('colour-name'));

          element.all(by.css('.colour-picker-item')).then(
            function (elements) {
              for( var i = getIndex(0, r); i <= getIndex(cols - 1, r); i++ ) {
                elements[i].click().then((function (colourId) {
                  return function() {
                    colourElement.getText().then(
                      function (text) {
                        colourNames[colourId] = text;
                      }
                    );
                  }
                })(i));
              }
            })
            .then(function() {
              for ( var z = 0; z < cols; z++ ) {
                expect(colourNames[getIndex(z, r)]).toBeDefined();
              }
            });
        });
      })(rowId);
    }
  });

});
