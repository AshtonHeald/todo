import { GripVertical } from "lucide-react";
import { Todo } from "../types/todo";
import TodoItemModal from "./TodoItemModal";

interface TodoItemProps {
	todo: Todo;
	onCompletedChange: (id: number, completed: boolean) => void;
	onDelete: (id: number) => void;
	onEdit: (id: number, newTitle: string, newDescription: string) => void;
}

function TodoItem({
	todo,
	onCompletedChange,
	onDelete,
	onEdit,
}: TodoItemProps) {
	return (
		<>
			<label
				htmlFor={`modal_${todo.id}`}
				className="flex input input-bordered grow items-center gap-2.5 px-3"
			>
				<label className="flex p-1">
					<input
						type="checkbox"
						checked={todo.completed}
						onChange={(e) =>
							onCompletedChange(todo.id, e.target.checked)
						}
						className="checkbox w-5 h-5"
					/>
				</label>
				<span
					className={`flex-1 select-none truncate ... ${
						todo.completed ? "line-through" : ""
					}`}
				>
					{todo.title}
				</span>
				<button>
					<GripVertical />
				</button>
			</label>
			<TodoItemModal todo={todo} onDelete={onDelete} onEdit={onEdit} />
		</>
	);
}

export default TodoItem;
