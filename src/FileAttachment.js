import React from "react";

class FileAttachment extends React.Component {
  render() {
    return (
      <article className="list-attach-file">
        <div className="list-attach-file-block">
        <a href="www.google.com" target="_blank" contentEditable={false} readOnly>
          FileName.txt <span className="grey-text-color">(30k)</span>
        </a>
        </div>
      </article>
    );
  }
}

export default FileAttachment;