import React, { Component } from "react";
import { TwitterPicker } from "react-color";
import reactCSS from "reactcss";
import Particles from 'react-particles-js'; 

import "./App.css";

class App extends Component {
  static defaultProps = {
    ucapan: [
      "Whatever happens, keep breathing",
    "Pam pam pararam ceklek jedar\nPararam ram parararam ram",
    "Hey! I wuv chuuuu! UwU",
    "I love you.",
    "I may not with you everyday, but I love you everyday.",
    "I love you.",
    "I'm sorry for loving you.",
    ],
    panggilan: [
      'Beb',
      'Beib',
      'Sayang',
      'Jijaku'
    ]
  }
  
  constructor(props) {
    super(props);
    this.state = {
      bgcolor: "#ff6900",
      displayColorPicker: false,
      text: '',
      isDeleting: false,
      loopNum: 0,
      typingSpeed: 150
    };
  }

  componentDidMount() {
    //localStorage.setItem('bgcolor', '#333');
    //localStorage.getItem('bgcolor')
    //localStorage.getItem('bgcolor') == '#000' ? console.log('hitam') : null
    this.mengetik();
    this.setState({
      panggilan: this.props.panggilan[Math.floor(Math.random() * 
      this.props.panggilan.length)]})
    this.getwaktu();
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChangeComplete = (color) => {
    //console.log(color.hex);
    //localStorage.setItem('bgcolor', color.hex);
    this.setState({ bgcolor: color.hex });
  };

  getwaktu = () => {
    setInterval( () => {
      var greeting;
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds
      if (hours >= 18) {greeting = 'Evening'}
      elseif (hours >= 15) {greeting = 'Afternoon'}
      elseif (hours >= 11) {greeting = 'Day'}
      elseif (hours >= 5) {greeting = 'Morning'}
      elseif (hours >= 0) {greeting = 'Night'}
      this.setState({
        curdate : hours + ':' + min + ':' + sec,
        greeting : greeting
      })
    },1000)
  }

  mengetik = () => {
    const { ucapan } = this.props;
    const { isDeleting, loopNum, text, typingSpeed } = this.state;
    const i = loopNum % ucapan.length;
    const fullText = ucapan[i];

    this.setState({
      text: isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1),
      typingSpeed: isDeleting ? 30 : 150
    });

    if (!isDeleting && text === fullText) {
      
      setTimeout(() => this.setState({ isDeleting: true }), 500);
      
    } else if (isDeleting && text === '') {
      
      this.setState({
        isDeleting: false,
        loopNum: loopNum + 1
      });
      
    }

    setTimeout(this.mengetik, typingSpeed);
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          width: "36px",
          height: "14px",
          borderRadius: "2px",
          //background: `${localStorage.getItem('bgcolor')}`,
          background: `${this.state.bgcolor}`,
        },
        swatch: {
          padding: "5px",
          background: "#fff",
          borderRadius: "1px",
          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          display: "inline-block",
          cursor: "pointer",
        },
        popover: {
          position: "absolute",
          zIndex: "2",
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
      },
    });

    return (
      <div
        className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column"
        style={{
          //backgroundColor: localStorage.getItem("bgcolor"),
          backgroundColor: this.state.bgcolor,
          transition: "all .7s ease",
          WebkitTransition: "all .7s ease",
          MozTransition: "all .7s ease"
        }}
      >
        <header className="masthead mb-auto">
          <nav className="navbar navbar-expand-md navbar-dark fixed-top">
            <div className="navbar-brand">
              <div style={styles.swatch} onClick={this.handleClick}>
                <div style={styles.color} />
              </div>
              {this.state.displayColorPicker ? (
                <div style={styles.popover}>
                  <div style={styles.cover} onClick={this.handleClose} />
                  <TwitterPicker
                    //color={this.state.color}
                    onChange={this.handleChangeComplete}
                    triangle={"hide"}
                    colors={[
                      "#FF6900",
                      "#FCB900",
                      "#7BDCB5",
                      "#00D084",
                      "#8ED1FC",
                      "#0693E3",
                      "#ABB8C3",
                      "#EB144C",
                      "#F78DA7",
                      "#000",
                    ]}
                  />
                </div>
              ) : null}
            </div>
          </nav>
        </header>

        <main role="main" className="inner">
        {this.state.bgcolor == '#000000' 
        ? 
        <div><h1>I Love You {this.state.panggilan}</h1></div> 
        : 
        <div>
        <h1>{this.state.curdate}</h1>
          <h2>Good {this.state.greeting} {this.state.panggilan}</h2>
        <h3>{ this.state.text }<span id="cursor"/></h3>
        </div>
        }
        </main>
        <footer className="mastfoot mt-auto">
          <div className="inner">
            
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
