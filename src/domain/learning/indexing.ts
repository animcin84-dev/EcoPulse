export type IndexingPolicy = 'public' | 'private';

const privateExactPaths = new Set(['/start', '/review', '/pulse', '/settings']);
const privatePrefixes = ['/lesson', '/challenge', '/mission'];

function isRouteOrChild(pathname: string, route: string) {
  return pathname === route || pathname.startsWith(`${route}/`);
}

export function indexingPolicyForPath(pathname: string): IndexingPolicy {
  if (privateExactPaths.has(pathname)) return 'private';
  if (privatePrefixes.some((route) => isRouteOrChild(pathname, route))) return 'private';
  return 'public';
}
