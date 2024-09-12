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
        return(
            <form>
                <input 
                    type="text" 
                    name="playlistName" 
                    value={this.state.name} 
                    onChange={this.handleCreation} 
                    placeholder="Playlist Name" 
                />
                <input 
                    name="creator" 
                    value={this.state.creator} 
                    onChange={this.handleCreation} 
                    placeholder="Creator" 
                />
                <input 
                    name="image"
                    value={this.state.imageURL}
                    onChange={this.handleCreation}
                    placeholder="Image URL"
                />
                <button type="submit">Save</button>
            </form>
        );
    }
}

export default CreatePlaylist;