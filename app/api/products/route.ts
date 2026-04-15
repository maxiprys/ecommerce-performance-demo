import { NextResponse } from "next/server";
import { CATALOG_PAGE_SIZE } from "@/lib/catalog";
import { products } from "@/lib/products"; // 👈 tu data mock

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const offset = Number.parseInt(searchParams.get("offset") || "0", 10);
  const limit = Number.parseInt(
    searchParams.get("limit") || String(CATALOG_PAGE_SIZE),
    10
  );

  const search = searchParams.get("search")?.toLowerCase() || "";

  // Delay to simulate
  await new Promise((res) => setTimeout(res, 500));

  let filtered = products;

  if (search) {
    filtered = filtered.filter((p) => p.title.toLowerCase().includes(search));
  }

  const paginated = filtered.slice(offset, offset + limit);

  return NextResponse.json(paginated);
}
