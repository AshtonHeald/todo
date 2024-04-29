import { useState } from "react";
import { PlusCircle } from "lucide-react";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


interface AddTodoFormProps {
	onSubmit: (title: string) => void;
}
function AddTodoForm({ onSubmit }: AddTodoFormProps) {
	const [input, setInput] = useState("");


	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!input.trim()) return;
		onSubmit(input); // Pass undefined as the description
		setInput("");
	}

	return (
		<form className="flex w-full  items-center space-x-2 p-4" onSubmit={handleSubmit}>
			<Input value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder="What needs to be done?" />
				<Button variant="outline" size="icon" type="submit" className="min-w-10">
		
				<PlusCircle size={20} className="" />
			</Button>
		</form>
	);
}
export default AddTodoForm;