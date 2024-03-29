import { GripVertical } from "lucide-react";
import { Todo } from "../types/todo";
import TodoItemModal from "./TodoItemModal";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: `${todo.id}` });

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};

	return (
		<div className="flex items-center gap-1" style={style}>
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
				<div ref={setNodeRef} {...listeners} {...attributes}>
					<button>
						<GripVertical size={20} />
					</button>
				</div>
			</label>
			<TodoItemModal todo={todo} onDelete={onDelete} onEdit={onEdit} />
		</div>
	);
}

export default TodoItem;
