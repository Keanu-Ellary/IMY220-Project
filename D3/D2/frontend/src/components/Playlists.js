import React from "react";
import Feed from "./Feed";
import CreatePlaylist from "./CreatePlaylist";

class Playlists extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            creatingPlaylist : false,
        }

        this.createPlaylistToggle = this.createPlaylistToggle.bind(this);
    }

    createPlaylistToggle() {
		this.setState({ creatingPlaylist: !this.state.creatingPlaylist });
	}


    render() {
        const { creatingPlaylist } = this.state;
    
        return (
            <div className="relative p-4">
                <button
                    onClick={this.createPlaylistToggle}
                    className={`createBtn flex items-center justify-center px-4 py-2 rounded-lg text-white font-semibold
                        ${creatingPlaylist ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}
                        shadow-md transition-all duration-200 ease-in-out transform hover:scale-105`}
                >
                    <span className="mr-2">
                        {creatingPlaylist ? (
                            <span>&#10005;</span> // '×' icon for cancel
                        ) : (
                            <span>&#43;</span>  // '+' icon for create
                        )}
                    </span>
                    {creatingPlaylist ? "Cancel" : "Create Playlist"}
                </button>
                
                {creatingPlaylist && <CreatePlaylist />}
                <Feed />
            </div>
        );
    }    
}

export default Playlists;