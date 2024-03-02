import { Todo } from "../types/todo";

interface TodoSummaryProps {
	todos: Todo[];
}

function TodoSummary({ todos }: TodoSummaryProps) {
	const completedTodos = todos.filter((todo) => todo.completed);

	return (
		<div className="flex">
			<p className="flex gap-1 text-sm font-medium">
				Tasks
				<span className="badge badge-ghost">{todos.length}</span>
			</p>
			<p className="flex gap-1 text-sm font-medium flex-none">
				Completed
				<span className="badge badge-ghost">
					{completedTodos.length}/{todos.length}
				</span>
			</p>
		</div>
	);
}
export default TodoSummary;