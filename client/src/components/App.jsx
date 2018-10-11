import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: [],
    };
  }

  render() {
    const { initial } = this.state;

    return (
      <h1>
        App level component
        <div>{initial}</div>
      </h1>);
  }
}
