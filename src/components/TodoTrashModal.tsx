import { useState, useCallback } from "react";
import { Todo } from "../types/todo";

import { ChevronDown, CheckSquare2, XSquare, UndoDot } from "lucide-react";

interface TodoTrashModalProps {
	trash: Todo[];
	restoreFromTrash: (id: number) => void;
	permanentlyDeleteFromTrash: (id: number) => void;
}

function TodoTrashModal({
	trash,
	restoreFromTrash,
	permanentlyDeleteFromTrash,
}: TodoTrashModalProps) {
	const [selectedItems, setSelectedItems] = useState<number[]>([]);

	const toggleSelect = useCallback((id: number) => {
		setSelectedItems((prevSelectedItems) =>
			prevSelectedItems.includes(id)
				? prevSelectedItems.filter((item) => item !== id)
				: [...prevSelectedItems, id]
		);
	}, []);

	const returnSelected = useCallback(() => {
		selectedItems.forEach((id) => restoreFromTrash(id));
		setSelectedItems([]);
	}, [selectedItems, restoreFromTrash]);

	const removeSelected = useCallback(() => {
		selectedItems.forEach((id) => permanentlyDeleteFromTrash(id));
		setSelectedItems([]);
	}, [selectedItems, permanentlyDeleteFromTrash]);

	const emptyTrash = useCallback(() => {
		trash.forEach((todo) => permanentlyDeleteFromTrash(todo.id));
	}, [trash, permanentlyDeleteFromTrash]);

	const selectAll = useCallback(() => {
		if (selectedItems.length === trash.length) {
			setSelectedItems([]);
		} else {
			const allIds = trash.map((todo) => todo.id);
			setSelectedItems(allIds);
		}
	}, [selectedItems, trash]);

	return (
		<>
			<input
				type="checkbox"
				id={`modal_trash`}
				className="modal-toggle"
			/>
			<div className="modal" role="dialog">
				<div className="modal-box h-screen w-full max-h-[unset] border border-base-300 p-0">
					{/* Header */}
					<div className="flex items-center justify-between p-4">
						<h3 className="font-bold text-lg">Todo Trash</h3>
						<label
							htmlFor={`modal_trash`}
							className="btn btn-sm btn-circle btn-ghost"
						>
							✕
						</label>
					</div>
					{/* Button Menu */}
					<div className="flex justify-between px-4 py-2">
					{trash.length > 0 && (
						<button onClick={selectAll} className="hover:underline text-sm font-medium">
							{selectedItems.length === trash.length
								? "Deselect All"
								: "Select All"}
						</button>
					)}
						{selectedItems.length > 0 && (
							<details className="dropdown dropdown-end">
								<summary className="select-none cursor-pointer hover:underline flex items-center ml-auto text-sm font-medium">
									Selected
									<ChevronDown size={16} />
								</summary>
								<ul className="p-2 shadow menu dropdown-content z-[1] bg-base-200 rounded-box w-44">
									<li>
										<button onClick={returnSelected}>
											<CheckSquare2 size={16} /> Return Selected
										</button>
									</li>
									<li className="text-error">
										<button onClick={removeSelected}>
											<CheckSquare2 size={16} /> Delete Selected
										</button>
									</li>
								</ul>
							</details>
						)}
					</div>
					{/* List/Body */}
					<div className="flex flex-col gap-3 overflow-scroll max-h-[calc(100dvh-240px)] px-4 py-1">
						{trash.map((todo: Todo) => (
							<div
								key={todo.id}
								className="flex input input-bordered grow items-center px-1.5"
							>
								<label className="flex p-1.5 cursor-pointer">
									<input
										type="checkbox"
										className="checkbox w-5 h-5"
										onChange={() => toggleSelect(todo.id)}
										checked={selectedItems.includes(
											todo.id
										)}
									/>
								</label>
								<span className="flex-1 p-2">{todo.title}</span>
								<button
									onClick={() => restoreFromTrash(todo.id)}
									className="p-2 cursor-pointer"
								>
									<UndoDot />
								</button>
								<button
									onClick={() =>
										permanentlyDeleteFromTrash(todo.id)
									}
									className="p-2"
								>
									<XSquare />
								</button>
							</div>
						))}
					</div>
					{trash.length === 0 && (
						<p className="text-center text-sm text-base-300 select-none pt-5">
							Trash is Empty
						</p>
					)}
					{/* Footer */}
					<div className="px-4 py-2">
						{trash.length > 0 && (
							<button
								onClick={emptyTrash}
								className="text-error hover:underline flex ml-auto text-sm font-medium"
							>
								Empty Trash
							</button>
						)}
					</div>
				</div>
				<label className="modal-backdrop" htmlFor={`modal_trash`} />
			</div>
		</>
	);
}

export default TodoTrashModal;
