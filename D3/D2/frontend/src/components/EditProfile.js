import React from "react";

class EditProfile extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            name: this.props.name || "",
            proPic: this.props.proPic || "",
            surname: this.props.surname || "",
            username: this.props.username || "",
            bio : this.props.bio || "",
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.submitEdits = this.submitEdits.bind(this);
    }

    async submitEdits(e)
    {
        e.preventDefault();

        const userId = sessionStorage.getItem("userId");

        const {name, surname, proPic, username, bio} = this.state;

        try 
        {
            const res = await fetch("http://localhost:8000/editProfile", {
                method : "PATCH",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({
                    userId,
                    name,
                    surname,
                    username,
                    proPic,
                    bio,
                }),
            });

            const resp = await res.json();

            if(!res.ok)
            {
                throw new Error(resp.message || "Failed to Edit");
            }

            alert("Edit successful");
            window.location.reload();
        } 
        catch (error) 
        {
            alert("Error in editing:", error);
        }
    }

    handleEdit(event)
    {
        const {name, value} = event.target;
        this.setState({[name] : value});
    }

    render() {
        return (
            <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={this.submitEdits}>
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
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="surname">
                        Surname
                    </label>
                    <input
                        type="text"
                        name="surname"
                        value={this.state.surname}
                        onChange={this.handleEdit}
                        placeholder="Surname"
                        className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleEdit}
                        placeholder="Username"
                        className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="proPic">
                        Profile Picture URL
                    </label>
                    <input
                        type="text"
                        name="proPic"
                        value={this.state.proPic}
                        onChange={this.handleEdit}
                        placeholder="Profile Picture URL"
                        className="border border-gray-300 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="proPic">
                        Bio
                    </label>

                    <input
                        type="text"
                        name="bio"
                        value={this.state.bio}
                        onChange={this.handleEdit}
                        placeholder="Bio"
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

export default EditProfile;