import { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
	todos: Todo[];
	onCompletedChange: (id: number, completed: boolean) => void;
	onDelete: (id: number) => void;
	onEdit: (id: number, title: string, description: string) => void;
}

function TodoList({
	todos,
	onCompletedChange,
	onDelete,
	onEdit,
}: TodoListProps) {
	
	return (
		<>
			<div className="space-y-3">
				{todos.map((todo) => (
					<TodoItem
						todo={todo}
						key={todo.id}
						onCompletedChange={onCompletedChange}
						onDelete={onDelete}
						onEdit={onEdit}
					/>
				))}
			</div>
			{todos.length === 0 && (
				<p className="text-center text-sm text-base-300 select-none pt-5">
					Todo List Empty
				</p>
			)}
		</>
	);
}
export default TodoList;