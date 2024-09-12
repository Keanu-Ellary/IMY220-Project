import React from "react";
import AddSong from "./AddSong";
import SearchInput from "./SearchInput";
import { FaHome, FaUser, FaSearch, FaPlus } from "react-icons/fa";
import { BiSolidPlaylist } from "react-icons/bi";
import { Link } from "react-router-dom";
import "../styles/Header.css";

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showAddSong: false,
			showSearch: false,
		};

		this.toggleAddSong = this.toggleAddSong.bind(this);
		this.toggleSearch = this.toggleSearch.bind(this);
	}

	toggleSearch() {
		this.setState({ showSearch: !this.state.showSearch });
	}

	toggleAddSong() {
		this.setState({ showAddSong: !this.state.showAddSong });
	}

	render() {
		const { showAddSong, showSearch } = this.state;

		return (
			<header className="navbar">
				<div className="nav-links">
					<Link to="/home.html" className="nav-icon">
						<FaHome size={24} />
						<span>Home</span>
					</Link>
					<Link to="/playlist.html" className="nav-icon">
						<BiSolidPlaylist size={24} />
						<span>Playlists</span>
					</Link>
					<Link to="/profile.html" className="nav-icon">
						<FaUser size={24} />
						<span>Profile</span>
					</Link>
				</div>
				<div className="nav-actions">
					<button onClick={this.toggleSearch} className="toggle-add-song-btn">
						{showSearch ? "Cancel" : <FaSearch size={24} />}
					</button>
					{showSearch && <SearchInput />}
					<button onClick={this.toggleAddSong} className="toggle-add-song-btn">
						{showAddSong ? (
							"Cancel"
						) : (
							<label style={{ alignContent: "center" }}>
								Add Song {<FaPlus size={24} />}
							</label>
						)}
					</button>
				</div>
				{showAddSong && <AddSong />}
			</header>
		);
	}
}

export default Header;
