'use strict';

angular.module('angularColour.colourService', [])
  .service('colourService', serviceColour);

function serviceColour() {
  this.selectedColour = this.getHSL(0, 0, 0);
  this.historicColour = [this.selectedColour];
}

serviceColour.prototype.addHistory = function addHistory(item) {
  var removeId = null;
  for ( var i = 0; i < this.historicColour.length; i++ ) {
    if ( this.isMatch(this.historicColour[i], item) ) {
      removeId = i;
    }
  }
  if ( removeId !== null ) {
    this.historicColour.splice(removeId, 1);
  }
  this.historicColour.push(item);
}

serviceColour.prototype.getHistory = function getHistory() {
  return this.historicColour;
}

serviceColour.prototype.getHSL = function getHSL(h, s, l) {
  return {
    h: typeof h === 'number' ? h : parseFloat(h),
    s: typeof s === 'number' ? s : parseFloat(s),
    l: typeof l === 'number' ? l : parseFloat(l)
  };
}

serviceColour.prototype.getRGB = function getHSL(r, g, b) {
  return {
    r: typeof r === 'number' ? r : parseFloat(r),
    g: typeof g === 'number' ? g : parseFloat(g),
    b: typeof b === 'number' ? b : parseFloat(b)
  };
}

serviceColour.prototype.isMatch = function isMatch(a, b) {
  if ( a.h !== b.h ) return false;
  if ( a.s !== b.s ) return false;
  if ( a.l !== b.l ) return false;
  return true;
}

serviceColour.prototype.isSelected = function isSelected(c) {
  return this.isMatch(this.selectedColour, c);
}

serviceColour.prototype.convertHSLToName = function convertHSLToName(hsl) {
  var h = hsl.h * 360.0;
  var l = hsl.l * 100.0;
  var s = hsl.s * 100.0;
  var name;

  if ( h >= 0.0 && h < 20.0 ) name = 'Red';
  if ( h >= 20.0 && h < 40.0 ) name = 'Orange';
  if ( h >= 40.0 && h < 80.0 ) name = 'Yellow';
  if ( h >= 80.0 && h < 150.0 ) name = 'Green';
  if ( h >= 140.0 && h < 165.0 ) name = 'Bluey Green';
  if ( h >= 165.0 && h < 205.0 ) name = 'Light Blue';
  if ( h >= 205.0 && h < 225.0 ) name = 'Blue';
  if ( h >= 225.0 && h < 260.0 ) name = 'Deep Blue';
  if ( h >= 260.0 && h < 295.0 ) name = 'Purple';
  if ( h >= 295.0 && h < 340.0 ) name = 'Pink';
  if ( h >= 340.0 && h <= 360.0 ) name = 'Red';

  if ( l >= 80.0 && l < 100.0 ) name = 'Almost-white ' + name;
  if ( l >= 60.0 && l < 80.0 ) name = 'Light ' + name;
  if ( l >= 0.0 && l <= 20.0 ) name = 'Dark ' + name;

  if ( s >= 0.0 && s < 10.0 ) {
    if ( l < 1.0 ) name = 'Black';
    if ( l >= 1.0 && l < 20.0 ) name = 'Blackish';
    if ( l >= 20.0 && l < 40.0 ) name = 'Dark Grey';
    if ( l >= 40.0 && l < 60.0 ) name = 'Boring Grey';
    if ( l >= 60.0 && l < 80.0 ) name = 'Light Grey';
    if ( l >= 80.0 && l < 100.0 ) name = 'Whiteish';
    if ( l >= 100.0 ) name = 'White';
  }
  if ( s >= 10.0 && s < 30.0 ) name = 'Greyey ' + name;

  return name;
}

serviceColour.prototype.convertHSLToRGB = function convertHSLToRGB(hsl) {
  var r, g, b;

  if(hsl.s == 0){
      r = g = b = hsl.l;
  }else{
      var hue2rgb = function hue2rgb(p, q, t){
          if(t < 0) t += 1;
          if(t > 1) t -= 1;
          if(t < 1/6) return p + (q - p) * 6 * t;
          if(t < 1/2) return q;
          if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
      }

      var q = hsl.l < 0.5 ? hsl.l * (1 + hsl.s) : hsl.l + hsl.s - hsl.l * hsl.s;
      var p = 2 * hsl.l - q;
      r = hue2rgb(p, q, hsl.h + 1/3);
      g = hue2rgb(p, q, hsl.h);
      b = hue2rgb(p, q, hsl.h - 1/3);
  }

  return this.getRGB(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
}

serviceColour.prototype.convertHSLToCSS = function convertHSLToCSS(hsl) {
  return this.convertRGBToCSS(this.convertHSLToRGB(hsl));
}

serviceColour.prototype.convertRGBToCSS = function convertRGBToCSS(rgb) {
  return 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';
}

serviceColour.prototype.shiftHSL = function convertRGBToCSS(hsl, shift) {
  return this.getHSL(
    Math.min(1.0, Math.max(0.0, hsl.h + shift.h / 100)),
    Math.min(1.0, Math.max(0.0, hsl.s + shift.s / 100)),
    Math.min(1.0, Math.max(0.0, hsl.l + shift.l / 100))
  );
}

serviceColour.prototype.convertRGBToHex = function convertRGBToHex(rgb) {
  return ('#' + this.padString(rgb.r.toString(16), 2)
    + this.padString(rgb.g.toString(16), 2)
    + this.padString(rgb.b.toString(16), 2)).toUpperCase();
}

serviceColour.prototype.selectColour = function selectColour(colour) {
  if ( typeof colour === 'string' ) {
    this.selectedColour = JSON.parse(colour);
  } else {
    this.selectedColour = colour;
  }
  this.addHistory(this.selectedColour);
}

serviceColour.prototype.padString = function padString(s, len) {
  for ( var i = s.length; i < len; i++ ) {
    s += '0';
  }
  return s;
}

serviceColour.prototype.getSelectedColour = function getSelectedColour() {
  return this.selectedColour;
}

serviceColour.prototype.getSelectedColourAsRGB = function getSelectedColourAsRGB() {
  return this.convertHSLToRGB(this.selectedColour);
}

serviceColour.prototype.getSelectedColourAsHex = function getSelectedColourAsHex() {
  return this.convertRGBToHex(this.convertHSLToRGB(this.selectedColour));
}

serviceColour.prototype.getSelectedColourAsCSS = function getSelectedColourAsCSS() {
  return this.convertHSLToCSS(this.selectedColour);
}
