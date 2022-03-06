window.addEventListener("load", function(){
  /**
   * GAME CONFIG AND VARIABLES
   */

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
    });
  }

  // Player stats UI elements
  let oxygen = document.getElementById("oxygen_val");
  let sanity = document.getElementById("sanity_val");
  let morale = document.getElementById("morale_val");
  let panic = document.getElementById("panic_val");

  // Game stats UI elements
  let time_elapsed_val = document.getElementById("time_elapsed_val");
  let chapter_val = document.getElementById("chapter_val");
  let route_val = document.getElementById("route_val");
  let progress_val = document.getElementById("progress_val");

  // Game variables (defaults to start with)
  let is_playing = false;
  let current_chapter = 1;
  let current_route = 1;
  let current_choice = 1;
  let next_route = [1, 1];

  /**
   * GAME LOGIC
   */

  function load_next() {
    // load the next block of story
    current_chapter = next_route[0];
    current_route = next_route[1];

    // call to update
    update();
  }

  function resolve() {
    // gets the modifier based on the player's choice, updates them accordingly
    let choice = chapters[current_chapter][current_route].options[current_choice];
    resolve_modifiers(choice.modifiers);

    // update the next route one needs to go to
    next_route = choice.go_to;
    load_next();
  }

  function resolve_modifiers(mods) {
    // choice-based modifiers
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
    // update game and player stats
    chapter_val.innerHTML = current_chapter;
    route_val.innerHTML = current_route;
    //time_elapsed_val.innerHTML = 1;
    //progress_val.innerHTML = 1;
    oxygen.innerHTML = oxygen_max;
    sanity.innerHTML = sanity_max;
    morale.innerHTML = morale_max;
    panic.innerHTML = panic_max;

    // gets the current block of story
    let current_obj = chapters[current_chapter][current_route];

    // update interactive UI text and options
    text_box_text.innerHTML = current_obj.text;
    option_1.innerHTML = current_obj.options[1].text;
    option_2.innerHTML = current_obj.options[2].text;
    option_3.innerHTML = current_obj.options[3].text;
    option_4.innerHTML = current_obj.options[4].text;

    // set the default choice so that if the player has not responded
    // when the timer expires, we make a choice for them (evil!)
    current_choice = current_obj.default;
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

  // start button
  let start_button = document.getElementById("start_button");
  start_button.addEventListener('click', function(event){
    if (is_playing === false) {
      startGame();
    }
  });
  //let inst = setInterval(update, intervalTimer);
});
