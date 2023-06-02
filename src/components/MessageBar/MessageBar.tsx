import { useSelector } from "react-redux";
import { selectErrorMessage } from "../../store/slice";

import "./MessageBar.css";

const MessageBar = () => {
  const errorMessage = useSelector(selectErrorMessage);
  const classesList = [];
  if (errorMessage.isError) {
    classesList.push("ErrorStrip");
  }
  const className = classesList.join(" ");
  return (
    <div className="MessageBar">
      <span className={className}>
        {errorMessage.isError ? errorMessage.message : ""}
      </span>
    </div>
  );
};

export default MessageBar;
