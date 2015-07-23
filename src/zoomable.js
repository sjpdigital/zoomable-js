const backgroundStyle = {
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

const containerStyle = {
  position: 'absolute',
  zIndex: 999,
  cursor: 'zoom-out',
  transition: 'transform 0.2s ease',
  transformOrigin: 'center center'
};

const imageStyle = {
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

export default class Zoomable {

  constructor (...elements) {
    // If any of the arguments are arrays, let's flatten those
    this.elements = this.flatten(elements);

    // Convert any HTMLCollection types to arrays
    this.elements = Array.prototype.slice.call(this.elements);

    // Attach the handler to each element
    this.elements.map((element) => this.attach(element));

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

  attach (element) {
    element.addEventListener('click', this.zoom.bind(this), false);
    element.style.cursor = 'zoom-in';
  }

  detach (element) {
    element.removeEventListener('click', this.zoom.bind(this), false);
  }

  zoom (event) {
    this.background.addEventListener('click', this.shrink.bind(this), false);
    this.container.addEventListener('click', this.shrink.bind(this), false);

    this.container.style.display = 'block';
    this.container.style.width = `${event.target.offsetWidth}px`;
    this.container.style.height = `${event.target.offsetHeight}px`;

    let targetPosition = event.target.getBoundingClientRect();
    let bodyPosition = document.body.getBoundingClientRect();

    this.background.style.pointerEvents = 'auto';
    this.container.style.pointerEvents = 'auto';

    this.container.style.left = `${targetPosition.left}px`;
    this.container.style.top = `${targetPosition.top - bodyPosition.top}px`;

    let scaleFactor = window.innerWidth < 900 ? 1.0 : 0.8;
    let containerPosition = this.container.getBoundingClientRect();

    let offset = {
      x: (window.innerWidth / 2) - (containerPosition.left + (this.container.offsetWidth / 2)),
      y: (window.innerHeight / 2) - (containerPosition.top + (this.container.offsetHeight / 2)),
      s: Math.min((window.innerWidth * scaleFactor) / event.target.offsetWidth,
                  (window.innerHeight * 0.8) / event.target.offsetHeight)
    };

    this.image.src = event.target.src;
    this.image.style.transform = `scale(${offset.s})`;
    this.container.style.transform = `translate3d(${offset.x}px, ${offset.y}px, 0)`;
  }

  shrink () {
    this.container.style.transform = 'translate3d(0, 0, 0)';
    this.container.style.pointerEvents = 'none';
    this.background.style.pointerEvents = 'none';
    this.image.style.transform = 'scale(1)';

    setTimeout(() => {
      this.container.style.display = 'none';
    }, 200);
  }

  flatten (ary) {
    return ary.reduce((acc, el) => acc.concat(el));
  }

  setStyle (elm, style) {
    for (var def in style) {
      elm.style[def] = style[def];
    }
  }

}
