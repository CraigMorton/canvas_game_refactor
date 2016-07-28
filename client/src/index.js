import Sprite from "./sprite.js";

window.onload = () => {
  // Create the canvas
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 512;
  canvas.height = 480;
  document.body.appendChild(canvas);


  // Background image
  const bgImage = new Sprite("img/background");
  // Hero image
  const heroImage = new Sprite("img/hero");
  // Monster image
  const monsterImage = new Sprite("img/monster");

  // Game objects
  const hero = {
    speed: 256 // movement in pixels per second
  };
  const monster = {};
  let monstersCaught = 0;

  // Handle keyboard controls
  const keysDown = {};

  addEventListener("keydown", (e) => {
    keysDown[e.keyCode] = true;
  }, false);

  addEventListener("keyup", (e) => {
    delete keysDown[e.keyCode];
  }, false);

  // Reset the game when the player catches a monster
  const reset = () => {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    // Throw the monster somewhere on the screen randomly
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
  };

  // Update game objects
  const update = (secondsSinceUpdate) => {
    if (38 in keysDown) { // Player holding up
      hero.y -= hero.speed * secondsSinceUpdate;
    }
    if (40 in keysDown) { // Player holding down
      hero.y += hero.speed * secondsSinceUpdate;
    }
    if (37 in keysDown) { // Player holding left
      hero.x -= hero.speed * secondsSinceUpdate;
    }
    if (39 in keysDown) { // Player holding right
      hero.x += hero.speed * secondsSinceUpdate;
    }

    // Are they touching?
    if (
      hero.x <= (monster.x + 32)
      && monster.x <= (hero.x + 32)
      && hero.y <= (monster.y + 32)
      && monster.y <= (hero.y + 32)
    ) {
      ++monstersCaught;
      reset();
    }
  };

  // Draw everything
  const render = () => {
    ctx.drawImage(bgImage, 0, 0);
    ctx.drawImage(heroImage, hero.x, hero.y);
    ctx.drawImage(monsterImage, monster.x, monster.y);

    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
  };

  // The main game loop
  const main = () => {
    const now = Date.now();
    const millisecondsSinceUpdate = now - then;
    const secondsSinceUpdate = millisecondsSinceUpdate / 1000;
    update(secondsSinceUpdate);
    render();
    then = now;
    // Request to do this again ASAP
    requestAnimationFrame(main);
  };

  // Cross-browser support for requestAnimationFrame
  const w = window;
  requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

  // Let's play this game!
  let then = Date.now();
  reset();
  main();
};