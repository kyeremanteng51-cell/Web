// Theme toggle with persistence and simple keyboard shortcut
(() => {
	const THEME_KEY = 'theme-preference';
	const toggle = document.getElementById('theme-toggle');
	const root = document.documentElement;

	function setTheme(theme){
		if(theme === 'dark') root.classList.add('dark');
		else root.classList.remove('dark');
		updateToggleUI();
	}

	function updateToggleUI(){
		const isDark = root.classList.contains('dark');
		if(!toggle) return;
		toggle.textContent = isDark ? '☀️ Day' : '🌙 Night';
		toggle.setAttribute('aria-pressed', String(isDark));
	}

	// read saved preference or use OS preference
	const saved = localStorage.getItem(THEME_KEY);
	const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	setTheme(saved || (prefersDark ? 'dark' : 'light'));

	if(toggle){
		toggle.addEventListener('click', () => {
			const newTheme = root.classList.contains('dark') ? 'light' : 'dark';
			setTheme(newTheme);
			localStorage.setItem(THEME_KEY, newTheme);
		});
	}

	// small nicety: press "t" to toggle theme
	window.addEventListener('keydown', (e) => {
		if(e.key.toLowerCase() === 't' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA'){
			const newTheme = root.classList.contains('dark') ? 'light' : 'dark';
			setTheme(newTheme);
			localStorage.setItem(THEME_KEY, newTheme);
		}
	});

})();

