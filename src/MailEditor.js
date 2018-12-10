import React from "react";
import { EditorState, convertToRaw, ContentState, DefaultDraftBlockRenderMap, ContentBlock, genKey} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import "./mail-editor.css";
import htmlToDraft from 'html-to-draftjs';
import FileAttachment from "./FileAttachment";

var { Map, List } = require('immutable');

class MailEditor extends React.Component{
	constructor(props) {
	    super(props);
	    let template=this.props.mailTemplate || ""
	    let editorState=undefined;
	    if(template){
	    	const contentBlock = htmlToDraft(this.props.mailTemplate);
	    	if (contentBlock) {
      			const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      			editorState = EditorState.createWithContent(contentState);
      		}
	    }else{
	    	editorState = EditorState.createEmpty();
	    }
	    this.state = {
	    	editorState: editorState//,
	    	//uploadedImages: []
	    };
	    this.onAddFile=this.onAddFile.bind(this);
	    this.onEditorStateChange=this.onEditorStateChange.bind(this);
	    //this.uploadImageCallBack=this.uploadImageCallBack.bind(this);
	}
	onEditorStateChange=(editorState) => {
		this.setState({editorState});
		this.props.updateMailContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
	}
	onAddFile = () => {
		const editorState = EditorState.moveSelectionToEnd(this.state.editorState);
	    const selection = editorState.getSelection();
	    this.onEditorStateChange(addNewBlockAt(
	      this.state.editorState,
	      selection.getAnchorKey(),
	      'FileAttachment'
	    ))
	}
	/*uploadImageCallBack(file){
		let uploadedImages = this.state.uploadedImages;
    	const imageObject = {
	      file: file,
	      localSrc: URL.createObjectURL(file),
	    }
	    uploadedImages.push(imageObject);
	    this.setState({uploadedImages: uploadedImages})
	    return new Promise(
	      (resolve, reject) => {
	        resolve({ data: { link: imageObject.localSrc } });
	      }
	    )
	}*/
	render(){
		return(
			<Editor
				blockRenderMap={extendedBlockRenderMap}
				blockRendererFn={blockRendererFn}
				editorState={this.state.editorState}
				toolbarClassName="email-editor-toolbar"
				wrapperClassName="email-editor-wrapper"
				editorClassName="email-editor"
				onEditorStateChange={this.onEditorStateChange}
				toolbarCustomButtons={[<FileAttachmentButton onAddFile={this.onAddFile} />]}
				toolbar={{
					options: ['inline', 'fontSize', 'fontFamily',
								 'list', 'textAlign', 'colorPicker',
								 'link'/*, 'image'*/],
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
						className:"mail-editor-link",
						defaultTargetOption:'_blank',
						popupClassName:"mail-editor-link-popup",
						showOpenOptionOnHover:true
					}/*,
					image:{
						urlEnabled: true,
						uploadEnabled:true,
						uploadCallback:this.uploadImageCallBack,
						alignmentEnabled: true,
						defaultSize: {
							height: 'auto',
							width: 'auto',
					    }
					}*/
				}
  				}
			/>
		)
	}
}

function blockRendererFn(contentBlock) {
  const type = contentBlock.getType();
  if (type === 'FileAttachment') {
  	return {
      component: FileAttachment,
      editable: false,
      props: {
      	fileName:"fileName.txt",
      	size:"30k",
      	src:"http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png"
      }
    };
  }
}

const addNewBlockAt = (
  editorState,
  pivotBlockKey,
  newBlockType = 'unstyled',
  initialData = new Map({})
) => {
  const content = editorState.getCurrentContent();
  const blockMap = content.getBlockMap();
  const block = blockMap.get(pivotBlockKey);
  if (!block) {
    throw new Error(`The pivot key - ${ pivotBlockKey } is not present in blockMap.`);
  }

  const blocksBefore = blockMap.toSeq().takeUntil((v) => (v === block));
  const blocksAfter = blockMap.toSeq().skipUntil((v) => (v === block)).rest();
  const newBlockKey = genKey();

  const newBlock = new ContentBlock({
    key: newBlockKey,
    type: newBlockType,
    text: '',
    characterList: new List(),
    depth: 0,
    data: initialData,
  });

  const newBlockMap = blocksBefore.concat(
    [[pivotBlockKey, block], [newBlockKey, newBlock]],
    blocksAfter
  ).toOrderedMap();

  const selection = editorState.getSelection();

  const newContent = content.merge({
    blockMap: newBlockMap,
    selectionBefore: selection,
    selectionAfter: selection.merge({
      anchorKey: newBlockKey,
      anchorOffset: 0,
      focusKey: newBlockKey,
      focusOffset: 0,
      isBackward: false,
    }),
  });
  return EditorState.push(editorState, newContent, 'insert-fragment');
};

const RenderMap = new Map({
  FileAttachment: {
    element: 'article'
  }
}).merge(DefaultDraftBlockRenderMap);

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(RenderMap);

class FileAttachmentButton extends React.Component {
  constructor(props){
  	super(props);
  	this.onAddFile=this.onAddFile.bind(this);
  }

  onAddFile(){
  	this.props.onAddFile();
  }

  render() {
    return (
      <div className="rdw-storybook-custom-option" onClick={this.onAddFile}>F</div>
    );
  }
}

export default MailEditor;