// 1. Write code to allow visitors of the page to customize it to their liking. There is a
// form on the page that accepts a name (to be used in a greeting when the user visits
// the page) and a color picker to allow the user to choose their preferred background
// color/foreground color combination. Write the necessary code to capture these values
// when the form is submitted (prevent the default action on the form submission button to
// achieve this) and store these values in localStorage (so that it persists on the user’s
// computer and their preferences are saved indefinitely). Next, write a function to apply
// the preferences if they have been set and call it each time the page loads. You may
// also want to call this function again when the user saves their preferences to
// immediately apply them. Make sure you also notify the user somehow that the preferences
// were saved.


document.addEventListener("DOMContentLoaded", function() {
    let select = document.getElementById("background-color");
    let note = document.getElementById("foreground-color");
    let state;
  
    function setState(newState) {
      select.value = newState.backgroundColor || "#ffffff";
      note.value = newState.foregroundColor || "#000000";
  
      localStorage.setItem("userPreferences", JSON.stringify(newState));
      state = newState;
      applyPreferences(state);
    }
  
    function applyPreferences(preferences) {
      document.body.style.backgroundColor = preferences.backgroundColor;
      document.body.style.color = preferences.foregroundColor;
    }
    setState(JSON.parse(localStorage.getItem("userPreferences")) || {
      backgroundColor: "#ffffff",
      foregroundColor: "#000000"
    });
    select.addEventListener("change", function() {
      setState({
        backgroundColor: select.value,
        foregroundColor: note.value
      });
    });
    note.addEventListener("change", function() {
      setState({
        backgroundColor: select.value,
        foregroundColor: note.value
      });
    });
    document.getElementById("submit").addEventListener("click", function(event) {
      event.preventDefault();
      let backgroundColor = prompt("Enter Preferred Background Color", state.backgroundColor);
      let foregroundColor = prompt("Enter Preferred Text Color", state.foregroundColor);
      if (backgroundColor && foregroundColor) {
        setState({
          backgroundColor: backgroundColor,
          foregroundColor: foregroundColor
        });
        alert("Preferences saved");
      }
    });
  });