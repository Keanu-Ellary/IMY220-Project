import React from "react";
import { Link } from "react-router-dom";
import ViewProfile from "./ViewProfile";

class Comment extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            likes : this.props.likes,
            dislikes : this.props.dislikes,
            isViewing : false,
        };

        this.like = this.like.bind(this);
        this.dislike = this.dislike.bind(this);
        this.toggleView = this.toggleView.bind(this);
    }

    toggleView()
    {
        this.setState({isViewing : !this.state.isViewing});
    }

    async like()
    {
        const body = {
            commentID : this.props.ID,
        };

        try 
        {
            const res = await fetch("http://localhost:8000/like", {
                method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body : JSON.stringify(body),
            });

            if(res.ok)
            {
                this.setState((previous) => ({
                    likes : previous.likes + 1,
                }));
            }
        } 
        catch (error) 
        {
            alert("Error in liking comment:", error);
        }
    }

    async dislike()
    {
        const body = {
            commentID : this.props.ID,
        };

        try 
        {
            const res = await fetch("http://localhost:8000/dislike", {
                method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body : JSON.stringify(body),
            });

            if(res.ok)
            {
                this.setState((previous) => ({
                    dislikes : previous.dislikes + 1,
                }));
            }
        } 
        catch (error) 
        {
            alert("Error in disliking comment:", error);
        }
    }

    render()
    {
        const { username, dateTime, comment, userID } = this.props;
        const {likes, dislikes, isViewing} = this.state;

        return (
            <div className="comment-container bg-gray-100 p-4 rounded-lg shadow-sm mb-4">
                <div className="comment-header flex justify-between mb-2">
                    <button onClick={this.toggleView}>{username}</button>
                    {isViewing && 
                        <ViewProfile userID={userID}/>
                    }
                    <span className="comment-datetime text-gray-500 text-sm">{dateTime}</span>
                </div>

                <div className="comment-body mb-2">
                    <p className="comment-text text-gray-700">{comment}</p>
                </div>

                <div className="comment-actions flex space-x-4">
                    <button 
                        className="like-button bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors duration-200"
                        onClick={this.like}
                    >
                        👍 {likes}
                    </button>
                    <button 
                        className="dislike-button bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors duration-200"
                        onClick={this.dislike}
                    >
                        👎 {dislikes}
                    </button>
                </div>
            </div>
        );
    }
}

export default Comment;