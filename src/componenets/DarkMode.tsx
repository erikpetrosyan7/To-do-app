interface DarkModeToggleProps {
	darkMode: boolean;
	toggleDarkMode: () => void;
}

export default function DarkModeToggle({
	darkMode,
	toggleDarkMode,
}: DarkModeToggleProps) {
	return (
		<button onClick={toggleDarkMode} className='dark-mode-button'>
			{darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
		</button>
	);
}
