window.addEventListener("load", function(){
  // Game defaults
  // how long will each stage last on screen?
  // seconds might decrease based on panic increase
  // seconds might randomize based on sanity decrease
  let milliseconds = 1000;
  let seconds = 20;
  let intervalTimer = seconds * milliseconds;
  let elapsed = 0;

  // Stats decay time and modifiers
  // MAX and DECAY are fixed
  // Modifiers change based on the player's choices
  // at each turn
  let oxygen_max = 100;
  let sanity_max = 100;
  let morale_max = 100;
  let panic_max = 0;
  let oxygen_decay = -2;
  let sanity_decay = -1;
  let morale_decay = -2;
  let panic_decay = 4;
  let oxygen_modifier = 1;
  let sanity_modifier = 1;
  let morale_modifier = 1;
  let panic_modifier = 1;

  // UI elements
  let game_area = document.getElementById("canvas_wrap");
  let text_box_text = document.getElementById("text_box_text");
  let chapter_val = document.getElementById("chapter_val");
  let route_val = document.getElementById("route_val");

  let option_1 = document.getElementById("option_1");
  let option_2 = document.getElementById("option_2");
  let option_3 = document.getElementById("option_3");
  let option_4 = document.getElementById("option_4");
  for (const opt of [option_1, option_2, option_3, option_4]) {
    opt.addEventListener('click', function(event) {
      // get the clicked button value
      let clicked_button = event.target;
      // save it in current choice
      current_choice = clicked_button.value;
      // resolve the action
      resolve();
      // load the next block
      load_next();
    });
  }

  let oxygen = document.getElementById("oxygen_val");
  let sanity = document.getElementById("sanity_val");
  let morale = document.getElementById("morale_val");
  let panic = document.getElementById("panic_val");

  // Game variables
  let is_playing = false;
  let current_chapter = 1;
  let current_route = 1;
  let current_choice = 0;
  let next_route = [1, 1];
  
  //let inst = setInterval(change, intervalTimer);

  function load_next() {
    current_chapter = next_route[0];
    current_route = next_route[1];
    update();
  }

  function resolve() {
    // gets the modifier based on the player's choice, updates them accordingly
    let choice = chapters[current_chapter][current_route].options[current_choice];
    let modifiers = choice.modifiers;
    next_route = choice.go_to;

    console.log('Current choice ', choice);
    console.log('Next route', next_route);

    resolve_modifiers(modifiers);
  }

  function resolve_modifiers(mods) {
    oxygen_modifier = mods.oxygen;
    sanity_modifier = mods.sanity;
    morale_modifier = mods.morale;
    panic_modifier = mods.panic;

    // detract
    oxygen_max += oxygen_decay * oxygen_modifier;
    sanity_max += sanity_decay * sanity_modifier;
    morale_max += morale_decay * morale_modifier;
    panic_max += panic_decay * panic_modifier;
  }

  function update() {
    chapter_val.innerHTML = current_chapter;
    route_val.innerHTML = current_route;
    oxygen.innerHTML = oxygen_max;
    sanity.innerHTML = sanity_max;
    morale.innerHTML = morale_max;
    panic.innerHTML = panic_max;

    // gets the current chapter
    let current_obj = chapters[current_chapter][current_route];

    // update UI steps
    text_box_text.innerHTML = current_obj.text;
    option_1.innerHTML = current_obj.options[1].text;
    option_2.innerHTML = current_obj.options[2].text;
    option_3.innerHTML = current_obj.options[3].text;
    option_4.innerHTML = current_obj.options[4].text;

    // set the defaults, so that if the player has not responded
    // when the timer expires, we make a choice for them (evil!)
    current_choice = current_obj.default;
    next_route = current_obj.options[current_choice].go_to;
  }

  function prepareForStart() {
    // set as playing
    is_playing = true;
    // hide start button
    start_button.style.display = 'none';
    // start timer
    // show game elements
    game_area.style.display = 'block';
  }

  function startGame() {
    prepareForStart();
    update();
  };

  let start_button = document.getElementById("start_button");
  start_button.addEventListener('click', function(event){
    if (is_playing === false) {
      startGame();
    }
  });
  
  update();
});
