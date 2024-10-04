import React from "react";
import EditProfile from "./EditProfile";
import UserPlaylist from "./UserPlaylist";
import Followers from "./Followers";
import Profile from "./Profile";

class ProfilePreview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editingProfile: false,
			creatingPlaylist: false,
			userId : sessionStorage.getItem("userId"),
			user : {},
			usersPlaylists : {},
			loading : true,
			error : null,
		};

		this.editProfileToggle = this.editProfileToggle.bind(this);
	}

	async componentDidMount()
	{
		try
		{
			const [user, usersPlaylists] = await Promise.all([
				await fetch("http://localhost:8000/user", {
					method: "POST",
					headers : {
						'Content-Type' : 'application/json',
					},
					body: JSON.stringify({userId : this.state.userId}),
				}),
				await fetch("http://localhost:8000/usersPlaylist", {
					method: "POST",
					headers : {
						'Content-Type' : 'application/json',
					},
					body: JSON.stringify({userId : this.state.userId}),
				}),
			]);

			if(!user.ok || !usersPlaylists.ok)
			{
				throw new Error(`Failed to fetch data. Status: ${user.status}, ${usersPlaylists.status}`);
			}

			const foundUser = await user.json();
			const foundUserPlaylists = await usersPlaylists.json();

			this.setState({
				user : foundUser,
				usersPlaylists : foundUserPlaylists.result[0],
				loading : false,
			});
		}
		catch(error)
		{
			this.setState({error : error.message, loading : false});
		}
	}

	editProfileToggle() {
		this.setState({ editingProfile: !this.state.editingProfile });
	}

	render() {
		const { editingProfile } = this.state;
		const {user, usersPlaylists, loading, error} = this.state;

		if(loading)
		{
			return <div>Loading...</div>;
		}

		if(error)
		{
			return <div>Error: {error}</div>;
		}

		return (
			<div>
				<Profile
                    name={user.result.username}
                    bio={`${user.result.name} ${user.result.surname}`}
                    proPic={user.result.proPic}
                />

				<button onClick={this.editProfileToggle}>
					{editingProfile ? "Cancel" : "Edit Profile"}
				</button>
                {editingProfile && <EditProfile name={user.result.username} bio={user.result.proPic}/>}
				
				{/* Check if followers exist before rendering the Followers component */}
				{user.result.followers.length > 0 && (
					<Followers followers={user.result.followers} following={user.result.following} />
				)}

				{/* Check if usersPlaylists exists and has songs before rendering the UserPlaylist component */}
				{usersPlaylists && usersPlaylists.songs && usersPlaylists.songs.length > 0 && (
					<UserPlaylist playlist={usersPlaylists} />
				)}
			</div>
		);
	}
}

export default ProfilePreview;
