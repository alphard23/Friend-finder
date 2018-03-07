// Event listeners for buttons
document.getElementById("close-modal-button").addEventListener("click", disableModal);


function disableModal() {
  let modal = document.getElementById("modal");
  modal.classList.remove("is-active");
}

// TODO: Validate Survey input
