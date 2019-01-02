import React from 'react';
import './App.css';
// import pic from './pic.png';
// import Circle from './circle';

class Line extends React.Component {

    constructor() {
        super();
        // // 這一行有點難解釋，想深入研究的麻煩自己查資料
        this.onClick = this.onClick.bind(this);
        // 設定 state
        this.state = {
            pointStart: {
                startX: null,
                startY: null,
            },
            pointEnd: {
                endX: null,
                endY: null
            },
            circler: null,
            count: 0,
            circlePoint: {
                X: null,
                Y: null
            }
        }
    }


    onClick(e) {
        switch (this.state.count) {
            case 0:
                this.setState({
                    pointStart: {
                        startX: e.clientX,
                        startY: e.clientY,
                    },
                    count: 1
                })
                break
            case 1:
                this.setState({
                    pointEnd: {
                        endX: e.clientX,
                        endY: e.clientY,
                    },
                    circler: Math.sqrt(Math.pow(Math.abs(this.state.pointEnd.endX - this.state.pointStart.startX), 2) + Math.pow(Math.abs(this.state.pointEnd.endY - this.state.pointStart.startY), 2)),
                    count: 2
                })
                break
            case 2:

                if (Math.abs(this.state.pointEnd.endX - e.clientX) < 20 & Math.abs(this.state.pointEnd.endY - e.clientY) < 20) {
                    // alert('Delet');
                    this.setState({
                        pointStart: {
                            startX: null,
                            startY: null,
                        },
                        pointEnd: {
                            endX: null,
                            endY: null,
                        },
                        count: 0
                    })
                } else {
                    alert('已超過上限');
                }

                break
            default:

        }
    }

    render() {
        // 從 state 取出資料
        let startX = this.state.pointStart.startX;
        let startY = this.state.pointStart.startY;
        let endX = this.state.pointEnd.endX;
        let endY = this.state.pointEnd.endY;
        let { data } = this.props;

        if ({ data } === true) {
            this.setState({

            })
        }

        // const style = {
        //     backgroundColor: 'red',
        //     font: 'inherit',
        //     border: '1px solid blue',
        //     padding: '8px',
        //     cursor: 'pointer'
        //   };

        return (
            <div>
                <svg width="100VW" height="100VH" viewBox="0 0 100VW 100VH" onClick={this.onClick} >
                    {
                        this.state.pointEnd.endY && this.state.pointStart.startX ?
                            <g>
                                < path d={"M " + startX + " " + startY + "L " + endX + " " + endY} stroke="black" strokeWidth="5" />
                                < circle cx={endX} cy={endY} r={10} fill="red" fillOpacity={1} />

                                {this.state.circler}
                                <text x="50" y="40" fill="#09c">r：{this.state.circler}  EndX：{this.state.pointEnd.endX} StartX：{this.state.pointStart.startX} EndY：{this.state.pointEnd.endY} StartY：{this.state.pointStart.startY}</text>


                            </g>

                            :
                            <text x="50" y="40" fill="#09c">START</text>

                    }
                </svg>

            </div >
        )
    }
}

export default Line;