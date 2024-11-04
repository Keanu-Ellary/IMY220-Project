import React from "react";
import ViewProfile from "./ViewProfile";

class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            item: this.props.item || "",
            searchResults: null,
            errors: {
                item: "",
            },
        };

        this.searchInput = this.searchInput.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm(name, value) {
        let errors = this.state.errors;

        if (name === "item") {
            if (value.trim() === "") {
                errors.item = "Search input cannot be empty.";
            } else {
                errors.item = "";
            }
        }

        this.setState({ errors });
    }

    searchInput(event) {
        const { name, value } = event.target;
        this.setState({ item: value }, () => {
            this.validateForm(name, value);
        });
    }

    async handleSubmit(event) 
    {
        event.preventDefault();
        if (this.state.errors.item === "" && this.state.item.trim() !== "") 
        {
            try 
            {
                const response = await fetch(`http://localhost:8000/search?term=${this.state.item}`);
                const data = await response.json();
                this.setState({ searchResults: data });
            } 
            catch (error) 
            {
                console.error("Error fetching search results:", error);
            }
        } 
        else 
        {
            alert("Search input cannot be empty.");
        }
    }

    renderResults() {
        const { searchResults } = this.state;

        if (!searchResults) return null;

        return (
            <div className="mt-4">
                {searchResults.songSearch.length > 0 && (
                    <div className="mb-4">
                        <h3 className="text-xl font-bold mb-2">Songs</h3>
                        <ul className="space-y-2">
                            {searchResults.songSearch.map((song) => (
                                <li key={song._id} className="p-4 bg-gray-100 rounded-md shadow-md text-gray-800">
                                    <div className="flex items-center">
                                        <img src={song.image} alt={song.title} className="w-16 h-16 mr-4 rounded" />
                                        <div>
                                            <h4 className="text-lg font-semibold">{song.title}</h4>
                                            <p className="text-sm">By {song.artists.join(", ")}</p>
                                            <p className="text-sm">Duration: {song.duration}</p>
                                            <a href={song.spotify_link} target="_blank" rel="noopener noreferrer" className="text-blue-500">Listen on Spotify</a>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {searchResults.playlistSearch.length > 0 && (
                    <div className="mb-4">
                        <h3 className="text-xl font-bold mb-2">Playlists</h3>
                        <ul className="space-y-2">
                            {searchResults.playlistSearch.map((playlist) => (
                                <li key={playlist._id} className="p-4 bg-gray-100 rounded-md shadow-md text-gray-800">
                                    <div className="flex items-center">
                                        <img src={playlist.imageUrl} alt={playlist.name} className="w-16 h-16 mr-4 rounded" />
                                        <div>
                                            <h4 className="text-lg font-semibold">{playlist.name}</h4>
                                            <p className="text-sm">By {playlist.creator[0].username}</p>
                                            <p className="text-sm">Genre: {playlist.genre}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {searchResults.userSearch.length > 0 && (
                    <div className="mb-4">
                        <h3 className="text-xl font-bold mb-2">Users</h3>
                        <ul className="space-y-2">
                            {searchResults.userSearch.map((user) => (
                                <li key={user._id} className="p-4 bg-gray-100 rounded-md shadow-md text-gray-800">
                                    <ViewProfile userID={user._id}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    }

    render() {
        return (
            <div className="p-4 max-w-lg mx-auto">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        name="item"
                        placeholder="Search..."
                        value={this.state.item}
                        onChange={this.searchInput}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-gray-800"
                    />
                    <button 
                        className="p-2 bg-blue-500 text-white rounded-md"
                        onClick={this.handleSubmit}
                    >
                        Search
                    </button>
                </div>
                {this.state.errors.item && (
                    <p className="text-red-500 text-sm mt-2">{this.state.errors.item}</p>
                )}
                {this.renderResults()}
            </div>
        );
    }
}

export default SearchInput;