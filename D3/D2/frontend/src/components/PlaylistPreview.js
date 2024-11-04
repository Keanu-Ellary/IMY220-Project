import React from "react";
import Song from "./Song";
import EditPlaylist from "./EditPlaylist";
import CommentList from "./CommentList";
import ConfirmDeletion from "./ConfirmDeletion";

class PlaylistPreview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editingPlaylist: false,
			name: this.props.name,
			genre: this.props.genre,
			imageURL: this.props.imageURL,
			showModal: false,
			isAdmin: sessionStorage.getItem("isAdmin") === "true",
		};

		this.editPlaylistToggle = this.editPlaylistToggle.bind(this);
		this.updatePlaylist = this.updatePlaylist.bind(this);
		this.deletePlaylist = this.deletePlaylist.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
	}

	toggleModal() {
		this.setState({ showModal: !this.state.showModal });
	}

	async deletePlaylist() {
		try {
			const response = await fetch("http://localhost:8000/deletePlaylist", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ playlistId: this.props.id }),
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

	editPlaylistToggle() {
		this.setState({ editingPlaylist: !this.state.editingPlaylist });
	}

	async updatePlaylist(updatedData) {
		const body = { playlistId: this.props.id, ...updatedData };

		try {
			const res = await fetch("http://localhost:8000/editPlaylist", {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});

			if (res.ok) {
				const { name, genre, image } = updatedData;
				this.setState({
					name: name || this.state.name,
					genre: genre || this.state.genre,
					imageURL: image || this.state.imageURL,
					editingPlaylist: false,
				});
			} else {
				alert("Failed to update playlist");
			}
		} catch (error) {
			console.error("Error updating playlist:", error);
		}
	}

	render() {
		const { name, creator, numOfSongs, imageURL, songs, comments } =
			this.props;
		const { editingPlaylist, showModal } = this.state;

		return (
			<div className="playlist-preview bg-white shadow-lg rounded-lg p-6 mb-6 flex flex-col md:flex-row md:items-start md:justify-between hover:shadow-2xl transition-shadow duration-200">
				<div className="playlist-thumbnail w-full md:w-1/4 mb-4 md:mb-0 flex-shrink-0">
					<img
						src={imageURL}
						alt={`${name} cover`}
						className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-200"
					/>
				</div>

				<div className="playlist-info flex-grow md:ml-6">
					<h3 className="playlist-name text-xl font-bold text-gray-800 mb-2">
						{this.state.name}
					</h3>
					<p className="playlist-creator text-sm text-gray-600 mb-1">
						By {creator[0].username}
					</p>
					<p className="playlist-genre text-sm text-gray-500 mb-2">
						{this.state.genre}
					</p>
					<p className="playlist-songs text-sm text-gray-500 mb-4">
						{numOfSongs} songs
					</p>

					{(this.state.isAdmin || creator[0]._id === sessionStorage.getItem('userId')) && (<div>
						<button
							onClick={this.editPlaylistToggle}
							className="editBtn bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 mb-4"
						>
							{editingPlaylist ? "Cancel" : "Edit Playlist"}
						</button>
						<br />
						<button
							onClick={this.toggleModal}
							className="editBtn bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 mb-4"
						>
							Delete Playlist
						</button>
					</div>)}

					{editingPlaylist && (
						<div className="edit-playlist-form mb-4">
							<EditPlaylist
								name={this.state.name}
								genre={this.state.genre}
								imageURL={this.state.imageURL}
								onSubmit={this.updatePlaylist}
							/>
						</div>
					)}

					{showModal && (
						<ConfirmDeletion
							onClose={this.toggleModal}
							onConfirm={this.deletePlaylist}
							name={name}
						/>
					)}

					<div className="playlist-songs-preview grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
						{songs.map((song, i) => (
							<Song
								key={i}
								title={song.title}
								artists={song.artists}
								duration={song.duration}
								image={song.image}
								streams={song.streams}
							/>
						))}
					</div>

					<div className="playlist-comments-preview">
						<CommentList comments={comments} playID={this.props.id} />
					</div>
				</div>
			</div>
		);
	}
}

export default PlaylistPreview;
