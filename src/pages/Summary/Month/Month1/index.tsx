import React from 'react';

class Month1 extends React.Component {
  state = {};
  componentDidMount() {}

  render() {
    return (
      <div>
        Month1-呵呵1
        {this.props.children}
      </div>
    );
  }
}

export default Month1;
