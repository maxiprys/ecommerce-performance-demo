import { NextResponse } from "next/server";
import { CATALOG_PAGE_SIZE } from "@/lib/catalog";
import { API } from "@/services/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const offset = Number.parseInt(searchParams.get("offset") || "0", 10);
  const limit = Number.parseInt(
    searchParams.get("limit") || String(CATALOG_PAGE_SIZE),
    10
  );
  const title = searchParams.get("title")?.trim() || undefined;

  const products = await API.getProducts({
    offset: Number.isFinite(offset) ? offset : 0,
    limit: Number.isFinite(limit) ? limit : CATALOG_PAGE_SIZE,
    title,
  });

  return NextResponse.json(products);
}
