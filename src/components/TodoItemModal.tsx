import { useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import { Todo } from "../types/todo";

interface TodoItemModalProps {
	todo: Todo;
	onDelete: (id: number) => void;
	onEdit: (id: number, newTitle: string, newDescription: string) => void;
}

function TodoItemModal({ todo, onDelete, onEdit }: TodoItemModalProps) {
	const [newTitle, setNewTitle] = useState(todo.title);
	const [newDescription, setNewDescription] = useState(todo.description);
	const editInputRef = useRef<HTMLInputElement>(null);
	const editDescriptionRef = useRef<HTMLTextAreaElement>(null); 

	const handleEdit = () => {
		onEdit(todo.id, newTitle, newDescription);
	};

	return (
		<>
			<input
				type="checkbox"
				id={`modal_${todo.id}`}
				className="modal-toggle"
			/>
			<div className="modal" role="dialog">
				<div className="modal-box ">
					<div className="flex items-center justify-between">
						<h3 className="font-bold text-lg">Edit Todo</h3>
						<label
							htmlFor={`modal_${todo.id}`}
							className="btn btn-sm btn-circle btn-ghost"
						>
							✕
						</label>
					</div>
					<div className="flex flex-col gap-3">
                        <div>
						<label>Title:</label>
                        <input
							ref={editInputRef}
							defaultValue={todo.title}
							onChange={(e) => setNewTitle(e.target.value)}
							onBlur={handleEdit}
							onKeyPress={(event) =>
								event.key === "Enter" && handleEdit()
							}
							className="input input-bordered input-sm w-full"
						/>
                        </div>
<div>
    <label htmlFor="">Description:</label>
    <textarea // Change input to textarea
        ref={editDescriptionRef}
        defaultValue={todo.description}
        onChange={(e) => setNewDescription(e.target.value)}
        onBlur={handleEdit}
        onKeyPress={(event) =>
            event.key === "Enter" && handleEdit()
        }
        className="textarea textarea-bordered w-full"
        rows={5} // Convert rows value to a number
    />
</div>
						<button
							onClick={() => onDelete(todo.id)}
							className="ml-auto btn btn-error"
						>
                            <span>Delete</span>
							<Trash2 size={20} />
						</button>
					</div>
				</div>
				<label className="modal-backdrop" htmlFor={`modal_${todo.id}`} />
			</div>
		</>
	);
}

export default TodoItemModal;
