import React from "react";
import MailEditor from "./MailEditor";
import { Modal, Button } from 'react-bootstrap';
import "./App.css";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalIsOpen: true,
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
    this.showInputField = this.showInputField.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.updateMailContent = this.updateMailContent.bind(this);
    this.openModalWithContent=this.openModalWithContent.bind(this);
  }

  onInputChange(fieldName,e) {
    this.setState({[fieldName]:e.target.value});
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

  showInputField(fieldName){
    this.setState({[fieldName]:true})
  }

  updateMailContent(mailContent){
    this.setState({mailContent})
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
              <table>
                <tbody>
                  <tr>
                    <td>
                      <div>
                        <span class="grey-color-text">To</span>
                      </div>
                    </td>
                    <td id="toAddrTd">
                      <input className="email-editor-input"
                          type="text" onChange={(e)=>this.onInputChange("toAddr",e)}
                          value={this.state.toAddr} name="toAddr" id="toAddr" />
                      {
                        !this.state.showCc && !this.state.showBcc && 
                        <span class="grey-color-text" onClick={()=>this.showInputField("showCc")}>Cc</span>
                      }
                      {
                        !this.state.showCc && !this.state.showBcc && 
                        <span class="grey-color-text" onClick={()=>this.showInputField("showBcc")}>Bcc</span>
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {
              this.state.showCc &&
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <div>
                          <span class="grey-color-text">Cc</span>
                        </div>
                      </td>
                      <td id="toAddrTd">
                        <input type="text" value={this.state.ccAddr} name="cc" id="cc"
                          onChange={(e)=>this.onInputChange("ccAddr",e)}
                          className="email-editor-input"  />
                        { !this.state.showBcc && 
                          <span class="grey-color-text" onClick={()=>this.showInputField("showBcc")}>Bcc</span>
                        }
                        
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            }
            {
              this.state.showBcc && 
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <div>
                          <span class="grey-color-text">Bcc</span>
                        </div>
                      </td>
                      <td id="toAddrTd">
                          <input value={this.state.bccAddr} type="text" name="bcc"
                              onChange={(e)=>this.onInputChange("bccAddr",e)} id="bcc"
                              className="email-editor-input"/>
                        { !this.state.showCc &&  
                          <span class="grey-color-text" onClick={()=>this.showInputField("showCc")}>Cc</span>
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            }
            <div>
              <span>
                <input type="text" value={this.state.subject} id="subject"
                      placeholder="Subject"
                      onChange={(e)=>this.onInputChange("subject",e)} name="subject" />
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