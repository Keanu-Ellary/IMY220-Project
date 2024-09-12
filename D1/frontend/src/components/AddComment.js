import React from "react";

class AddComment extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            comment : this.props.comment
        }
    }

    postComment(event)
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
                    name="comment"
                    onChange={this.postComment}
                    placeholder="Add Comment"
                />
                <button type="submit">Post Comment</button>
            </form>
        )
    }
}

export default AddComment;