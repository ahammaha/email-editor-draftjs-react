import React from "react";
import MailEditor from "./MailEditor";
import { Modal, Button } from 'react-bootstrap';
import "./App.css";
import EmailAddr from "./EmailAddr";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      toAddrValues:[],
      ccAddrValues:[],
      bccAddrValues:[],
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
    this.keyPress = this.keyPress.bind(this);
    this.removeEmail=this.removeEmail.bind(this);
  }

  removeEmail(email,type){
    let fieldName=type+"AddrValues";
    this.setState({[fieldName]: this.state[fieldName].filter(function(val) { 
        return email!=val
    })});
  }

  keyPress(fieldName,inputField,e){
    if(e.keyCode===13){
      let email=this.state[inputField].trim();
      if(email.length>0){
        this.setState({
          [fieldName]:[...this.state[fieldName],this.state[inputField]],
          [inputField]:""
        })
      }
    }
  }

  onInputChange(fieldName,e) {
    this.setState({[fieldName]:e.target.value.trim()});
  }

  sendEmail() {
    console.log("==========================================");
    console.log(this.state.toAddrValues);
    console.log(this.state.ccAddrValues);
    console.log(this.state.bccAddrValues);
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
                        <span className="grey-color-text">To</span>
                      </div>
                    </td>
                    <td id="toAddrTd">
                      <EmailAddr type="to" removeEmail={this.removeEmail} 
                          emailAddrs={this.state.toAddrValues} />
                      <input className="email-editor-input"
                          onKeyUp={(e)=>this.keyPress("toAddrValues","toAddr",e)}
                          type="text" onChange={(e)=>this.onInputChange("toAddr",e)}
                          value={this.state.toAddr} name="toAddr" id="toAddr" />
                      {
                        !this.state.showCc && !this.state.showBcc && 
                        <span className="grey-color-text" onClick={()=>this.showInputField("showCc")}>Cc</span>
                      }
                      {
                        !this.state.showCc && !this.state.showBcc && 
                        <span className="grey-color-text" onClick={()=>this.showInputField("showBcc")}>Bcc</span>
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
                          <span className="grey-color-text">Cc</span>
                        </div>
                      </td>
                      <td id="toAddrTd">
                        <EmailAddr type="cc" removeEmail={this.removeEmail} 
                            emailAddrs={this.state.ccAddrValues} />
                        <input type="text" value={this.state.ccAddr} name="cc" id="cc"
                          onKeyUp={(e)=>this.keyPress("ccAddrValues","ccAddr",e)}
                          onChange={(e)=>this.onInputChange("ccAddr",e)}
                          className="email-editor-input"  />
                        { !this.state.showBcc && 
                          <span className="grey-color-text" onClick={()=>this.showInputField("showBcc")}>Bcc</span>
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
                          <span className="grey-color-text">Bcc</span>
                        </div>
                      </td>
                      <td id="toAddrTd">
                        <EmailAddr type="bcc" removeEmail={this.removeEmail} 
                            emailAddrs={this.state.bccAddrValues} />
                        <input value={this.state.bccAddr} type="text" name="bcc"
                              onKeyUp={(e)=>this.keyPress("bccAddrValues","bccAddr",e)}
                              onChange={(e)=>this.onInputChange("bccAddr",e)} id="bcc"
                              className="email-editor-input"/>
                        { !this.state.showCc &&  
                          <span className="grey-color-text" onClick={()=>this.showInputField("showCc")}>Cc</span>
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