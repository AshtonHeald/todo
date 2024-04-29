import { useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import { Todo } from "../types/todo";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"

import {
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
			<DialogContent className="sm:max-w-[425px] top-0" >
				<DialogHeader>
					<DialogTitle>Edit Todo</DialogTitle>
					{/*}
					<DialogDescription className="flex justify-between">
						<div className="flex flex-col">
							<span>

							Date Created: 
							</span>
							<span className="text-sm text-muted-foreground">
							04/25/2024, 08:00 PM
							</span>
						</div>
						<div>
							<span className="flex flex-col">
							Edited: 
							</span>
							<span className="text-sm text-muted-foreground">
							04/26/2024, 10:36 AM
							</span>
						</div>
					</DialogDescription>
				*/}
				</DialogHeader>
				<div className="flex flex-col gap-3">
					<div className="grid w-full max-w-sm items-center gap-1.5">
						<Label>Title</Label>
						<Input
							ref={editInputRef}
							defaultValue={todo.title}
							onChange={(e) => setNewTitle(e.target.value)}
							onBlur={handleEdit}
							onKeyPress={(event) =>
								event.key === "Enter" && handleEdit()
							}
						/>
					</div>

					<div className="grid w-full max-w-sm items-center gap-1.5">
						<Label>Description</Label>
						<Textarea 
							ref={editDescriptionRef}
							defaultValue={todo.description}
							onChange={(e) => setNewDescription(e.target.value)}
							onBlur={handleEdit}
							onKeyPress={(event) =>
								event.key === "Enter" && handleEdit()
							}
							className="textarea textarea-bordered w-full"
							rows={5}
						/>
						
					</div>
					
				</div>
				<DialogFooter>
				<Button 
						variant="destructive"
						onClick={() => onDelete(todo.id)}
					>
						<span>Delete</span>
						<Trash2 size={20} />
					</Button>
				</DialogFooter>
			</DialogContent>
	);
}

export default TodoItemModal;
