import { Todo } from "../types/todo";
import TodoTrashModal from "./TodoTrashModal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TodoTrashProps {
	todos: Todo[]; // Add todos prop to check completed todos
	trash: Todo[];
	restoreFromTrash: (id: number) => void;
	permanentlyDeleteFromTrash: (id: number) => void;
	deleteAllCompleted: () => void;
}

function TodoTrash({
	todos,
	trash,
	restoreFromTrash,
	permanentlyDeleteFromTrash,
	deleteAllCompleted,
}: TodoTrashProps) {
	// Check if there are completed todos in the todos array
	const hasCompletedTodos = todos.some((todo) => todo.completed);
	// Check if there are items in the trash array
	const hasItemsInTrash = trash.length > 0;

	return (
		<div className="px-4 flex">
			
			<Dialog>
					<DialogTrigger asChild >
					{hasItemsInTrash && (

					<Button variant="secondary">
						View Trash
					</Button>

			)}
					</DialogTrigger>
					<TodoTrashModal
				trash={trash}
				restoreFromTrash={restoreFromTrash}
				permanentlyDeleteFromTrash={permanentlyDeleteFromTrash}
			/>
				</Dialog>
				{hasCompletedTodos && (
				<Button
				variant="destructive"
				className="ml-auto"
					onClick={deleteAllCompleted}
				>
					Delete all completed
				</Button>
			)}
				
		</div>
	);
}

export default TodoTrash;
