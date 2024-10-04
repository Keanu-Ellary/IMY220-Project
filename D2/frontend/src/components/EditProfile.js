import React from "react";

class EditProfile extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            name : this.props.name,
            bio : this.props.bio
        };

        this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit(event)
    {
        const {name, value} = event.target;
        this.setState({[name] : value});
    }

    render()
    {
        return (
            <form className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleEdit}
                        placeholder="Name"
                        className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
                        Bio
                    </label>
                    <textarea
                        name="bio"
                        value={this.state.bio}
                        onChange={this.handleEdit}
                        placeholder="Bio"
                        className="border border-gray-300 rounded-lg py-2 px-3 w-full h-24 resize-none focus:outline-none focus:ring focus:ring-blue-300"
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

export default EditProfile;