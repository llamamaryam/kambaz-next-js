import type { ReactNode } from "react";
import KambazNavigation from "./Navigation";

export default function KambazLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td valign="top">
              <KambazNavigation />
            </td>
            <td valign="top">
              <div style={{ paddingLeft: 140, paddingTop: 16 }}>{children}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}