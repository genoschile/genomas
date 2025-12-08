# genomas

## Prisma Commands

### Aplica migraciones a la BD nueva (usando DATABASE_URL)
```bash
npx prisma migrate deploy
```

### Verifica estado de migraciones
```bash
npx prisma migrate status
```

### Regenera cliente Prisma
```bash
npm run prisma:generate
```

## ⚙️ Configuración Prisma 7

El proyecto usa Prisma 7 con el generador `prisma-client-js` para compatibilidad con Next.js.

**Nota**: Turbopack está deshabilitado por defecto debido a problemas de compatibilidad con Prisma 7. Se usa webpack estándar de Next.js.
