const isProduction = process.env.NODE_ENV === "production";

export const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || (
  isProduction
    ? "http://genomas.cl"
    : "http://localhost:3000"
);

export const BASE_CLUSTER = process.env.NEXT_PUBLIC_API_CLUSTER_URL || (
  isProduction
    ? "http://localhost:8000"
    : "http://localhost:8000"
);
