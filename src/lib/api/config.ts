export const BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
export const BASE_CLUSTER = process.env.NEXT_PUBLIC_API_CLUSTER_URL!;

if (process.env.NODE_ENV !== "production") {
  console.log("BASE API URL:", BASE);
}
