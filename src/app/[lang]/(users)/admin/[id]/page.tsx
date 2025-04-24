// app/users/[id]/page.tsx
export default function UserPage({ params }: { params: { id: string } }) {
  return <div>Detalles del usuario #{params.id}</div>;
}
