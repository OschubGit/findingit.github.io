import React, { useState } from "react";
import Content from "./Content";
import Nav from "./Nav";
import gloablToken from "../gloablToken";

const Layout = () => {
  const [value, setValue] = useState("");
  const [user, setUser] = useState();

  const handleClick = (e) => {
    e.preventDefault()
    fetch(`https://api.github.com/users/${value}`,{
      method: "GET",
      headers: {Authorization: `token ${gloablToken}`}})
      .then((resp) => resp.json())
      .then((data) => {
        setUser(data);
    });

    setValue("")
  }

  return (
    <div className="app-container">
    <div className="nav">
      <Nav content={user && user}/>
    </div>
    <div className="header">
      <nav className="navbar is-transparent">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            {user && (
              <img
                src={user && user.avatar_url}
                alt="Bulma: a modern CSS framework based on Flexbox"
                width="{112}"
                height="{28}"
              />
            )}
            <h5 className="title is-5 mr-2">{user && user.name}</h5>
            {user && user.login}
          </a>
        </div>
        <div id="navbarExampleTransparentExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field is-grouped">
                <p className="control"></p>
                <div className="field has-addons">
                  <div className="control">
                    <form onSubmit={handleClick} style={{display: "flex"}}>
                    <input
                      className="input"
                      onChange={e => setValue(e.target.value.toLowerCase())}
                      value={value}
                      type="text"
                      placeholder="Find a repository"
                    />
                  <div className="control">
                    <button 
                      className="button is-info"
                      type="submit"
                      >
                        Buscar
                      </button>
                  </div>
                    </form>
                  </div>
                </div>
                <p/>
              </div>
            </div>
          </div>
        </div>
      </nav>
    <div className="content">
      <Content user={user} />
    </div>
    </div>
    </div>
  );
};

export default Layout;
