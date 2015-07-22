var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.Zoomable = factory();
})(this, function () {
  'use strict';

  var Zoomable = (function () {
    function Zoomable() {
      var _this = this;

      _classCallCheck(this, Zoomable);

      for (var _len = arguments.length, elements = Array(_len), _key = 0; _key < _len; _key++) {
        elements[_key] = arguments[_key];
      }

      // If any of the arguments are arrays, let's flatten those.
      this.elements = this.flatten(elements);

      // Convert any HTMLCollection types to arrays.
      this.elements = Array.prototype.slice.call(this.elements);

      // Attach the handler to each element.
      this.elements.map(function (element) {
        return _this.attach(element);
      });

      // Create and style the background div.
      this.background = document.createElement('div');

      var backgroundStyle = {
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        zIndex: '998',
        position: 'fixed',
        pointerEvents: 'none',
        cursor: 'zoom-out',
        transition: 'background 0.2s ease'
      };

      this.setStyle(this.background, backgroundStyle);
      document.body.appendChild(this.background);
    }

    _createClass(Zoomable, [{
      key: 'attach',
      value: function attach(element) {
        element.addEventListener('click', this.zoom, false);
      }
    }, {
      key: 'detach',
      value: function detach(element) {
        element.removeEventListener('click', this.zoom, false);
      }
    }, {
      key: 'zoom',
      value: function zoom() {
        console.log(this);

        // Event doesn't need to bubble.
        return false;
      }
    }, {
      key: 'flatten',
      value: function flatten(ary) {
        return ary.reduce(function (acc, el) {
          return acc.concat(el);
        });
      }
    }, {
      key: 'setStyle',
      value: function setStyle(elm, style) {
        for (var def in style) {
          elm.style[def] = style[def];
        }
      }
    }]);

    return Zoomable;
  })();

  return Zoomable;
});
//# sourceMappingURL=./zoomable.js.map