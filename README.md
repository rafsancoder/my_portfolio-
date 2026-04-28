https://rafsancoder.github.io/my_portfolio-/
# Asikul Haque Rafsan — Developer Portfolio

Professional portfolio with Robot SAVO showcase, interactive 360° 3D model viewer, and video popup.

## How to run

Use a local server. Do not open `index.html` directly from the file system.

Recommended:

1. Open this folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html`.
4. Choose **Open with Live Server**.

The site should open at a URL like:

```text
http://127.0.0.1:5500/
```

## Important files

```text
assets/robot-savo.jpg
assets/models/robot.glb
assets/videos/robotsavo_video.mp4
index.html
style.css
script.js
```

## 3D model note

The interactive viewer uses Google `<model-viewer>`, loaded from CDN. Internet is needed unless you download and host the library locally.

## Video note

Click the Robot SAVO hero image, the **Watch Robot SAVO Video** button, or the **Play video** button on the 3D viewer to open the popup video.
