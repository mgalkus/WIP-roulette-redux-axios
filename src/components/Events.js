import React from "react";
import { connect } from "react-redux";
import { nextGameApiAction } from "../actions/apiActions";

class Events extends React.Component {
  componentDidMount() {
    setInterval(() => {
      this.props.nextGameApiAction();
    }, 1000);

    // this.props.apiAction();
    // let time = 1;
    // const interval = setInterval(() => {
    //   this.props.apiAction();
    //   if (time === 0) {
    //     clearInterval(interval);
    //   }
    //   time--;
    // }, 1000);
    // setTimeout(() => {}, 4000);
  }

  // componentDidUpdate() {
  //   console.log(this.props.items);
  //   if (this.props.items[this.props.items.length - 1].timeLeft === 0) {
  //     setTimeout(() => {
  //       this.props.getResultApiAction();
  //     }, 5000);
  //   }
  // }

  listRender = () => {
    return this.props.items.map(item => {
      if (!item.result) {
        return (
          <div key={item.id} className="item">
            <p>
              Game {item.id}
              {` will start in ` + item.timeLeft}
            </p>
            <p>{item.loadingMessage}</p>
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
  items: state
});

export default connect(mapStateToProps, {
  nextGameApiAction
})(Events);
