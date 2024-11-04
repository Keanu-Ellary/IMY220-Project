import React from "react";
import UserPlaylist from "./UserPlaylist";

class ViewProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailsOfUser: null,
            following: false,
            playlistsOfUser : {},
        };

        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
    }

    async componentDidMount() 
    {
        try 
        {
            const response = await fetch("http://localhost:8000/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: this.props.userID }),
            });

            const secondRes = await fetch("http://localhost:8000/user", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({userId : sessionStorage.getItem('userId')}),
            });

            const data = await response.json();
            const thisUser = await secondRes.json();

            if (response.ok && secondRes.ok) 
            {
                const currentUserID = this.props.userID;

                const following = thisUser.result.following.some(
                    follower => follower === currentUserID
                );
                
                this.setState({ detailsOfUser: data.result, following });
            }
        } 
        catch (error) 
        {
            console.log(error);
            alert("Error fetching user details:", error);
        }
    }

    async follow() 
    {
        try 
        {
            const res = await fetch("http://localhost:8000/addFollow", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({ userId: sessionStorage.getItem('userId'), otherId: this.state.detailsOfUser._id }),
            });

            if (res.ok) 
            {
                this.setState({ following: true });
            }
        } 
        catch (error) 
        {
            alert("Error following user:", error);
        }
    }

    async unfollow() 
    {
        try 
        {
            const res = await fetch("http://localhost:8000/removeFollow", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: sessionStorage.getItem('userId'), otherId: this.state.detailsOfUser._id }),
            });

            if (res.ok) 
            {
                this.setState({ following: false });
            }
        } 
        catch (error) 
        {
            alert("Error unfollowing user:", error);
        }
    }

    render() 
    {
        const { detailsOfUser, following } = this.state;

        if (!detailsOfUser) 
        {
            return <p>Loading user details...</p>;
        }

        return (
            <div className="profile-container bg-gray-100 p-4 rounded-md shadow-sm">
                <h2 className="text-lg font-medium mb-2">{detailsOfUser.username}'s Profile</h2>
                <h4 className="text-sm font-normal mb-3">{detailsOfUser.bio}</h4>
        
                <div className="flex space-x-2">
                    <button
                        className={`px-3 py-1 rounded-md ${
                            following ? "bg-gray-400" : "bg-blue-500"
                        } text-white text-sm`}
                        disabled={following}
                        onClick={this.follow}
                    >
                        Follow
                    </button>
                    <button
                        className={`px-3 py-1 rounded-md ${
                            following ? "bg-red-500" : "bg-gray-400"
                        } text-white text-sm`}
                        disabled={!following}
                        onClick={this.unfollow}
                    >
                        Unfollow
                    </button>
                </div>
        
                <h3 className="text-sm font-medium mt-2">Followers: {detailsOfUser.followers.length}</h3>
                <h3 className="text-sm font-medium mt-1">Following: {detailsOfUser.following.length}</h3>
            </div>
        );        
    }
}

export default ViewProfile;
