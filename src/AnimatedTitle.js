import React from 'react';
import './AnimatedTitle.css';

class AnimatedTitle extends React.Component {
  render() {
    return (
      <h1 className="animated-title">
        <div>
          <span className="original">Sound</span>
          <span className="less-dumb">Appear</span>
        </div>
        <div className="less">Less</div>
        <div>
          <span className="original">Dumb</span>
          <span className="less-dumb">Dopey</span>
        </div>
      </h1>
    )
  }
}

export default AnimatedTitle;
