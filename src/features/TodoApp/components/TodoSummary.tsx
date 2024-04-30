import { Todo } from "../types/todo";
import { Badge } from "@/components/ui/badge";

interface TodoSummaryProps {
	todos: Todo[];
}

function TodoSummary({ todos }: TodoSummaryProps) {
	const hasTodos = todos.length > 0;
	const completedTodos = todos.filter((todo) => todo.completed);

	return (
		<div className="flex justify-between px-4">
			<div className="flex gap-1 text-sm font-bold">
				Tasks
				<Badge className="font-roboto-mono">{todos.length}</Badge>
			</div>
			{hasTodos && (
				<div className="flex gap-1 text-sm font-bold flex-none">
					Completed
					<Badge className="font-roboto-mono">
						{completedTodos.length}/{todos.length}
					</Badge>
				</div>
			)}
		</div>
	);
}
export default TodoSummary;
