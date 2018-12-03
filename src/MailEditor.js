import React from "react";
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import "./mail-editor.css"

class MailEditor extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	      editorState: EditorState.createEmpty()
	    };
	    this.onEditorStateChange=this.onEditorStateChange.bind(this);
	}
	onEditorStateChange=(editorState) => {
		this.setState({editorState});
		this.props.updateMailContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
	};
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
					textAlign: { inDropdown: true },
					inline:{
						options: ['bold', 'italic', 'underline'],
					},
					list:{
						options: ['unordered', 'ordered']
					},
					fontSize:{
						options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
					}
				}
  				}
			/>
		)
	}
}

export default MailEditor;