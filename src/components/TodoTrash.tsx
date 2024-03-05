import { Todo } from "../types/todo";
import TodoTrashModal from "./TodoTrashModal";

interface TodoTrashProps {
	todos: Todo[];
	deleteAllCompleted: () => void;
}

function TodoTrash({
	todos,
	deleteAllCompleted,
}: TodoTrashProps) {
	const completedTodos = todos.filter((todo) => todo.completed);

	return (
		<div className="px-4">
			{completedTodos.length > 0 && (
				<button
					onClick={deleteAllCompleted}
					className="text-red-500 hover:underline absolute left-0 right-0 mx-auto text-sm font-medium"
				>
					Delete all completed
				</button>
			)}
			
			<label
				htmlFor={`modal_trash`}
				className=""
			>
				<span className="text-red-500 hover:underline flex ml-auto text-sm font-medium">View Trash</span>
			</label>
			<TodoTrashModal />
		</div>
	);
}
export default TodoTrash;