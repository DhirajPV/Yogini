import React, { Component } from 'react'
import Webcam from 'react-webcam'

export class processor extends Component {
    render() {
        return (
            <div>
            <Webcam mirrored='true' style={{height: 'auto', width:'auto'}} />
            </div>
        )
    }
}

export default processor
