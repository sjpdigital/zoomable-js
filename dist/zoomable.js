var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.Zoomable = factory();
})(this, function () {
  'use strict';

  var backgroundStyle = {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 998,
    position: 'fixed',
    pointerEvents: 'none',
    cursor: 'zoom-out',
    transition: 'background 0.2s ease'
  };

  var containerStyle = {
    position: 'absolute',
    zIndex: 999,
    cursor: 'zoom-out',
    transition: 'transform 0.2s ease',
    transformOrigin: 'center center'
  };

  var imageStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    maxWidth: '100%',
    maxHeight: '100%',
    display: 'block',
    transition: 'all 0.2s ease'
  };

  var Zoomable = (function () {
    function Zoomable() {
      var _this = this;

      _classCallCheck(this, Zoomable);

      for (var _len = arguments.length, elements = Array(_len), _key = 0; _key < _len; _key++) {
        elements[_key] = arguments[_key];
      }

      // If any of the arguments are arrays, let's flatten those
      this.elements = this.flatten(elements);

      // Convert any HTMLCollection types to arrays
      this.elements = Array.prototype.slice.call(this.elements);

      // Attach the handler to each element
      this.elements.map(function (element) {
        return _this.attach(element);
      });

      // Create and style the background div
      this.background = document.createElement('div');
      this.setStyle(this.background, backgroundStyle);
      document.body.appendChild(this.background);

      // Create the container
      this.container = document.createElement('div');
      this.setStyle(this.container, containerStyle);
      document.body.appendChild(this.container);

      // Create the image replacement
      this.image = document.createElement('img');
      this.setStyle(this.image, imageStyle);
      this.container.appendChild(this.image);
    }

    _createClass(Zoomable, [{
      key: 'attach',
      value: function attach(element) {
        element.addEventListener('click', this.zoom.bind(this), false);
        element.style.cursor = 'zoom-in';
      }
    }, {
      key: 'detach',
      value: function detach(element) {
        element.removeEventListener('click', this.zoom.bind(this), false);
      }
    }, {
      key: 'zoom',
      value: function zoom(event) {
        this.background.addEventListener('click', this.shrink.bind(this), false);
        this.container.addEventListener('click', this.shrink.bind(this), false);

        this.container.style.display = 'block';
        this.container.style.width = event.target.offsetWidth + 'px';
        this.container.style.height = event.target.offsetHeight + 'px';

        var targetPosition = event.target.getBoundingClientRect();
        var bodyPosition = document.body.getBoundingClientRect();

        this.background.style.pointerEvents = 'auto';
        this.container.style.pointerEvents = 'auto';

        this.container.style.left = targetPosition.left + 'px';
        this.container.style.top = targetPosition.top - bodyPosition.top + 'px';

        var scaleFactor = window.innerWidth < 900 ? 1.0 : 0.8;
        var containerPosition = this.container.getBoundingClientRect();

        var offset = {
          x: window.innerWidth / 2 - (containerPosition.left + this.container.offsetWidth / 2),
          y: window.innerHeight / 2 - (containerPosition.top + this.container.offsetHeight / 2),
          s: Math.min(window.innerWidth * scaleFactor / event.target.offsetWidth, window.innerHeight * 0.8 / event.target.offsetHeight)
        };

        console.log(offset);

        this.image.src = event.target.src;
        this.image.style.transform = 'scale(' + offset.s + ')';
        this.container.style.transform = 'translate3d(' + offset.x + 'px, ' + offset.y + 'px, 0)';
      }
    }, {
      key: 'shrink',
      value: function shrink() {
        var _this2 = this;

        this.container.style.transform = 'translate3d(0, 0, 0)';
        this.container.style.pointerEvents = 'none';
        this.background.style.pointerEvents = 'none';
        this.image.style.transform = 'scale(1)';

        setTimeout(function () {
          _this2.container.style.display = 'none';
        }, 200);
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