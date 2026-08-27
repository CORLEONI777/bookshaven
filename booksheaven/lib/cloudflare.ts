import { getCloudflareContext } from "@opennextjs/cloudflare";

export function getEnv(): CloudflareEnv | null {
  try {
    return getCloudflareContext().env as CloudflareEnv;
  } catch {
    return null;
  }
}
