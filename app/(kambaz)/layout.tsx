"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import KambazNavigation from "./Navigation";
import store from "./store";
import "./styles.css";

export default function KambazLayout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <div className="d-flex" id="wd-kambaz">
        <div>
          <KambazNavigation />
        </div>
        <div className="flex-fill wd-main-content-offset">{children}</div>
      </div>
    </Provider>
  );
}