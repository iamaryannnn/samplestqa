let inactivityTimer;

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    alert("Session expired due to inactivity.");
    navigateTo("login-page");
  }, 300000); // 5 minutes
}

['click', 'mousemove', 'keydown'].forEach(evt => {
  document.addEventListener(evt, resetInactivityTimer);
});

resetInactivityTimer(); // initial call

document.getElementById("login-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const userType = document.getElementById("user-type-login").value;
  if (userType === "user") navigateTo("emergency-services");
  else if (userType === "driver") navigateTo("driver-dashboard");
});

document.getElementById("signup-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const userType = document.getElementById("user-type-signup").value;
  if (userType === "user") navigateTo("emergency-services");
  else if (userType === "driver") navigateTo("driver-dashboard");
});

document.getElementById("reset-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const email = event.target.querySelector("input").value;
  document.getElementById("reset-msg").textContent = `Reset link sent to ${email}`;
});

document.getElementById("request-ambulance").addEventListener("click", function () {
  navigateTo("ambulance-tracking");
});

document.getElementById("go-online").addEventListener("click", function () {
  const button = this;
  if (button.textContent === "Go Online") {
    button.textContent = "Go Offline";
    button.style.backgroundColor = "#d9534f";
    alert("You are now online.");
  } else {
    button.textContent = "Go Online";
    button.style.backgroundColor = "#5cb85c";
    alert("You are now offline.");
  }
});

function navigateTo(pageId) {
  document.querySelectorAll(".page").forEach((page) => {
    page.style.display = "none";
  });
  document.getElementById(pageId).style.display = "flex";
  history.pushState({ page: pageId }, "", `#${pageId}`);
  resetInactivityTimer();
}

window.addEventListener("popstate", function (event) {
  if (event.state && event.state.page) {
    navigateTo(event.state.page);
  }
});

window.addEventListener("load", function () {
  const pageId = location.hash.replace("#", "") || "login-page";
  navigateTo(pageId);
});
