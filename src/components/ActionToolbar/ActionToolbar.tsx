import { useDispatch } from "react-redux";
import { resetGrid } from "../../store/slice";

import "./ActionToolbar.css";

const ActionToolbar = () => {
    const dispatch = useDispatch();

  const onResetPress = () => {
    dispatch(resetGrid());
  };

  return <div className="ActionToolbar">
    <button className="ActionToolbar-button">Solve</button>
    <button className="ActionToolbar-button" onClick={onResetPress}>Reset</button>
  </div>;
};

export default ActionToolbar;
