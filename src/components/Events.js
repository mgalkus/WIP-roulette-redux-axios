import React from "react";
import { connect } from "react-redux";
import { nextGameApiAction, getResultApiAction } from "../actions/apiActions";
import { setLoading } from "../actions/actions";

class Events extends React.Component {
  componentDidMount() {
    setInterval(() => {
      this.props.nextGameApiAction();
    }, 1000);
  }

  componentDidUpdate() {
    // if (this.props.items[this.props.items.length - 1].timeLeft === 0) {
    //   this.props.setLoading();
    // } else
    if (this.props.items[this.props.items.length - 1].timeLeft === -1) {
      this.props.getResultApiAction();
    }
  }

  listRender = () => {
    return this.props.items.map(item => {
      if (!item.result) {
        return (
          <div key={item.id} className="item">
            <p>
              Game {item.id}
              {` will start in ` + item.timeLeft}
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
    return <div className="product-list-wrapper">{this.listRender()}</div>;
  }
}

const mapStateToProps = state => ({
  items: state.list
});

export default connect(mapStateToProps, {
  nextGameApiAction,
  getResultApiAction,
  setLoading
})(Events);
