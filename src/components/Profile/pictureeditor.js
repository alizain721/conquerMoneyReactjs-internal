import React, { Component } from "react";
import "./pictureeditor.css";
import $ from 'jquery';
import AvatarEditor from 'react-avatar-editor'

class MyEditor extends React.Component {
  constructor(){
    super();
    this.state={
      picture: false,
      src: false,
      imageDestination:""
    }
  }


  handlePictureSelected(event) {
    var picture = event.target.files[0];
    var src     = URL.createObjectURL(picture);

    this.setState({
      picture: picture,
      src: src
    });
  }

  upload() {
    var formData = new FormData();

    formData.append("file", this.state.picture);

    $.ajax({
      url: "/some/api/endpoint",
      method: "POST",
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      success: function(response) {
        // Code to handle a succesful upload
      }
    });
  }
    onClickSave = () => {
      if (this.editor) {
        // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
        // drawn on another canvas, or added to the DOM.
        const canvas = this.editor.getImage()
  
        // If you want the image resized to the canvas size (also a HTMLCanvasElement)
        const canvasScaled = this.editor.getImageScaledToCanvas()
      }
    }
  
    setEditorRef = (editor) => this.editor = editor


  render(){
    return(
      <div>
        <input
        type='file'
        onChange={this.handlePictureSelected.bind(this)}
        />
       <button>
        DONE
       </button>
       <AvatarEditor
        ref={this.setEditorRef}
        image={this.state.picture}
        width={250}
        height={250}
        border={30}
        borderRadius={50}
        color={[255, 255, 255, 0.6]} 
        scale={1.2}
        rotate={0}
      />
      
      </div>
    )
  }
}
export default MyEditor