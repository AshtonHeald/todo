import useTodos from "./hooks/useTodos";
import AddTodoForm from "../../components/AddTodoForm";
import TodoSummary from "./components/TodoSummary";
import TodoList from "./components/TodoList";
import TodoTrash from "./components/TodoTrash";

function TodoApp() {
	const {
		todos,
		trash,
		addTodo,
		setTodos,
		setTodoCompleted,
		editTodo,
		deleteTodoToTrash,
		restoreFromTrash,
		permanentlyDeleteFromTrash,
		deleteAllCompleted,
	} = useTodos();
	
	return (
		<div id="todoList" className="max-w-2xl mx-auto grid gap-2 pt-10">
			<AddTodoForm onSubmit={addTodo} />
			<div className="space-y-3">
				<TodoSummary todos={todos} />
				<TodoList
          todos={todos}
					setTodos={setTodos}
					setTodoCompleted={setTodoCompleted}
					editTodo={editTodo}
					deleteTodoToTrash={deleteTodoToTrash}
				/>
				<TodoTrash
					todos={todos}
					trash={trash}
					restoreFromTrash={restoreFromTrash}
					permanentlyDeleteFromTrash={permanentlyDeleteFromTrash}
					deleteAllCompleted={deleteAllCompleted}
				/>
			</div>
		</div>
	);
}

export default TodoApp;
