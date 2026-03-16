type AddProps = {
  a: number;
  b: number;
};

export default function Add({ a, b }: AddProps) {
  return <div>{a} + {b} = {a + b}</div>;
}