let colors = [
    "#8A99FF",
    "#ececec",
    "#404040",
];

let height = 20;
let width = 15;
let depth = 5;

let duration = 5.0;
let speed = 0.08;
let isSpinning = true;

// create illo
const illo = new Zdog.Illustration({
    // set canvas with selector
    element: '.zdog-canvas',
    zoom: 1,
    dragRotate: true,
    onDragStart: () => isSpinning = false,
    onDragEnd: () => isSpinning = true,
    
  });

let group = new Zdog.Group({
    addTo: illo
});

// thicker circle 
let outline_1 = new Zdog.Ellipse({
    addTo: illo,
    diameter: 170,
    rotate:{z:10},
    stroke: 2,
    color: colors[2]
  });

// thinner loop
let outline_2 = new Zdog.Ellipse({
    addTo: illo,
    diameter: 250,
    stroke: 0,
    color: colors[0]
  });

// "S" shape
let s = new Zdog.Shape({
    addTo: group,
  path: [
    { x: 15, y: -10 },
        { x: 0, y: -10 },
        {
          arc: [{ x: -15, y: -12 }, { x: -15, y: 0 }]
        },
        {
          arc: [{ x: -15, y: 12 }, { x: 0, y: 10 }]
        },
        {
          arc: [{ x: 15, y: 8 }, { x: 15, y: 20 }]
        },
        {
          arc: [{ x: 15, y: 32 }, { x: 0, y: 30 }]
        },
    { x: -15, y: 30 },
      ],
   rotate:{
      z: -Math.PI/.2
    },
    translate: {
      x:-23,
      y:10,
    },
    closed: false,
    stroke: 15,
    color: colors[0]
});

// "C" shape
let c = new Zdog.Shape({
    addTo: group,
  stroke: 15,
    closed: false,
    color: colors[0],
    path: [
        { x: -20, y: 15 },
        { x: -20, y: 0 },
        {
          arc: [{ x: -20, y: -15 }, { x: 0, y: -15 }]
        },
        {
          arc: [{ x: 20, y: -15 }, { x: 20, y: 0 }]
        },
        { x: 20, y: 15 }
    ],
    rotate:{
      z: -Math.PI / 2
    },
    translate: {
      x:24,
    },
});


illo.updateRenderGraph();

let elapsedSeconds = () => performance.now()/1000;
let fract = (x) => x - Math.floor(x);
let easeInOutQuad = (t) =>  t<.5 ? 2*t*t : -1+(4-2*t)*t ;

const minScroll = 100;
const maxScroll = 600;

// totate the shape via the z-axis on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY >= minScroll && window.scrollY <= maxScroll) {
    illo.rotate.z = Zdog.TAU * (window.scrollY - minScroll) / 500;
  }
});

// totate the shape each frame
let animate = () =>
{
    let time = fract(elapsedSeconds()/duration);
    let interval = Math.floor(time*2.0);
   
    let target = Math.PI*easeInOutQuad(fract(time*2.0)) + Math.PI*interval;

    if(isSpinning)
    {
        outline_1.rotate.y = target;
        outline_2.rotate.y = target*3.0;
        group.rotate.y = target;
        s.rotate.y = target*2.0;
        c.rotate.y = target*2.0;
    };
    illo.updateRenderGraph();
    requestAnimationFrame( animate );
}

// start animation
animate();
