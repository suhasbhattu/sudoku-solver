import { useDispatch, useSelector } from "react-redux";
import { resetGrid, selectErrorMessage } from "../../store/slice";

import "./ActionToolbar.css";

const ActionToolbar = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectErrorMessage);

  const onResetPress = () => {
    dispatch(resetGrid());
  };

  return (
    <div className="ActionToolbar">
      <button className="ActionToolbar-button" disabled={errorMessage.isError}>
        Solve
      </button>
      <button className="ActionToolbar-button" onClick={onResetPress}>
        Reset
      </button>
    </div>
  );
};

export default ActionToolbar;
