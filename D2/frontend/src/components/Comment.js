import React from "react";

class Comment extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        const { username, dateTime, comment, likes, dislikes } = this.props;

        return (
            <div className="comment-container bg-gray-100 p-4 rounded-lg shadow-sm mb-4">
                <div className="comment-header flex justify-between mb-2">
                    <span className="comment-username font-semibold text-gray-800">{username}</span>
                    <span className="comment-datetime text-gray-500 text-sm">{dateTime}</span>
                </div>

                <div className="comment-body mb-2">
                    <p className="comment-text text-gray-700">{comment}</p>
                </div>

                <div className="comment-actions flex space-x-4">
                    <button className="like-button bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors duration-200">
                        👍 {likes}
                    </button>
                    <button className="dislike-button bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors duration-200">
                        👎 {dislikes}
                    </button>
                </div>
            </div>
        );
    }
}

export default Comment;