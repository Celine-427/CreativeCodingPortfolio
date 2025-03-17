//show & open mycode
function toggleCode(id) {
    const codeEl = document.getElementById(id);
    if (!codeEl) return;
    codeEl.style.display = (codeEl.style.display === 'block') ? 'none' : 'block';
  }
  
  //full screen
  function goFullscreen(containerId) {
    const el = document.getElementById(containerId);
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen();
    }
  }
  
  //sketch 1
  let s1 = function(p) {
    let x, y;
    let vx, vy;
    let r = 40;
    let stickLen = 80;
    let clr;
  
    p.setup = function() {
      let cnv = p.createCanvas(400, 300);
      cnv.parent("sketch1-container");
      p.noStroke();
  
      x = p.width / 2;
      y = p.height / 2;
      vx = p.random(-4, 4);
      vy = p.random(-4, 4);
  
      clr = p.color(
        p.random(255),
        p.random(255),
        p.random(255),
        200
      );
    };
  
    p.draw = function() {
      p.background(0);
  
    //random square
      let rx = p.random(p.width);
      let ry = p.random(p.height);
      let rw = p.random(15, 30);
      let rh = p.random(15, 30);
      p.fill(p.random(255), p.random(255), p.random(255));
      p.rect(rx, ry, rw, rh);
  
      // Lollipop
      x += vx;
      y += vy;
      if (x - r < 0 || x + r > p.width) vx *= -1;
      if (y - r < 0 || y + r + stickLen > p.height) vy *= -1;
  
      p.fill(clr);
      p.circle(x, y, 2*r);
      p.rectMode(p.CENTER);
      p.rect(x, y + r + stickLen/2, 10, stickLen);
    };
  };
  new p5(s1, 'sketch1-container');
  
   //sketch 2
  let s2 = function(p) {
    let video;
    let n = 10;
    p.setup = function() {
      let cnv = p.createCanvas(400, 300);
      cnv.parent("sketch2-container");
      p.colorMode(p.HSB, 255);
      p.noStroke();
  
      video = p.createCapture(p.VIDEO);
      video.size(p.width / n, p.height / n);
      video.hide();
    };
  
    p.draw = function() {
      p.background(0);
      video.loadPixels();
      for (let y = 0; y < video.height; y++) {
        for (let x = 0; x < video.width; x++) {
          let i = (x + y * video.width) * 4;
          let r = video.pixels[i];
          let g = video.pixels[i + 1];
          let b = video.pixels[i + 2];
          let bright = (r + g + b) / 3;
          let hueVal = p.map(bright, 0, 255, 0, 255);
          let sz = p.map(bright, 0, 255, 0, n);
          p.fill(hueVal, 200, 200);
          p.rect(x * n, y * n, sz, sz);
        }
      }
    };
  };
  new p5(s2, 'sketch2-container');
  
  //sketch 3
  let s3 = function(p) {
    let time2 = 0;
    let diffColor = false;
    
    p.setup = function() {
      let cnv = p.createCanvas(400, 300);
      cnv.parent("sketch3-container");
    };
    
    p.draw = function() {
      p.background(0);
      Cats(50, 120, 3);
      Cats(50, 250, 3);
      time2 += 0.03;
    };
    
    p.mousePressed = function() {
      diffColor = !diffColor;
    };
    
    function Cats(X, Y, Z) {
      let x = X;
      for (let i = 0; i < Z; i++) {
        let Size = 50;
        let wave = p.sin(time2 + i * 0.5) * 15;
        let catSize = Size + wave;
        if (diffColor) {
          if (wave > 0) p.fill(255, 150, 200);
          else p.fill(150, 200, 255);
        } else {
          if (wave > 0) p.fill(255, 255, 100);
          else p.fill(108, 150, 255);
        }
        drawCat(x, Y, catSize);
        x += catSize + 10;
      }
    }
    
    function drawCat(cx, cy, size) {
      p.ellipse(cx, cy, size*1.6, size);
      // ear
      p.triangle(cx - size*0.8, cy - size*0.3,
                 cx - size*0.4, cy - size*0.8,
                 cx - size*0.3, cy - size*0.3);
      p.triangle(cx + size*0.8, cy - size*0.3,
                 cx + size*0.4, cy - size*0.8,
                 cx + size*0.3, cy - size*0.3);
      // eye
      p.fill(0);
      p.ellipse(cx - size*0.3, cy - size*0.1, size*0.15, size*0.15);
      p.ellipse(cx + size*0.3, cy - size*0.1, size*0.15, size*0.15);
      // mouse
      p.fill(0);
      p.triangle(cx - size * 0.1, cy + size * 0.05,
                 cx + size * 0.1, cy + size * 0.05,
                 cx, cy);
    }
  };
  new p5(s3, 'sketch3-container');
  
  
 //sketch 4
  let s4 = function(p) {
    let video;
    let hueVal = 0;
  
    p.setup = function() {
      let cnv = p.createCanvas(400, 300);
      cnv.parent("sketch4-container");
      video = p.createCapture(p.VIDEO);
      video.size(640, 480);
      video.hide();
      p.colorMode(p.HSB, 255);
    };
  
    p.draw = function() {
      p.background(0);
      let cols = 4;
      let rows = 4;
      let W = p.width / cols;
      let H = p.height / rows;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let h = (i*60 + j*40 + hueVal) % 255;
          p.tint(h, 200, 255);
          p.image(video, i*W, j*H, W, H);
        }
      }
      p.fill(255);
      p.textSize(16);
      p.text("Click to change hue", 10, p.height - 10);
    };
  
    p.mousePressed = function() {
      hueVal += 50;
    };
  };
  new p5(s4, 'sketch4-container');
  
  
  //sketch 5
  let s5 = function(p) {
    class Flower {
      constructor() {
        this.x = p.random(p.width);
        this.y = p.random(p.height);
        this.smileySize = p.random(30, 80);
        this.angle = p.random(p.TWO_PI);
        this.rotSpeed = p.random(-0.03, 0.03);
        this.vx = p.random(-2, 2);
        this.vy = p.random(-2, 2);
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.rotSpeed;
        if (this.x < 0 || this.x > p.width) {
          this.vx *= -1;
        }
        if (this.y < 0 || this.y > p.height) {
          this.vy *= -1;
        }
      }
      show() {
        p.push();
        p.translate(this.x, this.y);
        p.rotate(this.angle);
        drawSmileyFace(this.smileySize);
        p.pop();
      }
    }
  
    function drawSmileyFace(d) {
      p.fill(255, 255, 0);
      p.noStroke();
      p.ellipse(0, 0, d);
      p.fill(0);
      let eyeOffsetX = d * 0.2;
      let eyeOffsetY = d * 0.2;
      p.ellipse(-eyeOffsetX, -eyeOffsetY, d*0.1);
      p.ellipse( eyeOffsetX, -eyeOffsetY, d*0.1);
      p.noFill();
      p.stroke(0);
      p.strokeWeight(d*0.05);
      p.arc(0, 0, d*0.6, d*0.6, 0, p.PI, p.CHORD);
    }
  
    let flowers = [];
  
    p.setup = function() {
      let cnv = p.createCanvas(400, 300);
      cnv.parent("sketch5-container");
      for (let i = 0; i < 5; i++) {
        flowers.push(new Flower());
      }
    };
  
    p.draw = function() {
      p.clear();
      for (let f of flowers) {
        f.update();
        f.show();
      }
    };
  
    p.mouseDragged = function() {
      let newFlower = new Flower();
      newFlower.x = p.mouseX;
      newFlower.y = p.mouseY;
      flowers.push(newFlower);
    };
  
    p.windowResized = function() {
      p.resizeCanvas(400, 300);
    };
  };
  new p5(s5, 'sketch5-container');
  
  
  