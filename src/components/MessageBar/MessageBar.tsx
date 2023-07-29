import { useSelector } from "react-redux";
import { selectErrorMessage } from "../../store/slice";

import "./MessageBar.css";

const MessageBar = () => {
  const errorMessage = useSelector(selectErrorMessage);
  const classesList = ["content"];
  if (errorMessage.state === "Error") {
    classesList.push("ErrorStrip");
  } else if (errorMessage.state === "Success") {
    classesList.push("SuccessStrip");
  } else if (errorMessage.state === "Processing") {
    classesList.push("ProcessingStrip");
  }
  const className = classesList.join(" ");
  return (
    <div className="MessageBar">
      {errorMessage.message && (
        <div className={className}>
          <span>{errorMessage.message}</span>
        </div>
      )}
    </div>
  );
};

export default MessageBar;
