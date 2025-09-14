import ky from "ky";

// thank you cloudflare workers
export const baseKy = ky.create({
  prefixUrl: "https://cacheflare.grng.workers.dev/https",
});