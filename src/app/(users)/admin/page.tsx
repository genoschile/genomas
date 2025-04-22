import Link from "next/link";

export default function page() {
  return (
    <div>
      <h1>Lista de usuarios</h1>
      <ul>
        <li>
          <Link href="/users/1">Usuario 1</Link>
        </li>
        <li>
          <Link href="/users/2">Usuario 2</Link>
        </li>
      </ul>
    </div>
  );
}
