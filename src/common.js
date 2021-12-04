/**
 * Summary.
 * Custom placeholder handler for the for the custom textboxes
 * 
 * @param {object} e            The event handler from the textbox
 * @param {function} handler    The callback function for when enter is pressed 
 */
export function inputType(e, handler) {
    if (e.keyCode === 13) { // If enter
        handler(); // Call the callback function
    }

    // Sibling label element to the input
    let label = e.target.parentNode.querySelector('label');

    // If the there is no value in the textbox lower the label into a placeholder position
    if (e.target.value.length > 0) {
        label.style.top = "-10px";
        label.style.fontSize = "1em";
    } else { // If there is a value in the textbox raise it up
        label.style.top = "10px";
        label.style.fontSize = "1.5em";
    }
}

/**
 * Summary.
 * Redirect to the root page after 1 second delay
 */
export function exitToMain() {
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  }