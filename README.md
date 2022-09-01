# Life-Sim
A project inspired Hunar4321's Life Simulation Project. 

# Website Link: [lifesim.xyz](http://lifesim.xyz)

***!minor warning!***

>Js uses a lot of ram, so be cautious when experimenting with great numbers of particles.

## Features to be made soon:
- GUIs 
- Customizable colors based on HEX color codes

## Code as follows:

```javascript
// the speed of particles attracting to each other. Negatives makes them attract, Positive repels.
const RULES = {
    white: {
      white: -0.0365,    
      red: 0.063,
      yellow: 0.0365,
      blue: -0.034,
    },
    red: {
      white: -0.063,
      red: -0.0295,
      yellow: 0.031,
      blue: -0.009,
    },
    yellow: {
      white: -0.0695,
      red: 0.004,
      yellow: 0.004,
      blue: -0.05,
    },
    blue: {
      white: 0.018,
      red: -0.053,
      yellow: 0.0685,
      blue: -0.05,
    },
  };

  // const RULES = {
  //   green: {
  //     green: Math.random() * 2 - 1,
  //     red: Math.random() * 2 - 1,
  //     yellow: Math.random() * 2 - 1,
  //     blue: Math.random() * 2 - 1,
  //     white: Math.random() * 2 - 1,
  //   },
  //   red: {
  //     green: Math.random() * 2 - 1,
  //     red: Math.random() * 2 - 1,
  //     yellow: Math.random() * 2 - 1,
  //     blue: Math.random() * 2 - 1,
  //     white:  Math.random() * 2 - 1,
  //   },
  //   yellow: {
  //     green: Math.random() * 2 - 1,
  //     red: Math.random() * 2 - 1,
  //     yellow: Math.random() * 2 - 1,
  //     blue: Math.random() * 2 - 1,
  //     white: Math.random() * 2 - 1,
  //   },
  //   blue: {
  //     green: Math.random() * 2 - 1,
  //     red: Math.random() * 2 - 1,
  //     yellow: Math.random() * 2 - 1,
  //     blue: Math.random() * 2 - 1,
  //     white: Math.random() * 2 - 1,
  //   },
  //   white: {
  //     green: Math.random() * 2 - 1,
  //     red: Math.random() * 2 - 1,
  //     yellow: Math.random() * 2 - 1,
  //     blue: Math.random() * 2 - 1,
  //     white: Math.random() * 2 - 1,
  //   }
  // };

  console.log(JSON.stringify(RULES));

  const canvas = document.getElementById("life");
  const m = canvas.getContext("2d");
  const draw = (x, y, c, s) => {
    m.fillStyle = c;
    m.fillRect(x, y, s, s);
  };
  const atoms = [];
  
  //atom property
  const atom = (x, y, c) => {
    return { x: x, y: y, vx: 0, vy: 0, color: c };
  };
  
  const random = () => {
    return Math.random() * (canvas.height - 100) + 50;
  };
  
  //creating atoms
  const create = (number, color) => {
    for (let i = 0; i < number; i++) {
      atoms.push(atom(random()+(canvas.width / 4), random(), color));
    }
  };
  const applyRules = () => {
    for (let i = 0; i < atoms.length; i++) {
      let fx = 0;
      let fy = 0;
      const a = atoms[i];
      for (let j = 0; j < atoms.length; j++) {
        if (j !== i) {
          const b = atoms[j];
          const g = RULES[a.color][b.color];
          if (g !== undefined) {
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            if (dx !== 0 || dy !== 0) {
              const d = dx * dx + dy * dy;
              if (d < 6400) {
                const F = g / Math.sqrt(d);
                fx += F * dx;
                fy += F * dy;
              }
            }
          }
        }
      }
      a.vx = (a.vx + fx) * 0.5;
      a.vy = (a.vy + fy) * 0.5;
      a.x += a.vx;
      a.y += a.vy;
      if (a.x <= 0) {
        a.vx *= -1;
        a.x = 0;
      }
      if (a.x >= canvas.width) {
        a.vx *= -1;
        a.x = canvas.width;
      }
      if (a.y <= 0) {
        a.vy *= -1;
        a.y = 0;
      }
      if (a.y >= canvas.height) {
        a.vy *= -1;
        a.y = canvas.height;
      }
    }
  };
  create(1000, "yellow");
  create(1000, "red");
  create(912, "blue");
  create(1800, "white");
  update = () => {
    applyRules();
    m.clearRect(0, 0, canvas.width, canvas.height);
    draw(0, 0, "black", canvas.width);
    for (i = 0; i < atoms.length; i += 1) {
      draw(atoms[i].x, atoms[i].y, atoms[i].color, 3);
    }
    requestAnimationFrame(update);
  };
  update();
```
