// darkmode.js
(function() {
  const darkToggle = document.getElementById('dark-toggle');
  const darkStyle = document.getElementById('dark-theme-style');
  const body = document.body;

  function setDarkMode(on) {
    if (on) {
      body.classList.add('dark-mode');
      darkStyle.removeAttribute('disabled');
      localStorage.setItem('darkMode', 'on');
    } else {
      body.classList.remove('dark-mode');
      darkStyle.setAttribute('disabled', '');
      localStorage.setItem('darkMode', 'off');
    }
  }

  // Initial load
  const darkPref = localStorage.getItem('darkMode');
  if (darkPref === 'on') setDarkMode(true);

  if (darkToggle) {
    darkToggle.addEventListener('click', function() {
      setDarkMode(!body.classList.contains('dark-mode'));
    });
  }
})();