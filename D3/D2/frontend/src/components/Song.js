import React from "react";
import PlaylistList from "./PlaylistList";
import ConfirmDeletion from "./ConfirmDeletion";

class Song extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			addToPlaylist: false,
			editingMode: false,
			titleEdit: this.props.title,
			artistsEdit: this.props.artists.join(", "),
			imageEdit: this.props.image,
			streamsEdit: this.props.streams,
			showModal: false,
			isAdmin: sessionStorage.getItem("isAdmin") === "true",
		};
		this.showMenu = this.showMenu.bind(this);
		this.handleEditingSong = this.handleEditingSong.bind(this);
		this.editToggle = this.editToggle.bind(this);
		this.inputChange = this.inputChange.bind(this);
		this.addToPlaylist = this.addToPlaylist.bind(this);
		this.deleteSong = this.deleteSong.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
	}

	toggleModal() {
		this.setState({ showModal: !this.state.showModal });
	}

	async deleteSong() {
		try {
			const response = await fetch("http://localhost:8000/deleteSong", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ songId: this.props.id }),
			});

			if (!response.ok) {
				const errorCaught = await response.json();
				console.error("Error:", errorCaught.error);
			} else {
				console.log("Song successfully deleted.");
				this.setState({ showModal: false });
				window.location.reload();
			}
		} catch (error) {
			console.error("Error in deleting song:", error);
		}
	}

	editToggle() {
		this.setState((previous) => ({
			editingMode: !previous.editingMode,
		}));
	}

	inputChange(event) {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	}

	async handleEditingSong() {
		const { titleEdit, artistsEdit, imageEdit, streamsEdit } = this.state;

		const data = {
			songId: this.props.id,
			title: titleEdit,
			artists: artistsEdit.split(",").map((art) => art.trim()),
			image: imageEdit,
			streams: parseInt(streamsEdit, 10),
		};

		try {
			const response = await fetch("http://localhost:8000/editSong", {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const errorCaught = await response.json();
				alert(`Error: ${errorCaught.error}`);
			} else {
				const res = await response.json();
				alert(`Song was successfully edited: ${res.message}`);
				this.setState({ editingMode: false });
				window.location.reload();
			}
		} catch (error) {
			console.error("Error in editing:", error);
			alert("Error occurred while editing");
		}
	}

	showMenu() {
		this.setState((priorState) => ({
			addToPlaylist: !priorState.addToPlaylist,
		}));
	}

	async addToPlaylist(playlistId) {
		try {
			const response = await fetch(`http://localhost:8000/addToPlaylist`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ songId: this.props.id, playlistId }),
			});

			if (!response.ok) {
				const errorCaught = await response.json();
				alert(`${errorCaught.error}`);
			} else {
				alert("Song added!");
				this.setState({ addToPlaylist: false });
				window.location.reload();
			}
		} catch (error) {
			console.error("Error adding song to playlist:", error);
		}
	}

	render() {
		const { title, artists, duration, image, streams } = this.props;
		const {
			addToPlaylist,
			editingMode,
			titleEdit,
			artistsEdit,
			imageEdit,
			streamsEdit,
			showModal,
		} = this.state;

		return (
			<div className="song bg-white shadow-md rounded-lg p-4 flex flex-col items-start mb-4 hover:shadow-lg transition-shadow duration-200">
				<div className="flex items-center w-full justify-between">
					<div className="song-image w-16 h-16 flex-shrink-0">
						<img
							src={editingMode ? imageEdit : image}
							alt={`${title} cover`}
							className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-200"
						/>
					</div>

					<div className="song-info flex-grow ml-4">
						{editingMode ? (
							<>
								<input
									type="text"
									name="titleEdit"
									value={titleEdit}
									onChange={this.inputChange}
									className="song-title text-lg font-semibold text-gray-800 mb-1 border-b border-gray-300"
								/>
								<input
									type="text"
									name="artistsEdit"
									value={artistsEdit}
									onChange={this.inputChange}
									className="song-artists text-sm text-gray-600 border-b border-gray-300"
								/>
								<input
									type="text"
									name="imageEdit"
									value={imageEdit}
									onChange={this.inputChange}
									className="song-image-url text-sm text-gray-600 border-b border-gray-300"
									placeholder="Image URL"
								/>
								<input
									type="text"
									name="streamsEdit"
									value={streamsEdit}
									onChange={this.inputChange}
									className="song-streams text-sm text-gray-600 border-b border-gray-300"
								/>
							</>
						) : (
							<>
								<h3 className="song-title text-lg font-semibold text-gray-800 mb-1">
									{title}
								</h3>
								<p className="song-artists text-sm text-gray-600">
									{artists.join(", ")}
								</p>
								<p className="song-duration text-sm text-gray-500">
									{duration}
								</p>
								<p className="song-streams text-sm text-gray-500">
									{streams.toLocaleString()} streams
								</p>
							</>
						)}
					</div>

					<div className="song-menu relative">
						<button
							className="menu-button text-gray-500 hover:text-gray-800"
							onClick={this.showMenu}
						>
							<span className="text-2xl">⋮</span>
						</button>
						{addToPlaylist && (
							<div className="context-menu absolute right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg w-40 p-2">
								<ul>
									{this.state.isAdmin && (<li
										className="text-sm text-gray-700 hover:bg-gray-100 p-2 rounded-lg cursor-pointer"
										onClick={this.editToggle}
									>
										{editingMode ? "Cancel Edit" : "Edit Song"}
									</li>)}

									{this.state.isAdmin && (
										<li
											className="text-sm text-gray-700 hover:bg-gray-100 p-2 rounded-lg cursor-pointer"
											onClick={this.toggleModal}
										>
											Delete Song
										</li>
									)}
								</ul>
							</div>
						)}
						{editingMode && (
							<button
								className="save-button ml-2 px-3 py-1 bg-blue-500 text-white rounded-lg"
								onClick={this.handleEditingSong}
							>
								Save Changes
							</button>
						)}
					</div>
				</div>

				{addToPlaylist && (
					<div className="mt-4 w-full">
						<PlaylistList onAddToPlaylist={this.addToPlaylist} />
					</div>
				)}

				{showModal && (
					<ConfirmDeletion
						onClose={this.toggleModal}
						onConfirm={this.deleteSong}
						name={title}
					/>
				)}
			</div>
		);
	}
}

export default Song;
