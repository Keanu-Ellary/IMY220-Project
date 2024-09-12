import React from "react";
import '../styles/Search.css';

class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            item: this.props.item || "" ,
            errors: {
                item: "",
            },
        };

        this.searchInput = this.searchInput.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm(name, value) {
        let errors = this.state.errors;

        if (name === "item") {
            if (value.trim() === "") {
                errors.item = "Search input cannot be empty.";
            } else {
                errors.item = "";
            }
        }

        this.setState({ errors });
    }

    searchInput(event) {
        const { name, value } = event.target;
        this.setState({ item: value }, () => {
            this.validateForm(name, value);
        });
    }

    handleSubmit(event) 
    {
        event.preventDefault();
        if (this.state.errors.item === "" && this.state.item.trim() !== "") 
        {
            console.log("Form submitted with search term:", this.state.item);
        } 
        else 
        {
            alert("Search input cannot be empty.");
        }
    }

    render() {
        return (
            <div>
                <input 
                    type="text"
                    name="item"
                    placeholder="Search..."
                    value={this.state.item}
                    onChange={this.searchInput}
                    className="box"
                />
                {this.state.errors.item && (
                    <p className="error">{this.state.errors.item}</p>
                )}
                <button 
                    className="searchBtn"
                    onClick={this.handleSubmit}
                >
                    Search
                </button>
            </div>
        );
    }
}

export default SearchInput;