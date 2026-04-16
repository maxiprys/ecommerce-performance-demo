import CollectionSubtitle from "@/components/CollectionSubtitle";
import { Button } from "@/components/ui/button";
import ProductCatalog from "@/features/products/components/ProductCatalog";
import { CATALOG_PAGE_SIZE } from "@/lib/catalog";
import { API } from "@/services/api";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const initialProducts = await API.getProducts({
    offset: 0,
    limit: CATALOG_PAGE_SIZE,
    title: query || undefined,
  });

  return (
    <div className="px-4 pb-20 sm:px-6">
      <section className="relative mt-6 overflow-hidden rounded-[2rem] border border-border/70 bg-card px-6 py-8 shadow-sm sm:px-10 sm:py-12 lg:px-14">
        <div className="bg-primary/8 absolute inset-y-0 right-0 hidden w-[32%] rounded-l-full blur-3xl lg:block" aria-hidden />
        <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-end">
          <div className="max-w-3xl space-y-6">
            <div className="flex flex-wrap gap-2">
              <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-[11px] font-medium tracking-[0.22em] uppercase">
                Curated catalog
              </span>
              <span className="text-muted-foreground rounded-full border border-border/70 px-3 py-1 text-[11px] tracking-[0.18em] uppercase">
                Performance-first
              </span>
            </div>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Pieces selected for a calmer, more refined shopping flow.
              </h1>
              <p className="text-muted-foreground max-w-2xl text-base leading-7 sm:text-lg">
                Explore a streamlined collection with fast product discovery,
                lightweight navigation, and a polished presentation designed to
                feel premium from first glance to checkout.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="px-6">
                <Link href={query ? `/?q=${encodeURIComponent(query)}` : "#catalog"}>
                  Shop the collection
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="px-6">
                <Link href="/checkout">View checkout flow</Link>
              </Button>
            </div>
            <CollectionSubtitle />
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-[1.75rem] border border-border/70 bg-background/80 p-5 shadow-sm">
              <p className="text-muted-foreground text-[11px] tracking-[0.22em] uppercase">
                Signature finish
              </p>
              <p className="mt-3 text-2xl">Neutral tones, soft surfaces, and calm spacing.</p>
            </div>
            <div className="rounded-[1.75rem] border border-border/70 bg-secondary/65 p-5 shadow-sm">
              <p className="text-muted-foreground text-[11px] tracking-[0.22em] uppercase">
                Built to browse
              </p>
              <p className="mt-3 text-2xl">Search instantly and reveal more products as you scroll.</p>
            </div>
            <div className="rounded-[1.75rem] border border-border/70 bg-background/90 p-5 shadow-sm">
              <p className="text-muted-foreground text-[11px] tracking-[0.22em] uppercase">
                Checkout feel
              </p>
              <p className="mt-3 text-2xl">A clean transaction flow that matches the storefront.</p>
            </div>
          </div>
        </div>
      </section>

      <ProductCatalog
        initialProducts={initialProducts}
        initialQuery={query}
      />
    </div>
  );
}
