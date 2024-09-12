import React from "react";

class EditProfile extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            name : this.props.name,
            bio : this.props.bio,
            image : this.props.image
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
        return(
            <form>
                <input 
                    type="text" 
                    name="name" 
                    value={this.state.name} 
                    onChange={this.handleEdit} 
                    placeholder="Name" 
                />
                <textarea 
                    name="bio" 
                    value={this.state.bio} 
                    onChange={this.handleEdit} 
                    placeholder="Bio" 
                />
                <input
                    type="text"
                    name="image"
                    value={this.state.image}
                    onChange={this.handleEdit}
                    placeholder="Image"
                />
                <button type="submit">Save</button>
            </form>
        );
    }
}

export default EditProfile;