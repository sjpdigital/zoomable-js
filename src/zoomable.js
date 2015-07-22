export default class Zoomable {

  constructor (...elements) {
    // If any of the arguments are arrays, let's flatten those.
    this.elements = this.flatten(elements);

    // Convert any HTMLCollection types to arrays.
    this.elements = Array.prototype.slice.call(this.elements);

    // Attach the handler to each element.
    this.elements.map((element) => this.attach(element));

    // Create and style the background div.
    this.background = document.createElement('div');

    let backgroundStyle = {
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

    // Create the container
  }

  attach (element) {
    element.addEventListener('click', this.zoom, false);
  }

  detach (element) {
    element.removeEventListener('click', this.zoom, false);
  }

  zoom () {
    console.log(this);

    // Event doesn't need to bubble.
    return false;
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
