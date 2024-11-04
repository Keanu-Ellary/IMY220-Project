import React from "react";
import EditProfile from "./EditProfile";
import UserPlaylist from "./UserPlaylist";
import Followers from "./Followers";
import Profile from "./Profile";
import ConfirmDeletion from "./ConfirmDeletion";

class ProfilePreview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editingProfile: false,
			creatingPlaylist: false,
			userId : sessionStorage.getItem("userId"),
			user : {},
			usersPlaylists : [],
			loading : true,
			error : null,
			showModal : false,
		};

		this.editProfileToggle = this.editProfileToggle.bind(this);
		this.deletePro = this.deletePro.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
	}

	toggleModal()
	{
		this.setState({showModal : !this.state.showModal});
	}

	async deletePro()
	{
		try 
		{
			const res = await fetch("http://localhost:8000/deleteUser", {
				method : "DELETE",
				headers : {
					"Content-Type" : "application/json",
				},
				body : JSON.stringify({userId : sessionStorage.getItem("userId")}),
			});

			if(res.ok)
			{
				alert("You have deleted your account. Goodbye...");
				this.setState({showModal : false});
				sessionStorage.clear();
				window.location.href = '/index.html';
			}
		} 
		catch (error) 
		{
			alert(error.message);
		}
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
				usersPlaylists : foundUserPlaylists.result,
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
		const {user, usersPlaylists, loading, error, showModal} = this.state;

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
					first={user.result.name}
					last={user.result.surname}
                    bio={user.result.bio}
                    proPic={user.result.proPic}
                />

				<button
    				onClick={this.editProfileToggle}
    				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
				>
    				{editingProfile ? "Cancel" : "Edit Profile"}
				</button>
				<br />
				<button
					onClick={this.toggleModal}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
				>
					Delete Your Account
				</button>

				{showModal && (
					<ConfirmDeletion 
						onClose={this.toggleModal}
						onConfirm={this.deletePro}
						name="your account"
					/>
				)}

                {editingProfile && <EditProfile name={user.result.name} surname={user.result.surname} proPic={user.result.proPic} username={user.result.username} bio={user.result.bio}/>}
				
				{user.result.followers.length > 0 || user.result.following.length > 0 && (
					<Followers followers={user.result.followers} following={user.result.following} />
				)}

				<div>
					<h3 className="text-xl font-semibold mb-4">Your Incredible Playlists:</h3>
					{usersPlaylists && usersPlaylists.length > 0 ? (
						usersPlaylists.map((playlist, index) => (
							<UserPlaylist key={index} playlist={playlist} />
						))
					) : (
						<p>No playlists found</p>
					)}
				</div>
			</div>
		);
	}
}

export default ProfilePreview;
