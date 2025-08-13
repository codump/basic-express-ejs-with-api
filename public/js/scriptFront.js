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
  apiExample.addEventListener('click', async event => {
    const token = getCookie("jwt");
    const res = await fetch('/api/example',  { headers: { authorization: `Bearer ${token}` },  redirect: 'follow' })
    .then(res => {
      console.log(res);
      if (res.redirected) {
        document.location = res.url;
      }
  })
  });
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