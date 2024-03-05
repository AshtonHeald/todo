// useTodos.ts
import { useEffect, useState } from "react";
import { dummyData } from "../data/todos";
import { Todo } from "../types/todo";

// Define the return type for the hook
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

// Custom hook to manage todos and trash
function useTodos(): useTodosReturnType {
    // State for todos, initialized from localStorage or dummy data
    const [todos, setTodos] = useState<Todo[]>(() => {
        const savedTodos: Todo[] = JSON.parse(
            localStorage.getItem("todos") || "[]"
        );
        return savedTodos.length > 0 ? savedTodos : dummyData;
    });

    // State for trash, initialized from localStorage
    const [trash, setTrash] = useState<Todo[]>(() => {
        const savedTrash: Todo[] = JSON.parse(
            localStorage.getItem("trash") || "[]"
        );
        return savedTrash;
    });

    // Save todos to localStorage whenever todos change
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    // Save trash to localStorage whenever trash changes
    useEffect(() => {
        localStorage.setItem("trash", JSON.stringify(trash));
    }, [trash]);

    // Function to mark a todo as completed or incomplete
    function setTodoCompleted(id: number, completed: boolean) {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed } : todo
            )
        );
    }

    // Function to add a new todo
    function addTodo(title: string, description?: string) {
        setTodos((prevTodos) => [
            {
                id: Date.now(),
                title,
                description: description || "",
                completed: false,
            },
            ...prevTodos,
        ]);
    }

    // Function to edit an existing todo
    function editTodo(id: number, title: string, description: string) {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, title, description } : todo
            )
        );
    }

    // Function to move a todo to the trash
    function deleteTodoToTrash(id: number) {
        const deletedTodo = todos.find(todo => todo.id === id);
        if (deletedTodo) {
            setTrash(prevTrash => [deletedTodo, ...prevTrash]);
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
        }
    }

    // Function to restore a todo from the trash
    function restoreFromTrash(id: number) {
        const restoredTodo = trash.find(todo => todo.id === id);
        if (restoredTodo) {
            setTodos(prevTodos => [restoredTodo, ...prevTodos]);
            setTrash(prevTrash => prevTrash.filter(todo => todo.id !== id));
        }
    }

    // Function to permanently delete a todo from the trash
    function permanentlyDeleteFromTrash(id: number) {
        setTrash(prevTrash => prevTrash.filter(todo => todo.id !== id));
    }

    // Function to delete all completed todos
    function deleteAllCompleted() {
        todos.forEach(todo => {
            if (todo.completed) {
                deleteTodoToTrash(todo.id);
            }
        });
    }

    // Return todos, trash, and all the functions to manipulate them
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
