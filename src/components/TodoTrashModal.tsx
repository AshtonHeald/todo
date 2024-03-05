import React from "react";

function TodoTrashModal() {
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
					<div className="flex flex-col gap-3"></div>
				</div>
				<label className="modal-backdrop" htmlFor={`modal_trash`} />
			</div>
		</>
	);
}

export default TodoTrashModal;
