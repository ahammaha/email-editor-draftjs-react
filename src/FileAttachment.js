import React from "react";

class FileAttachment extends React.Component {
  render() {
    return (
      <article className="list-attach-file">
        <div className="list-attach-file-block">
        <a href={this.props.blockProps.src} target="_blank" contentEditable={false} readOnly>
          {this.props.blockProps.fileName} 
          <span className="grey-text-color">({this.props.blockProps.size})</span>
        </a>
        </div>
      </article>
    );
  }
}

export default FileAttachment;