import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import TodoSummary from "./components/TodoSummary";
import TodoTrash from "./components/TodoTrash";
import useTodos from "./hooks/useTodos";
import Header from "./layouts/Header";

function App() {
	const {
		todos,
		addTodo,
		setTodoCompleted,
		deleteTodo,
		editTodo,
		deleteAllCompleted,
	} = useTodos();

	return (
		<main className="max-w-lg mx-auto py-10 h-screen space-y-5 overflow-y-auto">
			<Header />
			<div className="card shadow-xl m-4">
				<div className="card-body min-h-64 space-y-6 mb-6">
					<AddTodoForm onSubmit={addTodo} />
					<div className="space-y-3">
						<TodoSummary
							todos={todos}
						/>
						<TodoList
							todos={todos}
							onCompletedChange={setTodoCompleted}
							onEdit={editTodo}
							onDelete={deleteTodo}
						/>
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
