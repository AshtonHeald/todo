import {
	DndContext,
	DragEndEvent,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { 
	SortableContext, 
	verticalListSortingStrategy, 
	arrayMove, 
	sortableKeyboardCoordinates 
} from "@dnd-kit/sortable";
import {
	restrictToVerticalAxis,
	restrictToWindowEdges,
	restrictToFirstScrollableAncestor,
} from "@dnd-kit/modifiers";

import { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
	todos: Todo[];
	setTodos: (todos: Todo[]) => void;
	setTodoCompleted: (id: number, completed: boolean) => void;
	editTodo: (id: number, title: string, description: string) => void;
	deleteTodoToTrash: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
	todos,
	setTodos,
	setTodoCompleted,
	editTodo,
	deleteTodoToTrash,
}) => {
	const detectSensor = () => {
		// Check if the device supports touch events
		const isTouchDevice =
			"ontouchstart" in window ||
			navigator.maxTouchPoints > 0 ||
			navigator.maxTouchPoints > 0;
		// Set isWebEntry based on the above check
		const isWebEntry = !isTouchDevice;
		// Store the value in localStorage
		localStorage.setItem("isWebEntry", JSON.stringify(isWebEntry));
		//console.log("Is web entry:", isWebEntry);
		return isWebEntry ? PointerSensor : TouchSensor;
	};

	const sensors = useSensors(
		useSensor(detectSensor(), {
			// Press delay of 250ms, with tolerance of 5px of movement
			activationConstraint: {
				delay: 250,
				tolerance: 5,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (over && active.id !== over.id) {
			const oldIndex = todos.findIndex(
				(todo) => `${todo.id}` === active.id
			);
			const newIndex = todos.findIndex(
				(todo) => `${todo.id}` === over.id
			);
			setTodos(arrayMove(todos, oldIndex, newIndex));
		}
	};

	return (
		<div className="overflow-y-auto h-auto max-h-[calc(100dvh-294px)] px-4">
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
				modifiers={[
					restrictToVerticalAxis,
					restrictToFirstScrollableAncestor,
					restrictToWindowEdges,
				]}
			>
				<div className="grid gap-2 py-1">
					<SortableContext
						items={todos.map((todo) => `${todo.id}`)}
						strategy={verticalListSortingStrategy}
					>
						{todos.map((todo) => (
							<TodoItem
								todo={todo}
								key={todo.id}
								onCompletedChange={setTodoCompleted}
								onDelete={deleteTodoToTrash}
								onEdit={editTodo}
							/>
						))}
					</SortableContext>
				</div>
				{todos.length === 0 && (
					<p className="text-center text-sm text-muted-foreground p-2.5 mb-0.5">
						Todo List Empty
					</p>
				)}
			</DndContext>
		</div>
	);
};

export default TodoList;
