const circle = document.getElementById("circle");
const pulseRing = document.querySelector(".pulse-ring");
const ripple = document.querySelector(".ripple");
const music = document.getElementById("bg-music");

let isBreathing = false;
let animationTimeouts = [];

const durations = {
  inhale: 4000,
  hold: 7000,
  exhale: 8000,
};

function clearAnimations() {
  animationTimeouts.forEach((timeout) => clearTimeout(timeout));
  animationTimeouts = [];
  circle.style.transform = "scale(1)";
  pulseRing.style.transform = "scale(1)";
}

function startRipple() {
  ripple.classList.add("show");
}

function breatheAnimation() {
  if (!isBreathing) return;

  circle.textContent = "Inhala"; 
  circle.style.transform = "scale(1.4)";
  pulseRing.style.transform = "scale(1.4)";

  const inhaleTimeout = setTimeout(() => {
    if (!isBreathing) return;

    circle.textContent = "Mantén"; 

    const holdTimeout = setTimeout(() => {
      if (!isBreathing) return;

      circle.textContent = "Exhala"; 
      circle.style.transform = "scale(1)";
      pulseRing.style.transform = "scale(1)";

      const exhaleTimeout = setTimeout(() => {
        if (!isBreathing) return;

        const timeLeft = music.duration - music.currentTime;
        if (timeLeft <= 5) {
          isBreathing = false;
          clearAnimations();
          ripple.classList.remove("show");
          circle.innerHTML = `<span class="stacked">La calma<br>permanece</span>`;

          setTimeout(() => {
            circle.innerHTML = `<span class="stacked">Solo<br>Respira</span>`;
          }, 15000); 
        } else {
          breatheAnimation(); 
        }
      }, durations.exhale);

      animationTimeouts.push(exhaleTimeout);
    }, durations.hold);

    animationTimeouts.push(holdTimeout);
  }, durations.inhale);

  animationTimeouts.push(inhaleTimeout);
}

circle.addEventListener("click", () => {
  isBreathing = !isBreathing;

  if (isBreathing) {
    music.play();
    circle.textContent = "Inhala";
    startRipple();
    breatheAnimation();
  } else {
    music.pause();
    music.currentTime = 0;
    clearAnimations();
    ripple.classList.remove("show");
    circle.innerHTML = `<span class="stacked">Solo<br>Respira</span>`;
  }
});