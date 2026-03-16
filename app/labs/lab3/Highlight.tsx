import { ReactNode } from "react";

type HighlightProps = {
  children: ReactNode;
};

export default function Highlight({ children }: HighlightProps) {
  return <span style={{ backgroundColor: "yellow", padding: "2px 4px" }}>{children}</span>;
}