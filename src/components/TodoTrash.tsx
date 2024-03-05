import { Todo } from "../types/todo";
import TodoTrashModal from "./TodoTrashModal";

interface TodoTrashProps {
	todos: Todo[]; // Add todos prop to check completed todos
	trash: Todo[];
	restoreFromTrash: (id: number) => void;
	permanentlyDeleteFromTrash: (id: number) => void;
	deleteAllCompleted: () => void;
}

function TodoTrash({
	todos,
	trash,
	restoreFromTrash,
	permanentlyDeleteFromTrash,
	deleteAllCompleted,
}: TodoTrashProps) {
	// Check if there are completed todos in the todos array
	const hasCompletedTodos = todos.some((todo) => todo.completed);
	// Check if there are items in the trash array
	const hasItemsInTrash = trash.length > 0;

	return (
		<div className="px-4">
			{hasCompletedTodos && (
				<button
					onClick={deleteAllCompleted}
					className="text-red-500 hover:underline absolute left-0 right-0 mx-auto text-sm font-medium"
				>
					Delete all completed
				</button>
			)}

			{hasItemsInTrash && (
				<label htmlFor={`modal_trash`} className="">
					<span className="text-error hover:underline flex ml-auto text-sm font-medium">
						View Trash
					</span>
				</label>
			)}
			<TodoTrashModal
				trash={trash}
				restoreFromTrash={restoreFromTrash}
				permanentlyDeleteFromTrash={permanentlyDeleteFromTrash}
			/>
		</div>
	);
}

export default TodoTrash;
