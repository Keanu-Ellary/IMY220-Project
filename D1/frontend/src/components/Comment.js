import React from "react";
import '../styles/Comment.css'

class Comment extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        const { username, dateTime, comment, likes, dislikes } = this.props;

        return(
            <div className="comment-container">
                <div className="comment-header">
                    <span className="comment-username">{username}</span>
                    <span className="comment-datetime">{dateTime}</span>
                </div>

                <div className="comment-body">
                    <p className="comment-text">{comment}</p>
                </div>

                <div className="comment-actions">
                    <button className="like-button">👍 {likes}</button>
                    <button className="dislike-button">👎 {dislikes}</button>
                </div>
            </div>
        );
    }
}

export default Comment;