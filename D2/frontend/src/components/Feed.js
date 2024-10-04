import React from "react";
import Song from "./Song";
import PlaylistPreview from "./PlaylistPreview";

class Feed extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			songs : [],
			playlists : [],
			loading : true,
			error : null
		};
	}

	async componentDidMount()
	{
		try
		{
			const [songs, playlists] = await Promise.all([
				await fetch("http://localhost:8000/songs"),
				await fetch("http://localhost:8000/playlists"),
			]);

			if(!songs.ok || !playlists.ok)
			{
				throw new Error(`Failed to fetch data. Status: ${songs.status}, ${playlists.status}`);
			}

			const allSongs = await songs.json();
			const allPlaylists = await playlists.json();

			this.setState({
				songs : allSongs,
				playlists : allPlaylists,
				loading : false
			});
		}
		catch(error)
		{
			this.setState({error : error.message, loading : false});
		}
	}

	render() {
		const { showSongs } = this.props;
		const {songs, playlists, loading, error} = this.state;

		if(loading)
		{
			return <div>Loading...</div>;
		}

		if(error)
		{
			return <div>Error: {error}</div>;
		}

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
							creator={playlist.Creator}
							numOfSongs={playlist.numOfSongs}
							imageURL={playlist.imageUrl}
							songs={playlist.Songs}
							comments={playlist.Comments}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default Feed;
