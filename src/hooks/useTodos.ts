import { useEffect, useState } from "react";
import { dummyData } from "../data/todos";
import { Todo } from "../types/todo";

function useTodos() {
	const [todos, setTodos] = useState<Todo[]>(() => {
		const savedTodos: Todo[] = JSON.parse(
			localStorage.getItem("todos") || "[]"
		);
		return savedTodos.length > 0 ? savedTodos : dummyData;
	});

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	function setTodoCompleted(id: number, completed: boolean) {
		setTodos((prevTodos) =>
			prevTodos.map((todo) =>
				todo.id === id ? { ...todo, completed } : todo
			)
		);
	}

	function addTodo(title: string, description?: string) {
		// Make description optional
		setTodos((prevTodos) => [
			{
				id: Date.now(),
				title,
				description: description || "", // Default description to empty string if not provided
				completed: false,
			},
			...prevTodos,
		]);
	}

	function editTodo(id: number, title: string, description: string) {
		setTodos((prevTodos) =>
			prevTodos.map((todo) =>
				todo.id === id ? { ...todo, title, description } : todo
			)
		);
	}

	function deleteTodo(id: number) {
		setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
	}

	function deleteAllCompleted() {
		setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
	}

	return {
		todos,
		setTodoCompleted,
		addTodo,
		editTodo,
		deleteTodo,
		deleteAllCompleted,
	};
}

export default useTodos;
