
(() => {

  // ----------------------------------------- util

  const randint = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  // ----------------------------------------- variables

  const canvas = document.querySelector('canvas');
  const c = canvas.getContext('2d');
  const mouse = {};
  const parts = [];

  // ----------------------------------------- functions

  const loadDemo = () => {

    mouse.x = 0;
    mouse.y = 0;
    mouse.down = false;

    for (let i = 0; i < 5000; i++) {
      parts.push({
        x: randint(0, canvas.width),
        y: randint(0, canvas.height),
        s: 2,
        h: randint(0, 360),
        d: 2 * Math.PI * Math.random(),
        m: 1,
        a: 0
      });
    }

    requestAnimationFrame(loop);
  };

  const loop = () => {

    // --------------------------------------- clear

    c.fillStyle = 'rgba(0, 0, 0, 0.1)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    // --------------------------------------- handle parts

    for (let i = parts.length - 1; i >= 0; --i) {
      
      const p = parts[i];

      // ------------------------------------- tick

      p.h = p.x * 360 / canvas.width;
      p.d += Math.sin(Date.now() * 0.1) * Math.random();
      if (mouse.down) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dir = Math.atan2(dy, dx);
        p.a += 0.001;
        if (p.m < 10) p.m += p.a;
        p.x += p.m * Math.cos(dir);
        p.y += p.m * Math.sin(dir);
      } else {
        p.m = 0;
        p.a = 0;
        p.x += Math.cos(p.d);
        p.y += Math.sin(p.d);
      }

      // ------------------------------------- draw

      c.fillStyle = `hsl(${p.h}, 100%, 50%)`;
      c.fillRect(
        p.x - p.s / 2,
        p.y - p.s / 2,
        p.s,
        p.s
      );
    }

    requestAnimationFrame(loop);
  };

  // ----------------------------------------- events

  addEventListener('load', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    loadDemo();
  });

  addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  });

  addEventListener('mousemove', ({ x, y }) => {
    mouse.x = x;
    mouse.y = y;
  });

  addEventListener('mousedown', () => {
    mouse.down = true;
  });

  addEventListener('mouseup', () => {
    mouse.down = false;
  });

})();