import React from "react";
import "./email-addr.css";

class EmailAddr extends React.Component{
  render(){
    return(
      <span>
        {this.props.emailAddrs.map((email, i)=>{
         return (<span key={i}>
         		<span className="email-addr-style" key={email}>
         			<span className="email-addr">
	         			{email}
	         		</span>
         			<span className="close-button" onClick={()=>this.props.removeEmail(email,this.props.type)}>
         				x
         			</span>
         		</span>{" "}</span>
         		)
        })}
      </span>
    )
  }
}

export default EmailAddr;