document.addEventListener("DOMContentLoaded", () => {
  // Header
  const logoWrap = document.getElementById('logoWrap');
  const menu = document.getElementById('menu');
  const mobileMenu = document.getElementById('mobileMenu');
  logoWrap.addEventListener('click', () => window.location.replace("/"));
  mobileMenu.addEventListener('click', async event => {
    if(menu.style.display == "block"){
      menu.style.display = "none"
    } else {
      menu.style.display = "block"
    }
  });
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