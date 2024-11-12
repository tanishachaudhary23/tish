let pts;
let caslon;

function preload(){
  caslon = loadFont('BigCaslon.otf');  // Ensure 'BigCaslon.otf' is in the correct path
}

function setup() {
  createCanvas(600, 600);

  // Check if font is loaded to avoid errors
  if (caslon) {
    pts = caslon.textToPoints('NYTimes', 0, 0, 120, {
      sampleFactor: 0.25,
      simplifyThreshold: 0
    });
  } else {
    console.error("Font not loaded. Check the file path.");
  }
}

function draw() {
  background(220);

  if (pts) {  // Check that pts exists before trying to use it
    translate(20, 140);
    fill(255, 0, 0);
    noStroke();

    // Draw circles at text points
    for (let i = 0; i < pts.length; i++) {
      fill(i % 255);  // This color changes but may not be very noticeable; adjust if needed
      ellipse(pts[i].x, pts[i].y, 2, 2);
    }

    // Create wavy points shape
    translate(0, 100);
    beginShape(POINTS);
    stroke(0);
    for (let i = 0; i < pts.length; i++) {
      vertex(pts[i].x + sin(frameCount * 0.05 + pts[i].y * 0.1) * 5, pts[i].y);
    }
    endShape();

    // Rotational line effect
    translate(0, 100);
    noFill();
    let rotX = sin(frameCount / 20) * 15;
    let rotY = cos(frameCount / 20) * 15;
    for (let i = 0; i < pts.length; i++) {
      line(pts[i].x, pts[i].y, pts[i].x - rotX, pts[i].y - rotY);
    }

    // Draw text overlay with slight offset
    textFont(caslon);
    textSize(120);
    fill(255, 0, 0, 30);  // Text shadow effect with transparency
    text('NYTimes', -rotX, -rotY);

    // Random line effect for a scattered look
    translate(0, 100);
    for (let i = 0; i < pts.length; i++) {
      line(pts[i].x, pts[i].y, pts[i].x + random(-15, 15), pts[i].y + random(-15, 15));
    }
  }
}
