import React from 'react';

const ChatroomMessage = ({userId,message}) => {
    return (
        <div key={userId} className="message">
              <span className={userId === message.userId ? "ownMessage" : "otherMessage"}>
                {message.name}:</span>{" "}{message.message}
        </div>
    )
}

export default ChatroomMessage;
