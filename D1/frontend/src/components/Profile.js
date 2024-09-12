import React from "react";

class Profile extends React.Component
{
    render()
    {
        const {name, bio, proPic} = this.props;

        return(
            <div>
                <img style={{width : "60px", height : "60px", objectFit: "cover", borderRadius : "4px"}} src={proPic} alt={`${name}' profile`} />
                <h2>{name}</h2>
                <p>{bio}</p>
            </div>
        );
    }
}

export default Profile;