import React from "react";

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

        return (
            <div className="song bg-white shadow-md rounded-lg p-4 flex items-center justify-between mb-4 hover:shadow-lg transition-shadow duration-200">
                <div className="song-image w-16 h-16 flex-shrink-0">
                    <img
                        src={image}
                        alt={`${title} cover`}
                        className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-200"
                    />
                </div>

                <div className="song-info flex-grow ml-4">
                    <h3 className="song-title text-lg font-semibold text-gray-800 mb-1">
                        {title}
                    </h3>
                    <p className="song-artists text-sm text-gray-600">
                        {artists.join(', ')}
                    </p>
                    <p className="song-duration text-sm text-gray-500">
                        {duration}
                    </p>
                    <p className="song-streams text-sm text-gray-500">
                        {streams.toLocaleString()} streams
                    </p>
                </div>

                <div className="song-menu relative">
                    <button
                        className="menu-button text-gray-500 hover:text-gray-800"
                        onClick={this.showMenu}
                    >
                        <span className="text-2xl">⋮</span>
                    </button>
                    {addToPlaylist && (
                        <div className="context-menu absolute right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg w-40 p-2">
                            <ul>
                                <li className="text-sm text-gray-700 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                                    Add To Playlist
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Song;