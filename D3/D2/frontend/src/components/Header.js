import React from "react";
import AddSong from "./AddSong";
import SearchInput from "./SearchInput";
import { FaHome, FaUser, FaSearch, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { BiSolidPlaylist } from "react-icons/bi";
import { Link } from "react-router-dom";

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showAddSong: false,
			showSearch: false,
		};

		this.toggleAddSong = this.toggleAddSong.bind(this);
		this.toggleSearch = this.toggleSearch.bind(this);
		this.logoutHandle = this.logoutHandle.bind(this);
	}

	toggleSearch() {
		this.setState({ showSearch: !this.state.showSearch });
	}

	toggleAddSong() {
		this.setState({ showAddSong: !this.state.showAddSong });
	}

	logoutHandle()
	{
		sessionStorage.clear();
		window.location.href = '/index.html';
	}

	render() {
		const { showAddSong, showSearch } = this.state;

		return (
            <header className="flex justify-between items-center p-4 bg-gray-800 shadow-lg text-white">
                <div className="flex gap-6">
                    <Link to="/home.html" className="flex items-center hover:text-blue-400 transition duration-200">
                        <FaHome size={28} />
                        <span className="ml-2 text-lg font-semibold">Home</span>
                    </Link>
                    <Link to="/playlist.html" className="flex items-center hover:text-blue-400 transition duration-200">
                        <BiSolidPlaylist size={28} />
                        <span className="ml-2 text-lg font-semibold">Playlists</span>
                    </Link>
                    <Link to="/profile.html" className="flex items-center hover:text-blue-400 transition duration-200">
                        <FaUser size={28} />
                        <span className="ml-2 text-lg font-semibold">Profile</span>
                    </Link>
                </div>
                <div className="flex items-center gap-6">
                    <button onClick={this.toggleSearch} className="flex items-center text-lg focus:outline-none hover:text-blue-400 transition duration-200">
                        {showSearch ? "Cancel" : <FaSearch size={28} />}
                    </button>
                    {showSearch && <SearchInput />}
                    <button onClick={this.toggleAddSong} className="flex items-center text-lg focus:outline-none hover:text-blue-400 transition duration-200">
                        {showAddSong ? (
                            "Cancel"
                        ) : (
                            <span className="flex items-center">
                                Add Song <FaPlus size={28} className="ml-2" />
                            </span>
                        )}
                    </button>
                    <button onClick={this.logoutHandle} className="flex items-center text-lg focus:outline-none hover:text-red-400 transition duration-200">
                        <FaSignOutAlt size={28} className="mr-2" />
                        Logout
                    </button>
                </div>
                {showAddSong && <AddSong />}
            </header>
        );
	}
}

export default Header;
