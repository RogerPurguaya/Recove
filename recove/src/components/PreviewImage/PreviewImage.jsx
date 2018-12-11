import React, { Component } from "react";

const styles = {
    imgPreview:{
        textAlign: 'center',
        margin: '0px',
        height: '250px',
        width: '100%'
    },
    img: {
        width: '100%',
        height: '100%'
    },
    previewText: {
        width: '100%',
        marginTop: '20px'
    }
}

export default class PreviewImage extends Component {
    constructor(props) {
      super(props);
      this.state = {file: ''};
    }
  
    render() {
      let imagePreviewUrl = this.props.imagePreviewUrl;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img height="250px" width="400px" src={imagePreviewUrl} alt="not found" />);
      } else {
        $imagePreview = (<div className="previewText" style={styles.previewText}>Por favor escoja una imagen para su publicación </div>);
      }

      return (
        <div className="previewComponent">
          <div className="imgPreview" style={styles.imgPreview}>
            {$imagePreview}
          </div>
        </div>
      )
    }
  }
    