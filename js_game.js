window.addEventListener("load", function(){
  // Game defaults
  let intervalTimer = 20 * 1000; // 20 seconds

  // Stats decay time and modifiers
  // Modifiers change based on the player's choices
  let oxygen_decay = -2;
  let sanity_decay = -1;
  let morale_decay = -2;
  let panic_decay = 4;
  let oxygen_modifier = 0;
  let sanity_modifier = 0;
  let morale_modifier = 0;
  let panic_modifier = 0;

  // UI elements
  let text_box_text = document.getElementById("text_box_text");
  let chapter_val = document.getElementById("chapter_val");
  let route_val = document.getElementById("route_val");

  let option_1 = document.getElementById("option_1");
  let option_2 = document.getElementById("option_2");
  let option_3 = document.getElementById("option_3");
  let option_4 = document.getElementById("option_4");

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
    let modifiers = chapters[current_chapter][current_route].options[current_choice];
    let next_route = chapters[current_chapter][current_route].options.go_to;
    console.log(modifiers);
  }

  function update() {
    // gets the current chapter
    let current_obj = chapters[current_chapter][current_route];

    // set the defaults, so that if the player has not responded
    // when the timer expires, we make a choice for them (evil!)
    current_choice = chapters[current_chapter][current_route].default;
    next_route = chapters[current_chapter][current_route].options[current_choice].go_to;

    // update UI steps
    text_box_text.innerHTML = current_obj.text;
    chapter_val.innerHTML = current_chapter;
    route_val.innerHtml = current_route;
    option_1.innerHTML = current_obj.options[1];
    option_2.innerHTML = current_obj.options[2];
    option_3.innerHTML = current_obj.options[3];
    option_4.innerHTML = current_obj.options[4];
  }

  function startGame() {
    update();
  };

  update();
});
