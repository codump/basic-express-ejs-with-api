async function getUserInfo(userId) {
  const getUrl = `api/userinfo/${userId}`;
  try {
    function getCookie(name) {
      let cookie = {};
      document.cookie.split(';').forEach(function(el) {
        let split = el.split('=');
        cookie[split[0].trim()] = split.slice(1).join("=");
      })
      return cookie[name];
    }
    const token = getCookie("jwt");
    const res = await fetch(getUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    const data = await res.json();
    //console.log(data)
    return data
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Modal
  const profile = document.querySelectorAll('.profileList');
  const modal = document.getElementById('modal');
  profile.forEach(el => el.addEventListener('click', async event => {
    let userId = event.target.getAttribute("data-id")
    if(userId === null) { // Check if there is data-id, if not search in parent
      userId = event.target.parentElement.getAttribute("data-id")
    } 
    const result = await getUserInfo(userId)
    overlay.style.visibility = "visible"
    let socialsFb
    let socialsX
    let socialsGh
    let awardNode
    let awardEjs
    if(result.socials.fb) {
      socialsFb = `<a href="${result.socials.fb}" target="_new"><i class="fa-brands fa-facebook sociallinks"></i></a>`
    } else {
      socialsFb = `<i class="fa-brands fa-facebook"></i>`
    }
    if(result.socials.x) {
      socialsX = `<a href="${result.socials.x}" target="_new"><i class="fa-brands fa-square-x-twitter sociallinks"></i></a>`
    } else {
      socialsX = `<i class="fa-brands fa-square-x-twitter"></i>`
    }
    if(result.socials.gh) {
      socialsGh = `<a href="${result.socials.gh}" target="_new"><i class="fa-brands fa-github sociallinks"></i></a>`
    } else {
      socialsGh = `<i class="fa-brands fa-github"></i>`
    }
    if(result.stats.awards.nodejs) {
      awardNode = `Node.js <i class="fa-solid fa-award active"></i>`
    } else {
      awardNode = `<strike>Node.js <i class="fa-solid fa-award"></i></strike>`
    }
    if(result.stats.awards.ejs) {
      awardEjs = `EJS <i class="fa-solid fa-trophy active"></i>`
    } else {
      awardEjs = `<strike>EJS <i class="fa-solid fa-trophy"></i></strike>`
    }
    modal.innerHTML = `<a class="closeModal" data-closemodal="true">&times;</a> <img src="${result.avatar}" class="profileImg" alt="${result.name}" /><h3>${result.name}</h3><p class="profileSlogan">${result.slogan}</p><p>${socialsFb} ${socialsX} ${socialsGh}</p><p class="awards">Awards:<br/>${awardNode} ${awardEjs}</p>`
  }));
  // Side note, modal close is in scriptFront.js because it's a global feature.
  // Modal
});