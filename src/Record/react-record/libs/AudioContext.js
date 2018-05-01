const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();

const AudioContext  = {

  getAudioContext() {
    console.log('sam rate ', audioCtx)
    return audioCtx;
  },

  getAnalyser() {
    return analyser;
  },

}

export default AudioContext;