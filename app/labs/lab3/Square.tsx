import { ReactNode } from "react";

type SquareProps = {
  children: ReactNode;
};

export default function Square({ children }: SquareProps) {
  const value = Number(children);
  return (
    <div>
      Square of {value} = {value * value}
    </div>
  );
}