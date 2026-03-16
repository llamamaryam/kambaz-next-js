import { ReactNode } from "react";
import AccountNavigation from "./Navigation";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="d-flex gap-3 p-3" id="wd-account-layout">
      <AccountNavigation />
      <div className="flex-fill">{children}</div>
    </div>
  );
}