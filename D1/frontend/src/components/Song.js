import React from "react";
import '../styles/Song.css';

class Song extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            addToPlaylist : false,
        }
        this.showMenu = this.showMenu.bind(this);
    }

    showMenu()
    {
        this.setState((priorState) => ({
            addToPlaylist : !priorState.showMenu,
        }));
    }

    render()
    {
        const { title, artists, duration, image, streams } = this.props;
        const {addToPlaylist} = this.state;

        return(
            <div className="song">
                <div className="song-image">
                    <img src={image} alt={`${title} cover`}/>
                </div>

                <div className="song-info">
                    <h3 className="song-title">{title}</h3>
                    <p className="song-artists">{artists.join(', ')}</p>
                    <p className="song-duration">{duration}</p>
                    <p className="song-streams">{streams.toLocaleString()} streams</p>
                </div>

                <div className="song-menu" onClick={this.showMenu}>
                    <button className="menu-button">
                        <span>⋮</span>
                    </button>
                    {addToPlaylist===true && (
                        <div className="context-menu">
                            <ul>
                                <li>Add To Playlist</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Song;