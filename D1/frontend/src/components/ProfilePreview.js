import React from "react";
import EditProfile from "./EditProfile";
import UserPlaylist from "./UserPlaylist";
import Followers from "./Followers";
import Profile from "./Profile";

const profile = [{ name : "HipHopHead", bio : "Hip-hop is my heartbeat. From old school to new school, I appreciate the art of storytelling through rhythm and rhyme. Let’s vibe to some sick beats. 🎤🎧", proPic : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKKOdmJz8Z2pDtYgFgR2u9spABvNNPKYYtGw&s" }]

class ProfilePreview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editingProfile: false,
			creatingPlaylist: false,
		};

		this.editProfileToggle = this.editProfileToggle.bind(this);
	}

	editProfileToggle() {
		this.setState({ editingProfile: !this.state.editingProfile });
	}

	render() {
		const { editingProfile } = this.state;

		return (
			<div>
                <Profile 
                    name={profile[0].name}
                    bio={profile[0].bio}
                    proPic={profile[0].proPic}
                />

				<button onClick={this.editProfileToggle}>
					{editingProfile ? "Cancel" : "Edit Profile"}
				</button>
                {editingProfile && <EditProfile name={profile[0].name} bio={profile[0].bio}/>}
				
				<Followers />

				<UserPlaylist />
			</div>
		);
	}
}

export default ProfilePreview;
