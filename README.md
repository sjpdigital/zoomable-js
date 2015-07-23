# Zoomable.js
> Zoomable is small (3k minified), dependency free, easy to use, non-context-destroying lightbox for images.

Use Zoomable to let users look at those big, beautiful pictures of yours without opening a new browser tab. Zoomable is a lightbox inspired by the one seen on Medium.com, that zooms images up from their current context so as to not let users lose their place or context.

### Installing (not ready yet)

Install as an npm module:
```
npm install --save zoomable-js
```
or with Bower
```
bower install --save zoomable-js
```

### Usage

Just call it on the images you want to be embiggened!

```
var image = document.querySelector('#myImage');
new Zoomable(image);
```

Hang on to a reference if you wanna destroy it later:
```
var zoomer = new Zoomable(image);
zoomer.destroy();
```

### Contributing

This guy's not quite ready for primetime yet, so hang tight.

These are some of the things we gotta do:

- [ ] Configurable
- [ ] Browser Compat
- [ ] Tests
