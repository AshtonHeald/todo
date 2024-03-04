import useTodos from "./hooks/useTodos";
import Header from "./layouts/Header";
import AddTodoForm from "./components/AddTodoForm";
import TodoSummary from "./components/TodoSummary";
import TodoList from "./components/TodoList";
import TodoTrash from "./components/TodoTrash";
import {
	DndContext,
	DragEndEvent,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	restrictToVerticalAxis,
	restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

function App() {
	const {
		todos,
		addTodo,
		setTodos,
		setTodoCompleted,
		deleteTodo,
		editTodo,
		deleteAllCompleted,
	} = useTodos();

	const sensors = useSensors(
		useSensor(PointerSensor),
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
		<main className="max-w-lg mx-auto py-10 h-screen space-y-5 overflow-y-auto">
			<Header />
			<div className="card shadow-xl m-4">
				<div className="card-body min-h-64 space-y-6 mb-6">
					<AddTodoForm onSubmit={addTodo} />
					<div className="space-y-3">
						<TodoSummary todos={todos} />
						<DndContext
							sensors={sensors}
							collisionDetection={closestCenter}
							onDragEnd={handleDragEnd}
							modifiers={[
								restrictToVerticalAxis,
								restrictToWindowEdges,
							]}
						>
							<TodoList
								todos={todos}
								onCompletedChange={setTodoCompleted}
								onEdit={editTodo}
								onDelete={deleteTodo}
							/>
						</DndContext>
						<TodoTrash
							todos={todos}
							deleteAllCompleted={deleteAllCompleted}
						/>
					</div>
				</div>
			</div>
		</main>
	);
}

export default App;
