export function inputType(e, handler) {
    if (e.keyCode === 13) {
        handler();
    }

    let label = e.target.parentNode.querySelector('label');

    if (e.target.value.length > 0) {
        label.style.top = "-10px";
        label.style.fontSize = "1em";
    } else {
        label.style.top = "10px";
        label.style.fontSize = "1.5em";
    }
}

export function exitToMain() {
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  }