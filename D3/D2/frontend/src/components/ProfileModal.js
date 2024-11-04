import React from "react";

class ProfileModal extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        const {visible, close, child} = this.props;

        if(!visible)
        {
            return null;
        }

        return(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
                <button
                    onClick={close}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                >
                    ✖
                </button>
                {child}
            </div>
        </div>);
    }
}

export default ProfileModal;