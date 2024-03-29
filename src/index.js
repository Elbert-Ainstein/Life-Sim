const RULES = {
    green: {
        green: Math.random() * 2 - 1,
        red: Math.random() * 2 - 1,
        yellow: Math.random() * 2 - 1,
        blue: Math.random() * 2 - 1,
        white: Math.random() * 2 - 1,
    },
    red: {
        green: Math.random() * 2 - 1,
        red: Math.random() * 2 - 1,
        yellow: Math.random() * 2 - 1,
        blue: Math.random() * 2 - 1,
        white:  Math.random() * 2 - 1,
    },
    yellow: {
        green: Math.random() * 2 - 1,
        red: Math.random() * 2 - 1,
        yellow: Math.random() * 2 - 1,
        blue: Math.random() * 2 - 1,
        white: Math.random() * 2 - 1,
    },
    blue: {
        green: Math.random() * 2 - 1,
        red: Math.random() * 2 - 1,
        yellow: Math.random() * 2 - 1,
        blue: Math.random() * 2 - 1,
        white: Math.random() * 2 - 1,
    },
    white: {
        green: Math.random() * 2 - 1,
        red: Math.random() * 2 - 1,
        yellow: Math.random() * 2 - 1,
        blue: Math.random() * 2 - 1,
        white: Math.random() * 2 - 1,
    }
};

const canvas = document.getElementById("life");
const m = canvas.getContext("2d");
const draw = (x, y, c, s) => {
    m.fillStyle = c;
    m.fillRect(x, y, s, s);
};
const drawCanvas = (x, y, c, w, h) => {
    m.fillStyle = c;
    m.fillRect(x, y, w, h);
}
const atoms = [];
const atom = (x, y, c) => {
    return { x: x, y: y, vx: 0, vy: 0, color: c };
};
const random = () => {
    return Math.random() * (canvas.height - 100) + 50;
};
const create = (number, color) => {
    for (let i = 0; i < number; i++) {
        atoms.push(atom(random(), random(), color));
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
create(200*2, "yellow");
create(200*2, "red");
create(150*2, "blue");
create(300*2, "green");
update = () => {
    applyRules();
    m.clearRect(0, 0, canvas.width, canvas.height);
    drawCanvas(0, 0, "black", canvas.width, canvas.height);
    for (i = 0; i < atoms.length; i += 1) {
        draw(atoms[i].x, atoms[i].y, atoms[i].color, 3);
    }
    requestAnimationFrame(update);
};

update();