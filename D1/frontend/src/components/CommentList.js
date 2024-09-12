import React from "react";
import Comment from "./Comment";
import AddComment from "./AddComment";

class CommentList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			addingComment: false,
		};

        this.addCommentToggle = this.addCommentToggle.bind(this);
	}

	addCommentToggle() 
    {
		this.setState({ addingComment: !this.state.addingComment });
	}

	render() {
		const { comments } = this.props;
		const { addingComment } = this.state;

		return (
			<div>
				{comments.map((comment, i) => (
					<Comment
						key={i}
						username={comment.userName}
						dateTime={comment.dateTime}
						comment={comment.comment}
						likes={comment.likes}
						dislikes={comment.dislikes}
					/>
				))}

				<button onClick={this.addCommentToggle} className="addBtn">
					{addingComment ? "Cancel" : "Add Comment"}
				</button>
				{addingComment && <AddComment />}
			</div>
		);
	}
}

export default CommentList;
