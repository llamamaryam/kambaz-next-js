import VariablesAndConstants from "./VariablesAndConstants";
import BooleansAndConditionals from "./BooleansAndConditionals";
import ArraysAndLoops from "./ArraysAndLoops";
import ArrayHelpers from "./ArrayHelpers";
import JsonAndObjects from "./JsonAndObjects";
import ToDoList from "./ToDoList";
import SpreadAndDestructuring from "./SpreadAndDestructuring";
import StyleDemo from "./StyleDemo";

export default function DemoIndex() {
  return (
    <div style={{ padding: 24 }}>
      <h1>JavaScript & React Demo Components</h1>
      <VariablesAndConstants />
      <BooleansAndConditionals />
      <ArraysAndLoops />
      <ArrayHelpers />
      <JsonAndObjects />
      <ToDoList />
      <SpreadAndDestructuring />
      <StyleDemo />
    </div>
  );
}
