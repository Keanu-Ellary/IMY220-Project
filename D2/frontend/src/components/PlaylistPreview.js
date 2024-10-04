import React from "react";
import Song from "./Song";
import CreatePlaylist from "./CreatePlaylist";
import CommentList from "./CommentList";

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

        return (
            <div className="playlist-preview bg-white shadow-lg rounded-lg p-6 mb-6 flex flex-col md:flex-row md:items-start md:justify-between hover:shadow-2xl transition-shadow duration-200">
                {/* Playlist Thumbnail */}
                <div className="playlist-thumbnail w-full md:w-1/4 mb-4 md:mb-0 flex-shrink-0">
                    <img
                        src={imageURL}
                        alt={`${name} cover`}
                        className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-200"
                    />
                </div>

                {/* Playlist Info */}
                <div className="playlist-info flex-grow md:ml-6">
                    <h3 className="playlist-name text-xl font-bold text-gray-800 mb-2">{name}</h3>
                    <p className="playlist-creator text-sm text-gray-600 mb-1">By {creator[0].username}</p>
                    <p className="playlist-genre text-sm text-gray-500 mb-2">{genre}</p>
                    <p className="playlist-songs text-sm text-gray-500 mb-4">{numOfSongs} songs</p>

                    {/* Edit Playlist Button */}
                    <button
                        onClick={this.editPlaylistToggle}
                        className="editBtn bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 mb-4"
                    >
                        {editingPlaylist ? "Cancel" : "Edit Playlist"}
                    </button>

                    {editingPlaylist && (
                        <div className="edit-playlist-form mb-4">
                            <CreatePlaylist name={name} creator={creator[0].username} imageURL={imageURL} />
                        </div>
                    )}

                    {/* Song Previews */}
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

                    {/* Comment List */}
                    <div className="playlist-comments-preview">
                        <CommentList comments={comments} />
                    </div>
                </div>
            </div>
        );
    }
}

export default PlaylistPreview;