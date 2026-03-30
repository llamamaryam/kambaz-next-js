"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import KambazNavigation from "./Navigation";
import store from "./store";
import Session from "./account/Session";
import EnrollmentsSession from "./enrollments/Session";
import "./styles.css";

export default function KambazLayout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <Session>
        <EnrollmentsSession>
          <div className="d-flex" id="wd-kambaz">
            <div>
              <KambazNavigation />
            </div>
            <div className="flex-fill wd-main-content-offset">{children}</div>
          </div>
        </EnrollmentsSession>
      </Session>
    </Provider>
  );
}