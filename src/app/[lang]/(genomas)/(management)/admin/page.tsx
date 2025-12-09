import Link from "next/link";

export default function AdminOrganizationsPage() {
  return (
    <div>
      <h1>Organizations Management</h1>
      <p>Super Admin view - Manage all organizations</p>
      <div>
        <h2>Organizations</h2>
        {/* TODO: Fetch organizations from database */}
        <ul>
          <li>
            <Link href="/admin/organizations/1">Organization 1</Link>
          </li>
          <li>
            <Link href="/admin/organizations/2">Organization 2</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
