import { CheckCircle } from "lucide-react";
import { ModeToggle } from "../components/mode-toggle";
const Header = () => {
	return (
		<header className="flex items-center justify-between w-auto min-h-16 p-4">
			<div className="">
				<CheckCircle size={24} />
			</div>
			<div className="flex-1">
				<h1 className="font-bold text-3xl text-center">
					Todo List
				</h1>
			</div>
			<div className="">
				<ModeToggle />
			</div>
		</header>
	);
};

export default Header;


