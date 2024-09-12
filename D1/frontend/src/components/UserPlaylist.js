import React from "react";
import Feed from "./Feed";

class UserPlaylist extends React.Component
{
    render()
    {
        return(
            <div>
                <Feed showSongs={true}/>
            </div>
        );
    }
}

export default UserPlaylist;