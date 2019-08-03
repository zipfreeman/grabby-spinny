import React from "react";
import ReactDOM from "react-dom";

import { calcAngle, calcRotation } from "./rotation";
import "./styles.css";

class App extends React.Component {
  state = {
    drag: false,
    dragType: "touchmove",
    dragStartAngle: 0,
    skyAngle: 0,
    skyStartAngle: 0
  };

  getCoordType = evt => {
    return evt.type === "touchmove"
      ? [evt.touches[0].pageX, evt.touches[0].pageX]
      : [evt.pageX, evt.pageY];
  };

  onMouseStart = evt => {
    this.setState({
      drag: true,
      dragStartAngle: calcAngle(this.getCoordType(evt), [150, 150], "dragStart")
    });
  };

  onMouseEnd = evt => {
    this.setState({
      drag: false,
      skyStartAngle: this.state.skyAngle
    });
  };

  onDrag = evt => {
    let { drag, dragStartAngle, skyStartAngle } = this.state;
    if (drag)
      this.setState(
        {
          skyAngle:
            calcRotation({
              dragStartAngle,
              skyStartAngle,
              mousePos: this.getCoordType(evt)
            }) % 360
        },
        () => {
          document.getElementById("square").style.transform = `rotate(${
            this.state.skyAngle
          }deg)`;
        }
      );
  };

  render() {
    return (
      <div className="App">
        <div
          id="square"
          onMouseDown={this.onMouseStart}
          onMouseUp={this.onMouseEnd}
          onMouseMove={this.onDrag}
        >
          <div className="sun" />
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
