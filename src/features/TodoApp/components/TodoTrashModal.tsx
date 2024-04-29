import { useState, useCallback } from "react";
import { Todo } from "../types/todo";

import { ChevronDown, XSquare, UndoDot } from "lucide-react";
import {
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

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
		<DialogContent className="sm:max-w-[425px] top-0">
			<DialogHeader className="px-1">
				<DialogTitle>Todo Trash</DialogTitle>
			</DialogHeader>
			{/* Button Menu */}
			<div className="flex justify-between px-1">
				{trash.length > 0 && (
					<Button variant="secondary" onClick={selectAll}>
						{selectedItems.length === trash.length
							? "Deselect All"
							: "Select All"}
					</Button>
				)}
				{selectedItems.length > 0 && trash.length > 0 && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="secondary">
								Selected <ChevronDown size={16} />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={returnSelected}>
								<UndoDot size={16} /> Return Selected
							</DropdownMenuItem>
							<DropdownMenuItem onClick={removeSelected}>
								<XSquare size={16} /> Delete Selected
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>
			{/* List/Body */}
			<div className="flex flex-col gap-3 overflow-scroll max-h-[calc(100dvh-240px)] p-1">
				{trash.map((todo: Todo) => (
					<div
						key={todo.id}
						className="grow flex justify-between items-center whitespace-nowrap text-sm font-medium  transition-colors  disabled:pointer-events-none disabled:opacity-50 border border-input bg-background rounded-md"
					>
						<label
							htmlFor={`checkbox_${todo.id}`}
							className="p-3 h-10 w-10 flex items-center cursor-pointer"
						>
							<Checkbox
								id={`checkbox_${todo.id}`}
								checked={selectedItems.includes(todo.id)}
								onCheckedChange={() => toggleSelect(todo.id)}
							/>
						</label>
						<span className="flex-1 p-2">{todo.title}</span>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => restoreFromTrash(todo.id)}
							className="rounded-sm"		
						>
							<UndoDot />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => permanentlyDeleteFromTrash(todo.id)}
							className="rounded-sm"
						>
							<XSquare />
						</Button>
					</div>
				))}
			</div>
			{trash.length === 0 && (
				<p className="text-center text-sm text-base-300 select-none pt-5">
					Trash is Empty
				</p>
			)}
			{/* Footer */}
			<DialogFooter className="px-1">
				{trash.length > 0 && (
					<Button variant="destructive" onClick={emptyTrash}>
						<span>Empty Trash</span>
					</Button>
				)}
			</DialogFooter>
		</DialogContent>
	);
}

export default TodoTrashModal;
