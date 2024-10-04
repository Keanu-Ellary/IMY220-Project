import React from "react";

class CreatePlaylist extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            name : this.props.name,
            creator : this.props.creator,
            imageURL : this.props.imageURL
        };

        this.handleCreation = this.handleCreation.bind(this);
    }

    handleCreation(event)
    {
        const {name, value} = event.target;
        this.setState({[name] : value});
    }

    render()
    {
        return (
            <form className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="playlistName">
                        Playlist Name
                    </label>
                    <input
                        type="text"
                        name="playlistName"
                        value={this.state.name}
                        onChange={this.handleCreation}
                        placeholder="Playlist Name"
                        className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="creator">
                        Creator
                    </label>
                    <input
                        type="text"
                        name="creator"
                        value={this.state.creator}
                        onChange={this.handleCreation}
                        placeholder="Creator"
                        className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Image URL
                    </label>
                    <input
                        type="text"
                        name="image"
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