import React from "react";

class CreatePlaylist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            creator: "",
            imageURL: "",
            genre: "",
        };

        this.handleCreation = this.handleCreation.bind(this);
        this.handleGenreChange = this.handleGenreChange.bind(this);
        this.submitCreation = this.submitCreation.bind(this);
    }

    handleCreation(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleGenreChange(event) {
        this.setState({ genre: event.target.value });
    }

    async submitCreation(event) {
        event.preventDefault();
        
        const { name, imageURL, genre } = this.state;

        try {
            const response = await fetch('http://localhost:8000/createPlaylist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, creator: sessionStorage.getItem('userId'), image: imageURL, genre })
            });

            if (response.ok) {
                const data = await response.json();
                this.setState({
                    name: "",
                    creator: "",
                    imageURL: "",
                    genre: ""
                });

                window.location.reload();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error creating playlist:", error);
            alert("An error occurred while creating the playlist.");
        }
    }

    render() {
        const genres = ["Pop", "Rock", "Jazz", "Classical", "Hip Hop", "Electronic", "Country", "R&B", "Dance"];

        return (
            <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={this.submitCreation}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="playlistName">
                        Playlist Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleCreation}
                        placeholder="Playlist Name"
                        className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genre">
                        Genre
                    </label>
                    <select
                        name="genre"
                        value={this.state.genre}
                        onChange={this.handleGenreChange}
                        className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        <option value="" disabled>Select Genre</option>
                        {genres.map((genre, index) => (
                            <option key={index} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Image URL
                    </label>
                    <input
                        type="text"
                        name="imageURL"
                        value={this.state.imageURL}
                        onChange={this.handleCreation}
                        placeholder="Image URL"
                        className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                    Save
                </button>
            </form>
        );
    }
}

export default CreatePlaylist;
