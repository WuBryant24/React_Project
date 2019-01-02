import React from 'react';
import './App.css';


class Circle extends React.Component {

    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
        // 設定 state
        this.state = {
            points: {
                startX: null,
                startY: null,
            },
            distance: 20,
            circler: null,
            count: 0,
            translateX: 0,
            translateY: 0,
        };

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


    onClick(e) {

        console.log(e);
        if (this.state.points.startX) {

        } else {
            switch (this.state.distance) {
                case null:
                    break

                default:
                    this.setState({
                        points: {
                            startX: e.clientX,
                            startY: e.clientY,
                        },
                        count: 1
                    })
                    break
            }
        }
    }

    render() {
        // 從 state 取出資料
        let startX = this.state.points.startX;
        let startY = this.state.points.startY;
        let r = this.state.distance;
        // let {circler} = this.props;
        // const style = {
        //     backgroundColor: 'red',
        //     font: 'inherit',
        //     border: '1px solid blue',
        //     padding: '8px',
        //     cursor: 'pointer'
        // };

        return (
            <div>
                <svg width="100VW" height="100VH" onClick={this.onClick} >
                    {
                        this.state.points.startX != null
                            ?
                                < circle cx={startX} cy={startY} r={r} fill="red" fillOpacity={1} onMouseDown={e => this.onMouseDown(e)}
                                    style={{ transform: `translateX(${this.state.translateX}px)translateY(${this.state.translateY}px)` }} />
                                    
                            :
                            <text x="50" y="40" fill="#09c">START CIRCLE </text>
                    }
                </svg>
            </div >
        )
    }
}

export default Circle;