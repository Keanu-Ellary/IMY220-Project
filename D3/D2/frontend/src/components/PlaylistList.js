import React from "react";

class PlaylistList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: []
        };
    }

    componentDidMount() {
        this.fetchPlaylists();
    }

    async fetchPlaylists() {
        try {
            const response = await fetch("http://localhost:8000/playlists");
            if (!response.ok) {
                throw new Error("Failed to fetch playlists");
            }
            const data = await response.json();
            this.setState({ playlists: data });
        } catch (error) {
            console.error("Error fetching playlists:", error);
        }
    }

    render() {
        return (
            <div className="playlist-list bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Available Playlists</h2>
                <ul className="space-y-4">
                    {this.state.playlists.map((playlist, i) => (
                        <li
                            key={i}
                            className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <span className="text-gray-800 font-medium">{playlist.name}</span>
                            <button
                                className="bg-blue-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-blue-700"
                                onClick={() => this.props.onAddToPlaylist(playlist._id)}
                            >
                                Add Here
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default PlaylistList;
