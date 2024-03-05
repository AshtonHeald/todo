import { useState } from "react";
import { PlusCircle } from "lucide-react";

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
		<form className="flex gap-2.5 px-4" onSubmit={handleSubmit}>
			<input
				value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder="What needs to be done?"
				className="input input-bordered grow"
			/>
			<button type="submit" className="btn">
				<span className="hidden sm:block">
				Create 
				</span>
				<span>
				<PlusCircle size={20} />
				</span>
			</button>
		</form>
	);
}
export default AddTodoForm;