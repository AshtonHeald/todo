import { Todo } from "../types/todo";
import { useLocalStorage } from "./useLocalStorage";

interface useTodosReturnType {
	todos: Todo[];
	trash: Todo[];
	addTodo: (title: string, description?: string) => void;
	setTodos: (todos: Todo[]) => void;
	setTodoCompleted: (id: number, completed: boolean) => void;
	editTodo: (id: number, title: string, description: string) => void;
	deleteTodoToTrash: (id: number) => void;
	restoreFromTrash: (id: number) => void;
	permanentlyDeleteFromTrash: (id: number) => void;
	deleteAllCompleted: () => void;
}

function useTodos(): useTodosReturnType {
	const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
	const [trash, setTrash] = useLocalStorage<Todo[]>("trash", []);

	function setTodoCompleted(id: number, completed: boolean) {
		setTodos((prevTodos: Todo[]) =>
			prevTodos.map((todo: Todo) =>
				todo.id === id ? { ...todo, completed } : todo
			)
		);
	}

	function addTodo(title: string, description?: string) {
		const newTodo: Todo = {
			id: Date.now(),
			title,
			description: description || "",
			completed: false,
		};
		setTodos((prevTodos: Todo[]) => [newTodo, ...prevTodos]);
	}

	function editTodo(id: number, title: string, description: string) {
		setTodos((prevTodos: Todo[]) =>
			prevTodos.map((todo: Todo) =>
				todo.id === id ? { ...todo, title, description } : todo
			)
		);
	}

	function deleteTodoToTrash(id: number) {
		const deletedTodo = todos.find((todo: Todo) => todo.id === id);
		if (deletedTodo) {
			setTrash((prevTrash: Todo[]) => [deletedTodo, ...prevTrash]);
			setTodos((prevTodos: Todo[]) =>
				prevTodos.filter((todo: Todo) => todo.id !== id)
			);
		}
	}

	function restoreFromTrash(id: number) {
		const restoredTodo = trash.find((todo: Todo) => todo.id === id);
		if (restoredTodo) {
			setTodos((prevTodos: Todo[]) => [restoredTodo, ...prevTodos]);
			setTrash((prevTrash: Todo[]) =>
				prevTrash.filter((todo: Todo) => todo.id !== id)
			);
		}
	}

	function permanentlyDeleteFromTrash(id: number) {
		setTrash((prevTrash: Todo[]) =>
			prevTrash.filter((todo: Todo) => todo.id !== id)
		);
	}

	function deleteAllCompleted() {
		const completedTodoIds = todos
			.filter((todo: Todo) => todo.completed)
			.map((todo: Todo) => todo.id);
		completedTodoIds.forEach((id: number) => deleteTodoToTrash(id));
	}

	return {
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
	};
}

export default useTodos;
