// import { useMemo } from "react";

// type Scope = string; // O enum si tienes uno
// type User = { ... };
// type License = { ... };
// type Role = string;

// export function useHasScope(
//   user: User | null,
//   license: License | null,
//   role: Role | null
// ) {
//   const scopes = useMemo(() => {
//     if (!user || !license || !role) return [];
//     return getUserScopes(user, license, role);
//   }, [user, license, role]);

//   function has(scope: Scope) {
//     return scopes.includes(scope);
//   }

//   return { has, scopes };
// }
