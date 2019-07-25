import React from "react";

function PadBank({ bank, audios, onStartSound }) {
  return (
    <div className="pad-bank">
      {Object.values(audios[bank])[0].map((audio, index) => {
        return (
          <button
            type="button"
            key={audio.keyTrigger}
            className="drum-pad"
            id={audio.id}
            onMouseDown={onStartSound}
          >
            {audio.keyTrigger}
            <audio src={audio.url} className="clip" id={audio.keyTrigger} />
          </button>
        );
      })}
    </div>
  );
}

export default PadBank;
