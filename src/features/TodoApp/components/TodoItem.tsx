import { Todo } from "../types/todo";
import TodoItemModal from "./TodoItemModal";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className="flex justify-between items-center whitespace-nowrap text-sm font-medium  transition-colors  disabled:pointer-events-none disabled:opacity-50 border border-input bg-background rounded-md touch-manipulation"
		>
			<label
				htmlFor={`checkbox_${todo.id}`}
				className="p-3 h-10 w-10 flex items-center cursor-pointer"
			>
				<Checkbox
					id={`checkbox_${todo.id}`}
					checked={todo.completed}
					onCheckedChange={(checked) =>
						onCompletedChange(todo.id, checked)
					}
				/>
			</label>
			<span
				{...attributes}
				{...listeners}
				className={`flex-1 select-none truncate touch-manipulation ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring py-2.5 ... ${
					todo.completed ? "line-through text-muted-foreground" : ""
				}`}
			>
				{todo.title}
			</span>
			<Dialog>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							className="rounded-sm"
							size="icon"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="lucide lucide-ellipsis"
							>
								<circle cx="12" cy="12" r="1" />
								<circle cx="19" cy="12" r="1" />
								<circle cx="5" cy="12" r="1" />
							</svg>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DialogTrigger asChild>
							<DropdownMenuItem>Edit</DropdownMenuItem>
						</DialogTrigger>

						{/*<DropdownMenuItem>Make a copy</DropdownMenuItem>*/}
						<DropdownMenuItem onClick={() => onDelete(todo.id)}>Delete</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<TodoItemModal
					todo={todo}
					onDelete={onDelete}
					onEdit={onEdit}
				/>
			</Dialog>
		</div>
	);
}

export default TodoItem;
