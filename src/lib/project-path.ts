/** Projects still in development keep the /projects/ URL; finished work lives under /films/. */
export const IN_DEVELOPMENT_IDS: readonly string[] = ["nothing-disappears"];

export function isInDevelopment(id: string) {
  return IN_DEVELOPMENT_IDS.includes(id);
}

export function projectPath(id: string) {
  return isInDevelopment(id) ? `/projects/${id}` : `/films/${id}`;
}
