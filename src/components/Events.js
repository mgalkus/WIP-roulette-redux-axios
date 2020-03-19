import React from "react";
import { connect } from "react-redux";
import { nextGameApiAction, getResultApiAction } from "../actions/apiActions";
import { decrementAction } from "../actions/actions";

class Events extends React.Component {
  // PROBLEMOS:
  // - nextGameTimer neideda naujo game'o (kaip ji vel saukti po to kai jis clearinamas componentDidUpdate, bet ir vel ji clearint veliau?)
  // - decrementAction eina i minusa ir nesiupdate'ina su nauju timeGlobal
  // - Nerodo rezultato

  // Defining how to call nextGameApiAction() every 1 sec:
  nextGameTimer = () =>
    setTimeout(() => {
      this.props.nextGameApiAction();
    }, this.props.timeGlobal * 1000);

  componentWillMount() {
    // Calling nextGameApiAction() again after time left runs out
    this.nextGameTimeoutID = this.nextGameTimer(); // cache the timeoutID

    // Decrementing every 1 sec
    const interval = setInterval(() => {
      this.props.decrementAction();
    }, 1000);
  }

  componentDidUpdate() {
    // Dont know why:
    clearTimeout(this.nextGameTimeoutID); // clear the timeoutID

    /// ??? Po pirmo run'o sitas setTimeout runnina gal kas sekunde ir vel updatina state'a, ir vel componentDidUpdate updatinasi, ir taip infinite loop:
    // setTimeout(() => {
    //   this.props.getResultApiAction();
    // }, this.props.timeGlobal * 1000);
  }

  listRender = () => {
    return this.props.items.map(item => {
      if (!item.result && !this.props.message) {
        return (
          <div key={item.id} className="item">
            <p>
              Game {item.id} will start in {this.props.timeGlobal}
            </p>
          </div>
        );
      } else if (!item.result && this.props.message) {
        return (
          <div key={item.id} className="item">
            <p>
              Game {item.id} {this.props.message}
            </p>
          </div>
        );
      } else {
        return (
          <div key={item.id} className="item">
            <p>
              Game {item.id}
              {` result ` + item.result}
            </p>
          </div>
        );
      }
    });
  };

  render() {
    return (
      <div>
        <div className="product-list-wrapper">{this.listRender()}</div>
        {/* <p>{this.props.timeGlobal}</p> */}
        <div id="output"></div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.list,
  message: state.loadgingMessage,
  timeGlobal: state.timeLeftGlobal
});

export default connect(mapStateToProps, {
  nextGameApiAction,
  decrementAction,
  getResultApiAction
})(Events);
