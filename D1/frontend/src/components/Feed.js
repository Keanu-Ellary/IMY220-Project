import React from "react";
import Song from "./Song";
import PlaylistPreview from "./PlaylistPreview";

const songs = [
	{
		title: "yes, and",
		artists: ["Ariana Grande"],
		duration: "3:30",
		image:
			"https://upload.wikimedia.org/wikipedia/en/f/f9/Ariana_Grande_-_Yes%2C_And_cover_art.png",
		streams: 489807533,
	},
	{
		title: "Texas Hold 'em",
		artists: ["Beyonce"],
		duration: "3:53",
		image:
			"https://media.pitchfork.com/photos/65ca28931c27b5c475223e2e/16:9/w_1280,c_limit/Beyonce-Texas-Hold-Em.jpg",
		streams: 525662551,
	},
	{
		title: "Die With a Smile",
		artists: ["Lady Gaga", "Bruno Mars"],
		duration: "4:11",
		image:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvhcYskQHOxAqogCcgaOSczW9D3l6Nd4riLQ&s",
		streams: 231315897,
	},
	{
		title: "Houdini",
		artists: ["Dua Lipa"],
		duration: "3:05",
		image:
			"https://upload.wikimedia.org/wikipedia/en/a/a0/Dua_Lipa_-_Houdini.png",
		streams: 601573360,
	},
	{
		title: "i like the way you kiss me",
		artists: ["Artemas"],
		duration: "2:22",
		image:
			"https://upload.wikimedia.org/wikipedia/en/thumb/3/3e/Artemas_-_I_Like_the_Way_You_Kiss_Me.png/220px-Artemas_-_I_Like_the_Way_You_Kiss_Me.png",
		streams: 886707843,
	},
	{
		title: "we can't be friends (wait for your love)",
		artists: ["Ariana Grande"],
		duration: "3:48",
		image:
			"https://upload.wikimedia.org/wikipedia/en/6/6d/WeCantBeFriendsArianaGrande.png",
		streams: 863703691,
	},
	{
		title: "Save Your Tears (Remix)",
		artists: ["The Weeknd", "Ariana Grande"],
		duration: "3:11",
		image: "https://i.scdn.co/image/ab67616d0000b273c6af5ffa661a365b77df6ef6",
		streams: 1630077311,
	},
	{
		title: "Kill Bill",
		artists: ["SZA"],
		duration: "2:33",
		image: "https://i1.sndcdn.com/artworks-0ae0FPVVdWLJ-0-t500x500.jpg",
		streams: 2055510506,
	},
	{
		title: "Cruel Summer",
		artists: ["Taylor Swift"],
		duration: "2:58",
		image:
			"https://i1.sndcdn.com/artworks-D3XnYXYQA1hzUmIj-HPvM7A-t500x500.jpg",
		streams: 2449610108,
	},
	{
		title: "the boy is mine",
		artists: ["Ariana Grande"],
		duration: "2:53",
		image:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNOBU2UAUztQXCptxEYsd1VhhlIBBfyzAKxg&s",
		streams: 303790366,
	},
];

const comments = 
[
    {
        userName : "EDMEnthusiast",
        dateTime : "2024-09-12 14:30:00",
        comment : "Great playlist dude",
        likes : "10",
        dislikes : "2"
    },
    {
        userName: "MelodyLover92",
        dateTime: "2024-09-12 15:00:00",
        comment: "Loving the vibes on this playlist!",
        likes: "15",
        dislikes: "1"
    },
    {
        userName: "JazzJunkie",
        dateTime: "2024-09-12 15:30:00",
        comment: "Smooth tracks, perfect for a chill evening.",
        likes: "12",
        dislikes: "0"
    },
    {
        userName: "RockStarRiley",
        dateTime: "2024-09-12 16:00:00",
        comment: "This playlist rocks! 🤘",
        likes: "20",
        dislikes: "3"
    },
    {
        userName: "PopPrincess",
        dateTime: "2024-09-12 16:30:00",
        comment: "Can't stop dancing to these tunes!",
        likes: "18",
        dislikes: "2"
    },
    {
        userName: "IndieInsider",
        dateTime: "2024-09-12 17:00:00",
        comment: "Great selection of indie tracks!",
        likes: "14",
        dislikes: "1"
    },
    {
        userName: "HipHopHead",
        dateTime: "2024-09-12 17:30:00",
        comment: "These beats are fire! 🔥",
        likes: "22",
        dislikes: "4"
    },
    {
        userName: "ClassicalConnoisseur",
        dateTime: "2024-09-12 18:00:00",
        comment: "Beautiful and timeless pieces.",
        likes: "10",
        dislikes: "0"
    },
    {
        userName: "EDMEnthusiast",
        dateTime: "2024-09-12 18:30:00",
        comment: "Perfect for my workout session!",
        likes: "16",
        dislikes: "3"
    },
    {
        userName: "SoulfulSinger",
        dateTime: "2024-09-12 19:00:00",
        comment: "These songs touch the soul.",
        likes: "13",
        dislikes: "1"
    },    
];

const playlists = [
	{
		name: "Pop Perfection",
		creator: "John Doe",
		numOfSongs: "20",
		genre : "Pop",
		imageUrl:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS03kp5P4RYLbo9lIvu51RwCqhAjXjSRgzdww&s",
		songs: songs.slice(0, 3),
		comments : comments.slice(0,3)
	},
	{
		name: "Chill Vibes",
		creator: "Jane Doe",
		numOfSongs: "30",
		genre : "R&B",
		imageUrl:
			"https://c8.alamy.com/zooms/9/fea52cd0567241618d28f3bbbe97e1aa/2h31w35.jpg",
		songs: songs.slice(3, 6),
		comments : comments.slice(3,6)
	},
	{
		name: "Workout Jams",
		creator: "Mark Zukurberg",
		numOfSongs: "15",
		genre : "Upbeat",
		imageUrl:
			"https://i.scdn.co/image/ab67616d0000b2734bb751566bb50ed57c72c66d",
		songs: songs.slice(6, 9),
		comments : comments.slice(6,8)
	},
	{
		name: "Saturday Night",
		creator: "Plasma TV",
		numOfSongs: "35",
		genre : "Dance",
		imageUrl:
			"https://i1.sndcdn.com/artworks-YcK7bbgkMXX2Bs9D-mVRGAw-t500x500.jpg",
		songs: songs.slice(2, 5),
		comments : comments.slice(2,6)
	},
	{
		name: "Sunday Chillz",
		creator: "Ice Cube",
		numOfSongs: "30",
		genre : "R&B",
		imageUrl:
			"https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84b67b94b7ff039fd815ba3f60",
		songs: songs.slice(4, 7),
		comments : comments.slice(4,8)
	},
];

class Feed extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { showSongs } = this.props;
		return (
			<div className="feed">
				{showSongs && (
					<>
						<h2>Songs</h2>
						<div className="feed-songs">
							{songs.map((song, index) => (
								<Song
									key={index}
									title={song.title}
									artists={song.artists}
									duration={song.duration}
									image={song.image}
									streams={song.streams}
								/>
							))}
						</div>
					</>
				)}

				<h2>Playlists</h2>
				<div className="feed-playlists">
					{playlists.map((playlist, index) => (
						<PlaylistPreview
							key={index}
							name={playlist.name}
							creator={playlist.creator}
							numOfSongs={playlist.numOfSongs}
							imageURL={playlist.imageUrl}
							songs={playlist.songs}
							comments={playlist.comments}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default Feed;
