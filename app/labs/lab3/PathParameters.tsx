import Link from "next/link";

export default function PathParameters() {
  return (
    <div>
      <h4>Path Parameters</h4>
      <ul>
        <li>
          <Link href="/labs/lab3/add/1/2">/labs/lab3/add/1/2</Link>
        </li>
        <li>
          <Link href="/labs/lab3/add/3/4">/labs/lab3/add/3/4</Link>
        </li>
      </ul>
    </div>
  );
}