import React, { Component } from 'react';
import Lottie from 'react-lottie';


class LocalLottie extends Component {

  constructor(props) {
      super(props);
  }

  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: this.props.animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return(
      <div>
      <Lottie options={defaultOptions}
              height={250}
              width={250}
        />
        </div>
    )
  }
}


export default LocalLottie;
