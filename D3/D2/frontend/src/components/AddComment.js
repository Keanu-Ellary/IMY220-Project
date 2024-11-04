import React from "react";

class AddComment extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            comment : this.props.comment
        }

        this.postComment = this.postComment.bind(this);
        this.commentChange = this.commentChange.bind(this);
    }

    commentChange(event)
    {
        const {name, value} = event.target;
        this.setState({[name] : value});
    }

    async postComment(event)
    {
        event.preventDefault();

        const {playID, onCommentAdd} = this.props;
        const userId = sessionStorage.getItem("userId");
        const {comment} = this.state;

        const body = {
            userID : userId,
            content : comment,
            playlistID : playID
        };

        try 
        {
            const res = await fetch("http://localhost:8000/addComment", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(body),
			});

            if(res.ok)
            {
                const saved = await res.json();
                onCommentAdd(saved);
                this.setState({comment : ""});
                window.location.reload();
            }
        } 
        catch (error) 
        {
            alert("Error in posting comment:", error);
        }
    }

    render()
    {
        return(
            <form onSubmit={this.postComment}>
                <input
                    type="text"
                    name="comment"
                    value={this.state.comment}
                    onChange={this.commentChange}
                    placeholder="Add Comment"
                />
                <button type="submit">Post Comment</button>
            </form>
        )
    }
}

export default AddComment;