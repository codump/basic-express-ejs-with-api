class Typewriter {
  constructor(el, data, period) {
    this.el = el;
    this.data = data;
    this.period = parseInt(period, 10) || 2000;
    this.loopNum = 0;
    this.txt = '';
    this.isDeleting = false;
    this.phase = 0; // 0: text1, 1: &, 2: text2
    this.isPaused = false; 
    this.start();
  }

  start() {
    if (this.isPaused) { 
      setTimeout(() => this.start(), 100);
      return;
    }

    const i = this.loopNum % this.data.length;
    const { text1, link1, text2, link2 } = this.data[i];

    let fullTxt = '';
    let currentLink = '';
    
    if (this.phase === 0) {
      fullTxt = text1;
      currentLink = link1;
    } else if (this.phase === 1) {
      fullTxt = '&';
      currentLink = '';
    } else if (this.phase === 2) {
      fullTxt = text2;
      currentLink = link2;
    }

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.render(currentLink);

    let delta = 100 - Math.random() * 50;

    if (!this.isDeleting && this.txt === fullTxt) {
      if (this.phase < 2) {
        this.phase++;
      } else {
        delta = this.period;
        this.isDeleting = true;
      }
    } else if (this.isDeleting && this.txt === '') {
      if (this.phase > 0) {
        this.phase--;
      } else {
        this.isDeleting = false;
        this.loopNum++;
      }
    }

    setTimeout(() => this.start(), delta);
  }

  render(link) {
    let html = '';

    if (this.phase === 0 && this.txt) {
      html = `<a href="${link}" target="_blank">${this.txt}</a>`;
    } else if (this.phase === 1 && this.txt) {
      const { text1, link1 } = this.data[this.loopNum % this.data.length];
      html = `<a href="${link1}" target="_blank">${text1}</a> ${this.txt}`;
    } else if (this.phase === 2 && this.txt) {
      const { text1, link1 } = this.data[this.loopNum % this.data.length];
      html = `<a href="${link1}" target="_blank">${text1}</a> & <a href="${link}" target="_blank">${this.txt}</a>`;
    } else if (this.isDeleting) {
      const i = this.loopNum % this.data.length;
      const { text1, link1, text2, link2 } = this.data[i];

      if (this.phase === 2) {
        html = `<a href="${link1}" target="_blank">${text1}</a> & <a href="${link2}" target="_blank">${this.txt}</a>`;
      } else if (this.phase === 1) {
        html = `<a href="${link1}" target="_blank">${text1}</a> ${this.txt}`;
      } else {
        html = `<a href="${link1}" target="_blank">${this.txt}</a>`;
      }
    }

    this.el.innerHTML = html;
  }
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById('featured');
  const data = JSON.parse(el.getAttribute('data-type'));
  const period = el.getAttribute('data-period');
  const typewriter = new Typewriter(el, data, period);
  // Pause / resume on hover
  el.addEventListener('mouseenter', () => typewriter.isPaused = true);
  el.addEventListener('mouseleave', () => typewriter.isPaused = false);

  const width = window.screen.width
  const height = window.screen.height
  const resolution = document.getElementById('resolution');
  resolution.innerHTML = `w ${width} h ${height}`
  
});