import React, { Component } from 'react';
import pic from './pic.png';
import './App.css';
import ReactDOM from 'react-dom';
import Line from './line';
// import Circle from './circle';

class App extends Component {

  constructor() {
    super();

    this.onWheel = this.onWheel.bind(this);

    this.state = {
      data: true,
      ddata: 0,
      scale: 1,
      picwidth: 1080,
      picheight: 720,
      changeWidth: 1080,
      changeHeight: 720,
      translateX: 0,
      translateY: 0,
    }
    this.moving = false;
    this.lastX = null;
    this.lastY = null;
    window.onmouseup = e => this.onMouseUp(e);
    window.onmousemove = e => this.onMouseMove(e);
  }


  onMouseDown(e) {
    e.stopPropagation();
    this.moving = true;
  }

  onMouseUp() {
    this.moving = false;
    this.lastX = null;
    this.lastY = null;
  }

  onMouseMove(e) {
    this.moving && this.onMove(e);
  }

  onMove(e) {
    if (this.lastX && this.lastY) {
      let dx = e.clientX - this.lastX;
      let dy = e.clientY - this.lastY;
      this.setState({ translateX: this.state.translateX + dx, translateY: this.state.translateY + dy })
    }
    this.lastX = e.clientX;
    this.lastY = e.clientY;
  }


  onWheel(e) {
    this.setState({
      dataa: e.deltaY,
    })
    console.log(e)
    if (e.deltaY < 0) {

      if (this.state.scale < 3) {
        this.setState({
          scale: this.state.scale + 0.2,
          changeWidth: this.state.scale * this.state.picwidth,
          changeHeight: this.state.scale * this.state.picheight,
        })
      } else {
        this.setState({
          scale: 3,
          changeWidth: this.state.scale * this.state.picwidth,
          changeHeight: this.state.scale * this.state.picheight,
        })
      }
      console.log('放大')
    } else {

      if (this.state.scale > 1) {
        this.setState({
          scale: this.state.scale - 0.2,
          changeWidth: this.state.scale * this.state.picwidth,
          changeHeight: this.state.scale * this.state.picheight,
        })
      } else {
        this.setState({
          scale: 1,
          changeWidth: this.state.picwidth,
          changeHeight: this.state.picheight,
        })
      }

      console.log('縮小')
    }
  }

  render() {
    // let a = this.state.dataa;
    return (
      <div onClick={this.onClick} >
        <header className="App-header">
          <div onWheel={this.onWheel} >
            < img src={pic} width={this.state.changeWidth} height={this.state.changeHeight} alt="golf" onMouseDown={e => this.onMouseDown(e)}
              style={{ transform: `translateX(${this.state.translateX}px)translateY(${this.state.translateY}px)` }} />
            {/* <Line/> */}
            {/* <Circle /> */}

          </div>
        </header>
      </div >
    );
  }
}

ReactDOM.render(<Line/>, document.getElementById("root"));
export default App;
