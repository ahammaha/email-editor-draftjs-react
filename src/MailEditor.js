import React from "react";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import "./mail-editor.css";
import htmlToDraft from 'html-to-draftjs';

class MailEditor extends React.Component{
	constructor(props) {
	    super(props);
	    if(this.props.createWithTemplate){
	    	const contentBlock = htmlToDraft(this.props.mailTemplate);
    		if (contentBlock) {
      			const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      			const editorState = EditorState.createWithContent(contentState);
      			this.state={
      				editorState:editorState,
      				uploadedImages: []
      			}
	    	}
	    } else {
	    	this.state = {
	      		editorState: EditorState.createEmpty(),
	      		uploadedImages: []
	    	};
	    }
	    this.onEditorStateChange=this.onEditorStateChange.bind(this);
	    this.uploadImageCallBack=this.uploadImageCallBack.bind(this);
	}
	onEditorStateChange=(editorState) => {
		this.setState({editorState});
		this.props.updateMailContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
	}
	uploadImageCallBack(file){
		// long story short, every time we upload an image, we
	    // need to save it to the state so we can get it's data
	    // later when we decide what to do with it.
	    // Make sure you have a uploadedImages: [] as your default state
    	let uploadedImages = this.state.uploadedImages;
    	const imageObject = {
	      file: file,
	      localSrc: URL.createObjectURL(file),
	    }
	    uploadedImages.push(imageObject);

	    this.setState({uploadedImages: uploadedImages})
	    
	    // We need to return a promise with the image src
	    // the img src we will use here will be what's needed
	    // to preview it in the browser. This will be different than what
	    // we will see in the index.md file we generate.
	    return new Promise(
	      (resolve, reject) => {
	        resolve({ data: { link: imageObject.localSrc } });
	      }
	    )
	}
	render(){
		return(
			<Editor
				//toolbarOnFocus
				editorState={this.state.editorState}
				toolbarClassName="email-editor-toolbar"
				wrapperClassName="email-editor-wrapper"
				editorClassName="email-editor"
				onEditorStateChange={this.onEditorStateChange}
				onChange=""
				toolbar={{
					options: ['inline', 'fontSize', 'fontFamily',
								 'list', 'textAlign', 'colorPicker',
								 'link', 'image'],
					textAlign: { 
						inDropdown: true,
						options: ['left', 'center', 'right'],
					},
					fontFamily: {
						options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
						dropdownClassName:'email-editor-font-family'
					},
					inline:{
						options: ['bold', 'italic', 'underline'],
					},
					list:{
						options: ['unordered', 'ordered']
					},
					fontSize:{
						options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
					},
					link:{
						defaultTargetOption:'_blank',
						popupClassName:"mail-editor-link"
					},
					image:{
						urlEnabled: true,
						uploadEnabled:true,
						uploadCallback:this.uploadImageCallBack,
						alignmentEnabled: true,
						defaultSize: {
							height: 'auto',
							width: 'auto',
					    }
					}
				}
  				}
			/>
		)
	}
}

export default MailEditor;