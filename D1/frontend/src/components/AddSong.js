import React from "react";

class AddSong extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            song: this.props.song || "",
            artist: this.props.artist || "",
            duration: this.props.duration || "",
            image: this.props.image || "",
            errors: {
                song: "",
                artist: "",
                duration: "",
                image: ""
            }
        };

        this.addSongHandle = this.addSongHandle.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    addSongHandle(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value }, () => {
            this.validateForm(name, value);
        });
    }

    validateForm(fieldName, value) {
        let errors = this.state.errors;

        switch (fieldName) {
            case "song":
                errors.song = value.length === 0 ? "Song title is required" : "";
                break;
            case "artist":
                errors.artist = value.length === 0 ? "Artist name is required" : "";
                break;
            case "duration":
                errors.duration = value.length === 0 ? "Duration is required" : "";
                break;
            case "image":
                errors.image = value.length === 0 ? "Image is required" : "";
                break;
            default:
                break;
        }

        this.setState({ errors });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { errors, song, artist, duration } = this.state;

        // Check for errors before submitting
        if (errors.song || errors.artist || errors.duration) {
            alert("Please fix the errors before submitting.");
            return;
        }

        if (song && artist && duration) {
            // Form is valid, submit the data
            console.log("Form submitted:", this.state);
            // Reset form or perform other actions as needed
        } else {
            alert("Please fill in all required fields.");
        }
    }

    render() {
        const { errors } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="song"
                        onChange={this.addSongHandle}
                        placeholder="Song Title"
                        required
                    />
                    {errors.song && <p style={{ color: "red" }}>{errors.song}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        name="artist"
                        onChange={this.addSongHandle}
                        placeholder="Artist Name"
                        required
                    />
                    {errors.artist && <p style={{ color: "red" }}>{errors.artist}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        name="duration"
                        onChange={this.addSongHandle}
                        placeholder="Song Duration"
                        required
                    />
                    {errors.duration && <p style={{ color: "red" }}>{errors.duration}</p>}
                </div>
                <div>
                    <input
                        type="file"
                        name="image"
                        onChange={this.addSongHandle}
                        placeholder="Song Image"
                    />
                    {errors.image && <p style={{ color: "red" }}>{errors.image}</p>}
                </div>
                <button type="submit">Add Song</button>
            </form>
        );
    }
}

export default AddSong;