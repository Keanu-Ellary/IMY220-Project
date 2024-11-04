import React from "react";

class Profile extends React.Component
{
    render()
    {
        const {name, bio, proPic, first, last} = this.props;

        return (
            <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-lg">
              <img
                className="w-16 h-16 object-cover rounded-lg border-2 border-gray-300"
                src={proPic}
                alt={`${name}'s profile`}
              />
              <div>
                <h2 className="text-xl font-bold text-gray-900">{name}</h2>
                <h3 className="text-xl font-bold text-gray-900">{first} {last}</h3>
                <p className="text-gray-600">{bio}</p>
              </div>
            </div>
        );
    }
}

export default Profile;