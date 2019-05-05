Photo Collage Maker
====================

## Setup

Requires `photo-collage`, which requires `node-canvas`. I forked `photo-collage` because it wasn't building on the latest Node.js (12+). That's why `photo-collage` is loaded from `joeyguerra/photo-collage.git#master`. Also, you'll have to install `node-canvas`. If you do it on Mac using `brew install pkg-config cairo pango libpng jpeg giflib librsvg`, you'll likely have to set the `PKG_CONFIG_PATH` so the *Cairo* build can find `libffi`.

```bash
PKG_CONFIG_PATH="/usr/local/opt/libffi/lib/pkgconfig/" npm i
```

Run it like:
```bash
PHOTOS_PATH=/Users/you/yourfoldertoabunchofphotos node index.js
```

