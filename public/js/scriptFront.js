document.addEventListener("DOMContentLoaded", () => {
  // Header
  const logoWrap = document.getElementById('logoWrap');
  logoWrap.addEventListener('click', () => window.location.replace("/"));
  // Header

  // API menu
  const apiExample = document.getElementById('apiExample');
  function getCookie(name) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
      let split = el.split('=');
      cookie[split[0].trim()] = split.slice(1).join("=");
    })
    return cookie[name];
  }
  apiExample.addEventListener('click', () =>
    $.ajax({
      url: "/api/example",
      type: "GET",
      beforeSend: function(xhr) {
        const token = getCookie("jwt");
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: function() {
        setTimeout(function() {
            window.location.href = '/api/example';
        }, 333);
      }
    }
  ));
  // API menu

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