import { useState, useEffect } from "react";
import { themeChange } from "theme-change";
import { Sun, Moon } from "lucide-react";

const ThemeChange = () => {
	const [theme, setTheme] = useState(localStorage.getItem("theme") || "lofi");

	useEffect(() => {
		themeChange(false);
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "lofi" ? "black" : "lofi"));
	};

	return (
		<label
			className="swap swap-rotate cursor-pointer"
			onClick={toggleTheme}
		>
			<input
				type="checkbox"
				className="theme-controller hidden"
				checked={theme === "black"}
				onChange={toggleTheme}
			/>
			<Sun className="swap-on" size={24} />
			<Moon className="swap-off" size={24} />
		</label>
	);
};

export default ThemeChange;
