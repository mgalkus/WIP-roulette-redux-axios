import React from "react";
import Events from "./Events";
import "./reset.css";

class App extends React.Component {
  render() {
    return (
      <div className="ui container grid">
        <div className="ui row">
          <div className="column eight wide">
            <Events />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
