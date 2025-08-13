document.addEventListener("DOMContentLoaded", () => {
  // Header
  const logoWrap = document.getElementById('logoWrap');
  logoWrap.addEventListener('click', () => window.location.replace("/"));
  // Header

  // Modal 
  // Close modal
  const closeModal = document.querySelectorAll('.closeModal');
  closeModal.forEach(el => el.addEventListener('click', async event => {
    const checkOverlay = event.target.getAttribute("data-closemodal")
    if(checkOverlay) { 
      overlay.style.visibility = "hidden"
    } 
  }));
  // Close modal
  // Modal
});