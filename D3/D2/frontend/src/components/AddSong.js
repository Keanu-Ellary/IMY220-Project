import React from "react";

class AddSong extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			song: this.props.song || "",
			artist: this.props.artist || "",
			duration: this.props.duration || "",
			image: this.props.image || "",
			streams: this.props.streams || "",
			spotify: this.props.spotify || "",
			errors: {
				song: "",
				artist: "",
				duration: "",
				image: "",
				streams: "",
				spotify: "",
			},
		};

		this.addSongHandle = this.addSongHandle.bind(this);
		this.validateForm = this.validateForm.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	addSongHandle(event) {
		const { name, value } = event.target;
		this.setState({ [name]: value }, () => {
			this.validateForm(name, value);
		});
	}

	validateForm(fieldName, value) {
		let errors = this.state.errors;

		switch (fieldName) {
			case "song":
				errors.song = value.length === 0 ? "Song title is required" : "";
				break;
			case "artist":
				errors.artist = value.length === 0 ? "Artist name is required" : "";
				break;
			case "duration":
				errors.duration = value.length === 0 ? "Duration is required" : "";
				break;
			case "image":
				errors.image = value.length === 0 ? "Image is required" : "";
				break;
			case "streams":
				errors.streams = value.length === 0 ? "Streams are required" : "";
				break;
			case "spotify":
				errors.spotify = value.length === 0 ? "Spotify link is required" : "";
				break;
			default:
				break;
		}

		this.setState({ errors });
	}

	async spotifyAPI()
	{
		
	}

	async handleSubmit(event) {
		event.preventDefault();
		const { errors, song, artist, duration, image, streams, spotify } =
			this.state;

		// Check for errors before submitting
		if (Object.values(errors).some((error) => error)) {
			alert("Please fix the errors before submitting.");
			return;
		}

		if (song && artist && duration && image && streams && spotify) {
			try {
				const response = await fetch("http://localhost:8000/addSong", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						title: song,
						artists: [artist],
						duration,
						image,
						streams : parseInt(streams, 10),
						spotify,
					}),
				});

				if (!response.ok) {
					const errorResponse = await response.json();
					alert(`Error: ${errorResponse.error}`);
					return;
				}

				const result = await response.json();
				alert(`Song added successfully! ID: ${result.song_id}`);
			} catch (error) {
				console.error("Error adding song:", error);
				alert("An error occurred while adding the song.");
			}
		} else {
			alert("Please fill in all required fields.");
		}
	}

	render() {
		const { errors } = this.state;

		return (
			<form onSubmit={this.handleSubmit} className="space-y-4 p-4">
				<div>
					<input
						type="text"
						name="song"
						onChange={this.addSongHandle}
						placeholder="Song Title"
						required
						className="block w-full p-2 border border-gray-300 rounded-md text-black"
					/>
					{errors.song && (
						<p className="text-red-500 text-sm mt-1">{errors.song}</p>
					)}
				</div>
				<div>
					<input
						type="text"
						name="artist"
						onChange={this.addSongHandle}
						placeholder="Artist Name"
						required
						className="block w-full p-2 border border-gray-300 rounded-md text-black"
					/>
					{errors.artist && (
						<p className="text-red-500 text-sm mt-1">{errors.artist}</p>
					)}
				</div>
				<div>
					<input
						type="text"
						name="duration"
						onChange={this.addSongHandle}
						placeholder="Song Duration"
						required
						className="block w-full p-2 border border-gray-300 rounded-md text-black"
					/>
					{errors.duration && (
						<p className="text-red-500 text-sm mt-1">{errors.duration}</p>
					)}
				</div>
				<div>
					<input
						type="text"
						name="image"
						onChange={this.addSongHandle}
						placeholder="Image URL"
						required
						className="block w-full p-2 border border-gray-300 rounded-md text-black"
					/>
					{errors.image && (
						<p className="text-red-500 text-sm mt-1">{errors.image}</p>
					)}
				</div>
				<div>
					<input
						type="number"
						name="streams"
						onChange={this.addSongHandle}
						placeholder="Number of Streams"
						required
						className="block w-full p-2 border border-gray-300 rounded-md text-black"
					/>
					{errors.streams && (
						<p className="text-red-500 text-sm mt-1">{errors.streams}</p>
					)}
				</div>
				<div>
					<input
						type="text"
						name="spotify"
						onChange={this.addSongHandle}
						placeholder="Spotify Link"
						required
						className="block w-full p-2 border border-gray-300 rounded-md text-black"
					/>
					{errors.spotify && (
						<p className="text-red-500 text-sm mt-1">{errors.spotify}</p>
					)}
				</div>
				<button
					type="submit"
					className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
				>
					Add Song
				</button>
			</form>
		);
	}
}

export default AddSong;
