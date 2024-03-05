import { Todo } from "../types/todo";

interface TodoTrashModalProps {
    trash: Todo[];
    restoreFromTrash: (id: number) => void;
    permanentlyDeleteFromTrash: (id: number) => void;
}

function TodoTrashModal({
    trash,
    restoreFromTrash,
    permanentlyDeleteFromTrash,
}: TodoTrashModalProps) {
    return (
        <>
            <input
                type="checkbox"
                id={`modal_trash`}
                className="modal-toggle"
            />
            <div className="modal" role="dialog">
                <div className="modal-box h-screen w-full max-h-[unset] border border-base-300">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg">Todo Trash</h3>
                        <label
                            htmlFor={`modal_trash`}
                            className="btn btn-sm btn-circle btn-ghost"
                        >
                            ✕
                        </label>
                    </div>
                    <div className="flex flex-col gap-3">
                        {/* Display trash items here */}
                        {trash.map((todo: Todo) => ( // Fixing the type of todo
                            <div key={todo.id} className="flex items-center">
                                <span>{todo.title}</span>
                                <button
                                    onClick={() => restoreFromTrash(todo.id)}
                                    className="ml-2 text-sm text-blue-500 hover:underline"
                                >
                                    Restore
                                </button>
                                <button
                                    onClick={() =>
                                        permanentlyDeleteFromTrash(todo.id)
                                    }
                                    className="ml-2 text-sm text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <label className="modal-backdrop" htmlFor={`modal_trash`} />
            </div>
        </>
    );
}

export default TodoTrashModal;
