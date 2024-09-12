import React from "react";
import Song from "./Song";
import CreatePlaylist from "./CreatePlaylist";
import CommentList from "./CommentList";
import '../styles/Playlist.css'

class PlaylistPreview extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            editingPlaylist : false
        }

        this.editPlaylistToggle = this.editPlaylistToggle.bind(this);
    }

    editPlaylistToggle()
    {
        this.setState({editingPlaylist : !this.state.editingPlaylist});
    }

    render()
    {
        const {name, creator, numOfSongs, genre, imageURL, songs, comments} = this.props;
        const {editingPlaylist} = this.state;

        return(
            <div className="playlist-preview">
                <div className="playlist-thumbnail">
                    <img src={imageURL} alt={`${name} cover`} />
                </div>
                <div className="playlist-info">
                    <h3 className="playlist-name">{name}</h3>
                    <p className="playlist-creator">By {creator}</p>
                    <p className="playlist-creator">{genre}</p>
                    <p className="playlist-songs">{numOfSongs} songs</p>
                    <button onClick={this.editPlaylistToggle} className="editBtn">
                        {editingPlaylist? "Cancel" : "Edit Playlist"}
                    </button>
                    {editingPlaylist && <CreatePlaylist name={name} creator={creator} imageURL={imageURL} />}

                    <div className="playlist-songs-preview">
                        {songs.slice(0, 3).map((song, i) => (
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

                    <div className="playlist-songs-preview">
                        <CommentList comments={comments}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default PlaylistPreview;