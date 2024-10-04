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


    render()
    {
        const {creatingPlaylist} = this.state;

        return(
            <div>
                <button onClick={this.createPlaylistToggle} className="createBtn">
					{creatingPlaylist ? "Cancel" : "Create Playlist"}
				</button>
                {creatingPlaylist && <CreatePlaylist />}
                <Feed />
            </div>
        )
    }
}

export default Playlists;