const themeSwitchSel = document.querySelector('.theme-switch');

const switchTheme = (e) => {
  if (e.target.tagName !== 'INPUT') return;

  const theme = document.querySelector('.theme-switch-input:checked').value;

  localStorage.setItem('selected-theme', theme);

  document.body.className = '';
  document.body.classList.add(theme);
};

themeSwitchSel.addEventListener('click', switchTheme);

(function initialTheme() {
  const selectedTheme = localStorage.getItem('selected-theme');

  document.body.classList.add(selectedTheme || 'theme-one');
})();
