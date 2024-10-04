import React from "react";
import PlaylistPreview from "./PlaylistPreview";

class UserPlaylist extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        const {playlist} = this.props;
        return(
            <div>
                <PlaylistPreview 
                    name={playlist.name}
                    creator={playlist.creator}
                    numOfSongs={playlist.numOfSongs}
                    imageURL={playlist.imageUrl}
                    songs={playlist.songs}
                    comments={playlist.comments}
                />
            </div>
        );
    }
}

export default UserPlaylist;