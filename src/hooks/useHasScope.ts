import { useMemo } from "react"

export function useHasScope(user, license, role) {
  const scopes = useMemo(() => {
    if (!user || !license || !role) return []
    return getUserScopes(user, license, role)
  }, [user, license, role])

  function has(scope: Scope | string) {
    return scopes.includes(scope)
  }

  return { has, scopes }
}
