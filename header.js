import React from 'react';
import ReactDOM from 'react-dom';

export default class Header extends React.Component {

  constructor(){
    super();
    this.state = {
      title : 'Simple Chat Application'
    };
  }

  render(){
    return(
      <p className="header">{this.state.title}</p>
    );
  }
}
