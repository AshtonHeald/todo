import { CheckCircle } from "lucide-react";
import ThemeChange from "../components/ThemeChange";

const Header = () => {
	return (
		<header className="navbar w-auto p-4 md:px-0">
			<div className="navbar-start">
				<CheckCircle size={24} />
			</div>
			<div className="navbar-center">
				<h1 className="navbar-center font-bold text-3xl text-center">
					Todo List
				</h1>
			</div>
			<div className="navbar-end">
				<ThemeChange />
			</div>
		</header>
	);
};

export default Header;


