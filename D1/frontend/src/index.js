import React from "react";
import ReactDOM from "react-dom/client";
import ProfilePreview from "./components/ProfilePreview";
import Header from "./components/Header";
import Feed from "./components/Feed";
import Playlists from "./components/Playlists";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

class Home extends React.Component {
	render() {
		return (
			<div>
				<Header />
				<Feed showSongs={true}/>
			</div>
		);
	}
}

const root = ReactDOM.createRoot(document.getElementById("home"));
root.render(
	<Router>
		<Routes>
			<Route path="/home.html" element={<Home />} />
			<Route path="/playlist.html" element={<div><Header /><Playlists /></div>} />
			<Route path="/profile.html" element={<div><Header /><ProfilePreview /></div>} />
			<Route path="/profile/:id" element={<div><Header /><ProfilePreview /></div>}/>
		</Routes>
	</Router>
);