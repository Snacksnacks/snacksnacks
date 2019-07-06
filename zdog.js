// Made with Zdog

var yellow = '#ED0';
var gold = '#EA0';
var orange = '#E62';
var garnet = '#C25';
const TAU = Zdog.TAU;

var illo = new Zdog.Illustration({
  element: '.zdog-canvas',
  dragRotate: true,
  rotate: { x: -TAU/8 },
});

var burger = new Zdog.Anchor({
  addTo: illo,
  translate: { y: 24 },
  rotate: { x: TAU/4 },
});

// top bun
var topBun = new Zdog.Hemisphere({
  addTo: burger,
  diameter: 96,
  translate: { z: 54 },
  stroke: 24,
  color: orange,
  backface: gold,
});

// cheese
new Zdog.Rect({
  addTo: burger,
  width: 92,
  height: 92,
  translate: { z: 28 },
  stroke: 16,
  color: yellow,
  fill: true,
});

// patty
new Zdog.Ellipse({
  addTo: burger,
  diameter: 96,
  stroke: 32,
  color: garnet,
  fill: true,
});

// bottom bun
new Zdog.Cylinder({
  addTo: burger,
  diameter: topBun.diameter,
  length: 16,
  translate: { z: -40 },
  stroke: topBun.stroke,
  color: topBun.color,
});

// var seedAnchor = new Zdog.Anchor({
//   addTo: burger,
//   translate: topBun.translate,
// });
var seedAnchor = new Zdog.Anchor({
  addTo: topBun,
});

var seedZ = ( topBun.diameter + topBun.stroke ) / 2 + 1;
// seed
new Zdog.Shape({
  addTo: seedAnchor,
  path: [ { y: -3 }, { y: 3 } ],
  translate: { z: seedZ },
  stroke: 8,
  color: gold,
});

seedAnchor.copyGraph({
  rotate: { x: 0.6 },
});
seedAnchor.copyGraph({
  rotate: { x: -0.6 },
});
seedAnchor.copyGraph({
  rotate: { y: -0.5 },
});
seedAnchor.copyGraph({
  rotate: { y: 0.5 },
});

const minScroll = 100;
const maxScroll = 600;

window.addEventListener('scroll', () => {
  if (window.scrollY >= minScroll && window.scrollY <= maxScroll) {
    illo.rotate.y = Zdog.TAU * (window.scrollY - minScroll) / 1000;
  }
});

function animate() {
  illo.updateRenderGraph();
  requestAnimationFrame( animate );
}

animate();
