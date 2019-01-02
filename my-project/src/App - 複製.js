import React, { Component } from 'react';
import styled from 'styled-components';
import pic from './pic.png';
import './App.css';



const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  cursor: pointer;
`;



class App extends Component {

  // 建構子，每個 class 第一次產生時都會執行到這邊
  constructor(props) {
    super(props); //若不执行super，则this无法初始化

    // // 這一行有點難解釋，想深入研究的麻煩自己查資料
    this.onClick = this.onClick.bind(this);
    // this.onClick = this.onClick.bind(this);
    // 設定 state
    this.state = {
      showMe: true,
      clickStartX: 0,
      clickStartY: 0,
      clickEndX: 0,
      clickEndY: 0,
      clickX: 0,
      clickY: 0,
      twoClick: 0,
      count: 0,
      moving: '',
      clickState: 1,
      distance: 0,
      circleR: 0,
      check: 0,
      circleCount: 0,
      coordinateX: [],
      coordinateY: [],
      table: []
    }
  }


  onClick(e) {
    console.log(e);
    console.log("MOUSE", e.clientX);
    console.log("MOUSE", e.clientY);
    this.setState({
      count: this.state.count + 1,
    });
    this.state.clickX = e.clientX;
    this.state.clickY = e.clientY;
    if (this.state.check === 0) {
      if (this.state.count % 2 === 0) {
        this.state.clickStartX = e.clientX;
        this.state.clickStartY = e.clientY;
        this.state.clickState = 0;
      } else {
        this.state.clickEndX = e.clientX;
        this.state.clickEndY = e.clientY;
        this.state.clickState = 1;
      }
    }
    console.log(this.state.clientStartX);

    if (this.state.showMe === false) {
      this.state.circleCount +=1;
      this.state.coordinateX.push(e.clientX);
      this.state.coordinateY.push(e.clientY);
      console.log('show circleCount', this.state.circleCount);
    }

    console.log("KEYS", Object.keys(e));
    console.log("VALUES", Object.values(e));


  }

  operation() {
    this.setState({
      showMe: !this.state.showMe
    })

    if (this.showMe === true) {
      console.log('還沒畫完');
      this.state.check = 0;
    } else {
      console.log('已畫完');
      this.state.distance = Math.sqrt(Math.pow(Math.abs(this.state.clientStartX - this.state.clientEndX), 2) + Math.pow(Math.abs(this.state.clientStartY - this.state.clientEndY), 2));
      this.state.circleR = this.state.distance * 6;
      this.state.check = 1;
    }
    console.log(this.state.clientStartX);
  }

  createTable = () => {
    for (let i = 0; i <= this.state.circleCount; i++) {
      this.state.table.push(
        <circle cx={this.state.coordinateX[i]} cy={this.state.coordinateY[i]} r={this.state.distance} fill="red" fillOpacity={0.4} />
      )
    }
    console.log('SSSS = ', this.state.circleCount);
    console.log('x=', this.state.coordinateX);
    console.log('y=', this.state.coordinateY);
    
    console.log('distance=', this.state.circleR);
    return this.state.table



  }

  render() {
    // 從 state 取出資料
    let clientStartX = this.state.clickStartX;
    let clientStartY = this.state.clickStartY;
    let clientEndX = this.state.clickEndX;
    let clientEndY = this.state.clickEndY;
    let distance = Math.sqrt(Math.pow(Math.abs(clientStartX - clientEndX), 2) + Math.pow(Math.abs(clientStartY - clientEndY), 2));

    // let circleR = distance *6 ;
    let circler = distance / 2;

    return (
      <div className="App" >

        <header className="App-header">
          <div style={{ flex: 0, flexDirection: 'row' }}  >

            <div>
              {
                this.state.showMe ?

                  <svg onClick={this.onClick}
                    width={window.width} height={900} viewBox="0 0 1900 900">  {/* viewbox可以做到縮放效果*/}
                    <g>
                      {/* {this.createTable()} */}
                      <path d={"M" + clientStartX + " " + clientStartY + " L" + clientEndX + " " + clientEndY} stroke="red" strokeWidth="3"></path>
                    </g>
                    {/* <g>< img src={pic} alt="golf" onClick={this.onClick} /></g> */}
                  </svg>

                  :
                  <svg onClick={this.onClick}
                    with={1900} height={900} viewBox="0 0 1900 900">  {/* viewbox可以做到縮放效果*/}
                    <g>
                      <circle cx={this.state.clickX} cy={this.state.clickY} r={circler} fill="red" fillOpacity={0.4} />
                      {this.createTable()}
                      {/* <path ={"M" + clientStartX[0] + " " + clientStartY[0] + " L" + clientEndX[0] + " " + clientEndY[0]} stroke="red" strokeWidth="3"></path> */}
                    </g>
                  </svg>
              }
            </div>
            <button onClick={() => this.operation()}>check</button>

            <p>{'STARTX = ' + clientStartX[0]} {'   STARTY = ' + clientStartY[0]}{'    ENDX = ' + clientEndX[0]}{'    ENDY = ' + clientEndY[0]}</p>
            <p>{'Count = ' + this.state.count}</p>
            <p>distance:{distance}   circleR:{circler}</p>
            {/* <HelloTitle content="比較大的字" style={{ 'font-size': 48 }} /> */}



          </div>
        </header>
      </div >
    );
  }
}

export default App;
