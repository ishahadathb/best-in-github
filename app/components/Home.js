import React from "react";
import apis from "../utils/api";

let UserPreview = props => {
  return (
    <ul>
      {props.data.map((user, index) => {
        return (
          <li key={index}>
            <img src={user.avatar_url} alt="" />
            {user.login}
          </li>
        );
      })}
    </ul>
  );
};

export default class InformationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      data: null
    };
    this.handleSub = this.handleSub.bind(this);
    this.handleChane = this.handleChane.bind(this);
  }

  handleSub(e) {
    e.preventDefault();

    apis.getTopUserBasedOnLocation(this.state.location).then(res => {
      console.log(res);
      this.setState({
        data: res
      });
    });
  }

  handleChane(e) {
    this.setState({
      location: e.target.value
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSub}>
          <div className="home-container">
            <h1>Find out top 10 github user from:</h1>
            <input
              type="text"
              placeholder="eg: Dhaka"
              value={this.state.location}
              onChange={this.handleChane}
            />
            <button className="button">Go</button>
          </div>
        </form>
        {this.state.data != null ? <UserPreview data={this.state.data} /> : ""}
      </div>
    );
  }
}
