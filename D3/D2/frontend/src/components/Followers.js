import React from "react";
import Profile from "./Profile";

class Followers extends React.Component 
{
	constructor(props)
	{
		super(props);
		this.state = {
			followers: [],
			following: [],
			error: null,
		};

		this.unfollow = this.unfollow.bind(this);
	}

	async unfollow(otherId)
	{
		try 
		{
			const userId = sessionStorage.getItem("userId");

			const res = await fetch("http://localhost:8000/removeFollow", {
				method : "POST",
				headers : {
					"Content-Type" : "application/json",
				},
				body : JSON.stringify({userId : userId, otherId : otherId}),
			});

			const data = await res.json();

			if(data.success)
			{
				this.setState((previous) => ({
					following : previous.following.filter((user) => user._id !== otherId),
				}));
			}
			else
			{
				throw new Error("Failed to unfollow");
			}
		} 
		catch (error) 
		{
			console.error("Error in unfollowing user:", error);
			this.setState({ error: error.message });
		}
	}

	async componentDidMount() 
	{
		try 
		{
			const { followers, following } = this.props;

			const fetchUserDetails = async (userId) => {
				const response = await fetch("http://localhost:8000/user", {
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ userId : userId }),
				});
				const data = await response.json();
				
				if (data.result) 
				{
					return data.result;
				} 
				else 
				{
					throw new Error(`User data for ID ${userId} not found`);
				}
			};

			const [fetchedFollowers, fetchedFollowing] = await Promise.all([
				Promise.all(followers.map(fetchUserDetails)),
				Promise.all(following.map(fetchUserDetails)),
			]);

			this.setState({
				followers: fetchedFollowers,
				following: fetchedFollowing,
			});
		} 
		catch (error) 
		{
			console.error("Error fetching data:", error);
			this.setState({ error: error.message });
		}
	}

	render() 
	{
		const { followers, following, error } = this.state;

		if (error) 
		{
			return <div>Error: {error}</div>;
		}

		return (
			<div className="flex justify-between">
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

				<div className="flex-1 ml-5">
					<h3 className="text-xl font-semibold mb-4">Following: {following.length}</h3>
					<div className="space-y-4">
						{following.map((person, i) => (
						<span key={i}>
							<Profile
								key={i}
								name={person.username}
								bio={`${person.name} ${person.surname}`}
								proPic={person.proPic}
							/>

							<button
								onClick={() => this.unfollow(person._id)}
								className="bg-red-500 text-white px-2 py-1 rounded"
							>
								Unfollow
							</button>
						</span>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default Followers;
