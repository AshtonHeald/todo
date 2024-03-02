import { Todo } from "../types/todo";

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
		<div>
            {/*
			<button
				onClick={deleteAllCompleted}
				className="badge badge-ghost hover:underline text-sm font-medium"
			>
				Trash
			</button>
            */}
			{completedTodos.length > 0 && (
				<button
					onClick={deleteAllCompleted}
					className="text-red-500 hover:underline absolute left-0 right-0 mx-auto text-sm font-medium"
				>
					Delete all completed
				</button>
			)}
			<button className="text-red-500 hover:underline flex ml-auto text-sm font-medium">View Trash</button>
		</div>
	);
}
export default TodoTrash;