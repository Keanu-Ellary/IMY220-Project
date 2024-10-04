import React from "react";
import Profile from "./Profile";

class Followers extends React.Component 
{
	constructor(props)
	{
		super(props);
		this.state = {
			followers : {},
			following : {},
			error : null,
		};
	}

	async componentDidMount() {
		try {
			const { followers, following } = this.props;
	
			// Function to fetch user data for each userId
			const fetchUserDetails = async (userId) => {
				const response = await fetch("http://localhost:8000/user", {
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ userId: userId }),
				});
	
				const data = await response.json();
				if (data.result) {
					return data.result; // Assuming user details are in the `result` field
				} else {
					throw new Error("User data not found");
				}
			};
	
			// Fetch all followers and following details
			const fetchedFollowers = await Promise.all(followers.map(fetchUserDetails));
			const fetchedFollowing = await Promise.all(following.map(fetchUserDetails));
	
			this.setState({
				followers: fetchedFollowers,
				following: fetchedFollowing,
			});
	
			console.log("Fetched Followers:", followers);
			console.log("Fetched Following:", fetchedFollowing);
		} catch (error) {
			this.setState({ error: error.message });
		}
	}

	render() 
	{
		const {followers, following, error} = this.props;
		if(error)
		{
			return <div>Error: {error}</div>;
		}

		return (
			<div className="flex justify-between">
				{/* Followers Section */}
				<div className="flex-1 mr-5">
					<h3 className="text-xl font-semibold mb-4">Followers: {followers.length}</h3>
					<div className="space-y-4">
						{followers.map((person, i) => (
							<Profile
								key={i}
								name={person.username}
								bio={`${person.name} ${person.surname}`}
								proPic={person.proPic}
							/>
						))}
					</div>
				</div>

				{/* Following Section */}
				<div className="flex-1 ml-5">
					<h3 className="text-xl font-semibold mb-4">Following: {following.length}</h3>
					<div className="space-y-4">
						{following.map((person, i) => (
							<Profile
								key={i}
								name={person.username}
								bio={`${person.name} ${person.surname}`}
								proPic={person.proPic}
							/>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default Followers;
