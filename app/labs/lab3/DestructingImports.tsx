import MathObject, { add, subtract } from "./Math";
import * as MathNamespace from "./Math";

export default function DestructingImports() {
  return (
    <div>
      <h4>Destructing Imports</h4>
      <div>Default import multiply: {MathObject.multiply(2, 3)}</div>
      <div>Namespace import divide: {MathNamespace.divide(8, 2)}</div>
      <div>Named imports add/subtract: {add(1, 2)} / {subtract(5, 3)}</div>
    </div>
  );
}