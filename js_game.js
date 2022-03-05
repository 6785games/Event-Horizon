window.addEventListener("load", function(){
  let intervalTimer = 20 * 1000; // 20 seconds
  let text = ["Welcome", "Hi", "Sup dude"];
  let counter = 0;
  let elem = document.getElementById("text_box_text");
  
  let inst = setInterval(change, intervalTimer);

  function change() {
    elem.innerHTML = text[counter];
    counter++;
    if (counter >= text.length) {
      counter = 0;
      // clearInterval(inst); // uncomment this if you want to stop refreshing after one cycle

    }
  };
});
