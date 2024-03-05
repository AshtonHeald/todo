import { Todo } from "../types/todo";
import TodoItem from "./TodoItem";
import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";

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
			<div className="space-y-3 overflow-scroll max-h-[calc(100dvh-240px)] px-4 py-1">
				<SortableContext
					items={todos.map((todo) => `${todo.id}`)}
					strategy={verticalListSortingStrategy}
				>
					{todos.map((todo) => (
						<TodoItem
							todo={todo}
							key={todo.id}
							onCompletedChange={onCompletedChange}
							onDelete={onDelete}
							onEdit={onEdit}
						/>
					))}
				</SortableContext>
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
