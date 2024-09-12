import React from "react";
import Profile from "./Profile";

const following = [
	{
		name: "MelodyLover92",
		bio: "Living life one beat at a time. Music is my escape, my therapy, and my passion. Always on the lookout for new tunes to vibe with. 🎧🎶",
		proPic:
			"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
	},
	{
		name: "JazzJunkie",
		bio: "Jazz enthusiast with a love for smooth saxophone solos and groovy bass lines. Sharing my favorite tracks and discovering new artists. 🎷🎵",
		proPic:
			"https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg",
	},
	{
		name: "RockStarRiley",
		bio: "Rock 'n' roll is in my veins. From classic rock to modern hits, I live for the guitar riffs and powerful vocals. Let's rock together! 🤘🎸",
		proPic:
			"https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg",
	},
];

const followers = [
	{
		name: "RockStarRiley",
		bio: "Rock 'n' roll is in my veins. From classic rock to modern hits, I live for the guitar riffs and powerful vocals. Let's rock together! 🤘🎸",
		proPic:
			"https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg",
	},
	{
		name: "JazzJunkie",
		bio: "Jazz enthusiast with a love for smooth saxophone solos and groovy bass lines. Sharing my favorite tracks and discovering new artists. 🎷🎵",
		proPic:
			"https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg",
	},
	{
		name: "MelodyLover92",
		bio: "Living life one beat at a time. Music is my escape, my therapy, and my passion. Always on the lookout for new tunes to vibe with. 🎧🎶",
		proPic:
			"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
	},
	{
		name: "PopPrincess",
		bio: "Pop music aficionado with a penchant for catchy hooks and danceable beats. Join me on a journey through the latest chart-toppers and hidden gems. 🎤💃",
		proPic:
			"https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg",
	},
];

class Followers extends React.Component {
	render() {
		return (
			<div style={{display : "flex", justifyContent : "space-between"}}>
				<div style={{flex : "1", marginRight : "20px"}}>
					<h3>Followers: {followers.length}</h3>
					<div>
						{followers.map((person, i) => (
							<Profile
								key={i}
								name={person.name}
								bio={person.bio}
								proPic={person.proPic}
							/>
						))}
					</div>
				</div>

				<div style={{flex : "1", marginLeft : "20px"}}>
					<h3>Following: {following.length}</h3>
					<div>
						{following.map((person, i) => (
							<Profile
								key={i}
								name={person.name}
								bio={person.bio}
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
