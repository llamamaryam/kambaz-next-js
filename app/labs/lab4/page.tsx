"use client";

import Link from "next/link";
import { Provider } from "react-redux";
import ArrayStateVariable from "./ArrayStateVariable";
import BooleanStateVariables from "./BooleanStateVariables";
import ClickEvent from "./ClickEvent";
import Counter from "./Counter";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import ReduxExamples from "./redux/page";
import StringStateVariables from "./StringStateVariables";
import store from "./store";

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }

  return (
    <Provider store={store}>
      <div id="wd-passing-functions" className="mt-3">
        <h2>Lab 4</h2>
        <div className="mb-4">
          <h3>URL Encoding</h3>
          <ul>
            <li>
              <Link href="/labs/lab4/url-encoding/query-params?a=2&b=3">
                Query Calculator Example
              </Link>
            </li>
            <li>
              <Link href="/labs/lab4/redux">Redux Examples</Link>
            </li>
            <li>
              <Link href="/labs/lab4/react-context">React Context Examples</Link>
            </li>
            <li>
              <Link href="/labs/lab4/zustand">Zustand Examples</Link>
            </li>
          </ul>
        </div>
        <ClickEvent />
        <PassingDataOnEvent />
        <PassingFunctions theFunction={sayHello} />
        <Counter />
        <BooleanStateVariables />
        <StringStateVariables />
        <DateStateVariable />
        <ObjectStateVariable />
        <ArrayStateVariable />
        <ParentStateComponent />
        <ReduxExamples />
      </div>
    </Provider>
  );
}