/**
 * Created by bipuk on 7/24/2017.
 */
import React from "react";
import PropTypes from "prop-types";

let PlayerPreview = props => {
  return (
    <div>
      <div className="column">
        <img src={props.avatar} alt={"Avatar for" + props.username} />
        <h2 className="username">@{props.username}</h2>
      </div>
      <button className="reset" onClick={props.onReset.bind(null, props.id)}>
        Reset
      </button>
    </div>
  );
};

PlayerPreview.prototypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired
};
class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(ev) {
    let value = ev.target.value;

    this.setState(function() {
      return {
        username: value
      };
    });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.onSubmit(this.props.id, this.state.username);
  }

  render() {
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label htmlFor="username">{this.props.label}</label>
        <input
          type="text"
          id="username"
          placeholder="github username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button
          className="button"
          type="submit"
          disabled={!this.state.username}
        >
          Submit
        </button>
      </form>
    );
  }
}

/*PRoptypes justification for PlayerInput component*/
PlayerInput.PropTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOneName: "",
      playerTwoName: "",
      playerOneImage: null,
      playerTwoImage: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(id, username) {
    this.setState(
      (function(id, username) {
        let newState = {};

        newState[id + "Name"] = username;
        newState[id + "Image"] =
          "https://github.com" + username + ".png?size=200";

        return newState;
      })(id, username)
    );
  }

  render() {
    let playerOneName = this.state.playerOneName;
    let playerTwoName = this.state.playerTwoName;
    return (
      <div>
        <div className="row">
          {!playerOneName && (
            <PlayerInput
              id="playerOne"
              label="Player One"
              onSubmit={this.handleSubmit}
            />
          )}
          {this.state.playerOneImage !== null && (
            <PlayerPreview
              avatar={this.state.playerOneImage}
              username={this.state.playerOneName}
            />
          )}
          {!playerTwoName && (
            <PlayerInput
              id="playerTwo"
              label="Player Two"
              onSubmit={this.handleSubmit}
            />
          )}
        </div>
      </div>
    );
  }
}
