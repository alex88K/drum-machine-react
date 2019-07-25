import React from "react";

class Controls extends React.Component {
  constructor() {
    super();

    this.displayRef = React.createRef();
    this.handleVolume = this.handleVolume.bind(this);
  }

  handleVolume(e) {
    let { power } = this.props;

    if (power) {
      this.props.changeVolume(e.target.value);
    }
  }

  componentDidUpdate() {
    const displayNode = this.displayRef.current;
    displayNode.classList.remove("animate");

    if (displayNode.scrollWidth > displayNode.clientWidth) {
      displayNode.innerHTML = `<div>${displayNode.innerText}</div>`;
      displayNode.children[0].classList.add("animate");
    }
  }

  render() {
    let { power, bank, display, volume } = this.props;
    let powerClass = power ? "on" : "";
    let bankClass = bank ? "on" : "";

    return (
      <div className="controls">
        <div className="select-wrap">
          <div
            id="power"
            className={"select-power select " + powerClass}
            onClick={() => this.props.powerTrigger()}
          />
          <span>Power</span>
        </div>
        <div id="display" ref={this.displayRef}>
          {display}
        </div>
        <div className="volume-slider-wrap">
          <input
            type="range"
            id="volume-slider"
            name="volume"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={this.handleVolume}
          />
          <label htmlFor="volume">VOLUME</label>
        </div>
        <div className="select-wrap">
          <div
            id="bank-switch"
            className={"select select-bank " + bankClass}
            onClick={e => this.props.bankTrigger(e.target)}
          />
          <span>Bank</span>
        </div>
      </div>
    );
  }
}

export default Controls;
