import React from "react";
class MessageList extends React.Component {
    render() {
        
        return (
            <ul className="message-list">
                {this.props.messages.map((message, index) => {
                    return (
                   //   <li key={message.id} className={message.senderId == "Server"? {message.id== 0? } : "message-right" }>
                   <li key={message.id} className={` ${message.senderId=="Server"? "message": "message-right"} ${(message.id ==0 && message.senderId=="user")? "message-first": ""} ` }>

                        <div>{message.senderId}</div>
                        <div>{message.text}</div>
                      </li>
                    )
                })}
            </ul>
        );
    }
}
export default MessageList;