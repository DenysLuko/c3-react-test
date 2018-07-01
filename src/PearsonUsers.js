import React, { Component } from "react";
import fetch from "node-fetch";
import PearsonUser from "./PearsonUser";

const USERS_ENDPOINT = process.env.USERS_ENDPOINT || "https://reqres.in/api/users";

export class PearsonUsers extends Component {
  constructor(props) {
    super(props);

    if ("AbortController" in window) {
      this.controller = new window.AbortController();
      this.signal = this.controller.signal;
    }
    else {
      this.controller = {
        abort: () => {}
      };
      this.signal = {};
    }

    this.state = {
      page: 1,
      perPage: 10,
      users: [
        {
          id: 4,
          first_name: "Eve",
          last_name: "Holt",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
        },
        {
          id: 5,
          first_name: "Charles",
          last_name: "Morris",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
        },
        {
          id: 6,
          first_name: "Tracey",
          last_name: "Ramos",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
        }
      ]
    };
  }

  componentDidMount = () => {
    const url = `${USERS_ENDPOINT}?page=${this.state.page}&per_page=${this.state.perPage}`;
    fetch(url, {signal: this.signal})
      .then((res) => {return res.json()})
      .then((json) => {
        this.setState({
          users: json.data
        });
      })
      .catch(console.warn);
  }

  componentWillUnmount = () => {
    this.controller.abort();
  }

  deleteUser = (deleteId) => () => {
    if (!deleteId || isNaN(deleteId) || !Array.isArray(this.state.users)) {
      throw new TypeError("First argument must be numeric");
    }

    const users = this.state.users.filter(user => user.id !== deleteId);

    this.setState({users});
  }

  dedupeUsers = (users) => {
    if (!Array.isArray(users)) {
      throw new TypeError("First argument must be an array");
    }

    const isInArray = {};

    const dedupedUsers = users.filter((user) => {
      if (isInArray[user.id]) {
        return false;
      }
      else {
        isInArray[user.id] = true;
        return true;
      }
    });

    this.setState({users: dedupedUsers});
  }

  render() {
    return (
      <div className="pearon-users">
        <h1 className="header">Pearson User Management</h1>
        {Array.isArray(this.state.users) && this.state.users.length &&
          <ul className="users-list">
            {this.state.users.map(({id, first_name, last_name, avatar}, index) => {
              return (
                <li className="users-list-item" key={index}>
                  <PearsonUser
                    id={id}
                    firstName={first_name}
                    lastName={last_name}
                    avatar={avatar}
                    deleteUser={this.deleteUser}
                  />
                </li>
              );
            })}
          </ul>
        }
      </div>
    );
  }
}
