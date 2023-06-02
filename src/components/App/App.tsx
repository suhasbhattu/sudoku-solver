import ActionToolbar from "../ActionToolbar";
import AppHeader from "../AppHeader";
import MessageBar from "../MessageBar";
import SudokuGrid from "../SudokuGrid";
import "./App.css";

const App = () => {
  return (
    <div className="SudokuSolver">
      <AppHeader />
      <SudokuGrid />
      <MessageBar />
      <ActionToolbar />
    </div>
  );
};

export default App;
