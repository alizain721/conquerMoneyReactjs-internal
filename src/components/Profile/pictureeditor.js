import React, { Component } from "react";
import "./pictureeditor.css";
import $ from 'jquery';
import AvatarEditor from 'react-avatar-editor'

class MyEditor extends React.Component {
  
  constructor(){
    super();
    this.state={
      picture: null,
      src: null,
      imageDestination:""
    }
  }
  sendData=()=>{this.props.pictureEditorData(this.state)
  console.log('tryyyyyyyyyyingggg')}
  
/*
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
  }*/
  
    setEditorRef = (editor) => this.editor = editor
    handleNewImage = (e) => {
      this.setState({ picture: e.target.files[0] })
    }
  
    handleSave = (data) => {
      const img = this.editor.getImageScaledToCanvas().toDataURL()
      const rect = this.editor.getCroppingRect()
  
      this.setState({
        src : img,
       
      })
    }

  render(){
    return(
      <div className='editorForm' > 
        <input
        name= "newImage"
        type='file'
        onChange={this.handleNewImage.bind(this)}
        />
        
       <AvatarEditor
        ref={this.setEditorRef}
        image={this.state.picture}
        width={250}
        height={250}
        border={30}
        borderRadius={100}
        color={[255, 255, 255, 0.6]} 
        scale={1.2}
        rotate={0}
      />
      <button
      onClick={()=>this.handleSave()}>
        Save
      </button>
      <img src={this.state.src}/>
    </div>
    )
  }
}
export default MyEditor