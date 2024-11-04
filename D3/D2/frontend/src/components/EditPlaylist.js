import React from "react";

class EditPlaylist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            genre: this.props.genre,
            imageURL: this.props.imageURL,
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEdit(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { name, genre, imageURL } = this.state;
        this.props.onSubmit({ name, genre, image: imageURL });
    }

    render() {
        return (
            <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={this.handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Playlist Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleEdit}
                        placeholder="Playlist Name"
                        className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genre">
                        Genre
                    </label>
                    <input
                        type="text"
                        name="genre"
                        value={this.state.genre}
                        onChange={this.handleEdit}
                        placeholder="Genre"
                        className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageURL">
                        Image URL
                    </label>
                    <input
                        type="text"
                        name="imageURL"
                        value={this.state.imageURL}
                        onChange={this.handleEdit}
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

export default EditPlaylist;
