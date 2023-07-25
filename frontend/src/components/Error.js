import React from "react";

const Message = ({ variant, children }) => {
  

  if (typeof children === "object") {
    return <div className={`alert ${variant}`}>{children.message}</div>;
  } else {
    return <div className={`alert ${variant}`}>{children}</div>;
  }
};

Message.defaultProps = {
  variant: "alert-light",
};

export default Message;
