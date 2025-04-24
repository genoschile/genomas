// app/(modals)/users/[id]/page.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function UserModal({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{ background: 'white', padding: 20 }}>
        <h2>Usuario #{params.id}</h2>
        <p>Este es un modal con la info del usuario.</p>
        <button onClick={() => router.back()}>Cerrar</button>
      </div>
    </div>
  );
}
