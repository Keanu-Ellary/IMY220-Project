import React from "react";
import Comment from "./Comment";
import AddComment from "./AddComment";

class CommentList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			addingComment: false,
			comments: this.props.comments,
		};

        this.addCommentToggle = this.addCommentToggle.bind(this);
		this.commentAdd = this.commentAdd.bind(this);
	}

	addCommentToggle() 
    {
		this.setState({ addingComment: !this.state.addingComment });
	}

	commentAdd(content)
	{
		this.setState((prevState) => ({
			comments: [...prevState.comments, content],
			addingComment: false,
		}));
	}

	render() {
		const { comments } = this.props;
		const { addingComment } = this.state;

		return (
			<div>
				{comments.map((comment, i) => (
					<Comment
						key={i}
						ID={comment._id}
						username={comment.userName}
						dateTime={comment.dateTime}
						comment={comment.comment}
						likes={comment.likes}
						dislikes={comment.dislikes}
						userID={comment.userID}
					/>
				))}

				<button onClick={this.addCommentToggle} className="addBtn">
					{addingComment ? "Cancel" : "Add Comment"}
				</button>
				{addingComment && <AddComment playID={this.props.playID} onCommentAdd={this.commentAdd}/>}
			</div>
		);
	}
}

export default CommentList;
