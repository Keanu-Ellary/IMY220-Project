import React from "react";

class ConfirmDeletion extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { onClose, onConfirm, name } = this.props;

		return (
			<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
				<div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
					<h3 className="text-lg font-semibold text-gray-800 mb-4">
						Confirm Deletion
					</h3>
					<p className="text-gray-600 mb-6">
						Are you sure you want to delete {name}?
					</p>
					<div className="flex justify-end space-x-4">
						<button
							className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
							onClick={onClose}
						>
							Cancel
						</button>
						<button
							className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
							onClick={onConfirm}
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default ConfirmDeletion;
