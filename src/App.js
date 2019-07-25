import React from "react";
import PadBank from "./components/padBank";
import Controls from "./components/controls";
import audios from "./audio_links";

import "./App.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      power: false,
      bank: 0,
      volume: 0.3,
      display: ""
    };

    this.playSound = this.playSound.bind(this);
    this.powerTrigger = this.powerTrigger.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.bankTrigger = this.bankTrigger.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  powerTrigger() {
    let { power, bank } = this.state;
    let displayLabel = power === false ? Object.keys(audios[bank])[0] : "";

    this.setState({
      power: !power,
      display: displayLabel
    });
  }

  bankTrigger() {
    let { power } = this.state;

    if (power) {
      let bank = this.state.bank === 1 ? 0 : 1;
      let bankLabel = Object.keys(audios[bank])[0];

      this.setState({
        bank: bank,
        display: bankLabel
      });
    }
  }

  playSound(e, keyPress = false) {
    let { power, volume } = this.state;
    let audioLabel = "";

    if (power) {
      let el = keyPress === true && e !== null ? e : e.target;
      let audioEl = el.children[0];

      audioEl.currentTime = 0;
      audioEl.volume = volume;
      audioEl.play();
      audioLabel = el.id;

      el.classList.add("active");

      setTimeout(() => {
        el.classList.remove("active");
      }, 150);

      this.setState({
        display: audioLabel.replace(/-/g, " ")
      });
    }
  }

  changeVolume(volume) {
    let volumeLabel = parseFloat(volume) * 100;

    if (volumeLabel === 0) {
      volumeLabel = "MIN";
    } else if (volumeLabel === 100) {
      volumeLabel = "MAX";
    }

    this.setState({
      volume: volume,
      display: volumeLabel
    });
  }

  handleKeyDown(e) {
    let key = e.key.toUpperCase();
    let el = document.getElementById(key);

    if (el) {
      let drumPad = el.parentNode;
      this.playSound(drumPad, true);
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown");
  }

  render() {
    let { power, bank, display, volume } = this.state;

    return (
      <div className="app" id="drum-machine">
        <PadBank bank={bank} audios={audios} onStartSound={this.playSound} />
        <Controls
          power={power}
          bank={bank}
          powerTrigger={this.powerTrigger}
          changeVolume={this.changeVolume}
          bankTrigger={this.bankTrigger}
          display={display}
          volume={volume}
        />
      </div>
    );
  }
}

export default App;
