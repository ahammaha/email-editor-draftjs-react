import React from "react";
import MailEditor from "./MailEditor";
import { Modal, Button } from 'react-bootstrap';
import "./App.css";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalIsOpen: false,
      showCc:false, 
      showBcc:false,
      toAddr:"",
      ccAddr:"",
      bccAddr:"",
      mailContent:"",
      subject:"",
      openWithTemplate:false,
      mailTemplate:"<p>Dear <span style='background-color: rgb(209,213,216);'>&lt;Recipient&gt;</span>,</p><p>Please find the <a href='http://google.com' target='_blank'>link</a>  over here.</p><p></p><p>Thanks and regards,</p><p><span style='background-color: rgb(209,213,216);'>&lt;Sender's name&gt;</span></p>"
    };
    this.showCcInput = this.showCcInput.bind(this);
    this.showBccInput = this.showBccInput.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.toAddrChange = this.toAddrChange.bind(this);
    this.ccAddrChange = this.ccAddrChange.bind(this);
    this.bccAddrChange = this.bccAddrChange.bind(this);
    this.subjectChange = this.subjectChange.bind(this);
    this.updateMailContent = this.updateMailContent.bind(this);
    this.openModalWithContent=this.openModalWithContent.bind(this);
  }

  toAddrChange(e) {
    this.setState({toAddr:e.target.value});
  }

  ccAddrChange(e) {
    this.setState({ccAddr:e.target.value});
  }

  bccAddrChange(e) {
    this.setState({bccAddr:e.target.value});
  }

  subjectChange(e) {
    this.setState({subject:e.target.value});
  }

  sendEmail() {
    console.log("==========================================");
    console.log(this.state.toAddr);
    console.log(this.state.ccAddr);
    console.log(this.state.bccAddr);
    console.log(this.state.subject);
    console.log(this.state.mailContent);
    console.log("==========================================");
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  closeModal() {
    this.setState({
      modalIsOpen: false,
      showCc:false,
      showBcc:false,
      openWithTemplate:false});
  }
  showCcInput() {
    this.setState({showCc:true})
  }
  showBccInput() {
    this.setState({showBcc:true})
  }

  updateMailContent(val){
    this.setState({mailContent:val})
  }

  openModalWithContent(){
    this.setState({modalIsOpen:true,openWithTemplate:true})
  }

  render(){
    return(
      <div>
        <Button bsStyle="primary" onClick={this.openModal}>
          Create Email
        </Button>
        <hr />
        <Button bsStyle="primary" onClick={this.openModalWithContent}>
          Create Email with template
        </Button>
        <Modal show={this.state.modalIsOpen} backdrop="static"
                onHide={this.closeModal} dialogClassName="create-email">
          <Modal.Header closeButton>
            <Modal.Title>New Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <span>
                <label htmlFor="toAddr">To</label>
                <input 
                  type="text" onChange={this.toAddrChange}
                  value={this.state.toAddr} name="toAddr" id="toAddr" />
              </span>
              {
                !this.state.showCc && !this.state.showBcc && 
                <span onClick={this.showCcInput}>Cc</span>
              }
              {
                !this.state.showCc && !this.state.showBcc && 
                <span onClick={this.showBccInput}>Bcc</span>
              }
            </div>
            {
              this.state.showCc && 
              <div>
                <label htmlFor="cc">Cc</label>
                <input type="text" value={this.state.ccAddr} onChange={this.ccAddrChange}
                       name="cc" id="cc" />
                { !this.state.showBcc && 
                  <span onClick={this.showBccInput}>Bcc</span>
                }
              </div>
            }
            {
              this.state.showBcc && 
              <div>
                <label htmlFor="bcc">bcc</label>
                <input value={this.state.bccAddr} onChange={this.bccAddrChange}
                      type="text" name="bcc" id="bcc" />
                { !this.state.showCc && 
                  <span onClick={this.showCcInput}>Cc</span>
                }
              </div>
            }
            <div>
              <span>
                <label htmlFor="subject">Subject</label>
                <input type="text" value={this.state.subject} id="subject"
                      onChange={this.subjectChange} name="subject" />
              </span>
            </div>
            { !this.state.openWithTemplate &&
              <MailEditor updateMailContent={this.updateMailContent} createWithTemplate={false} />
            }
            { this.state.openWithTemplate &&
              <MailEditor updateMailContent={this.updateMailContent} createWithTemplate={true} mailTemplate={this.state.mailTemplate} />
            }
          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.sendEmail}>Send</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
export default App;