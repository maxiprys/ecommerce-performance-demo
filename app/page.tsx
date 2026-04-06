import CollectionSubtitle from "@/components/CollectionSubtitle";
import ProductCatalog from "@/features/products/components/ProductCatalog";
import { CATALOG_PAGE_SIZE } from "@/lib/catalog";
import { API } from "@/services/api";

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
    <div className="px-4 pb-16 sm:px-6">
      <section className="mt-6 from-muted/60 to-background relative overflow-hidden rounded-2xl border bg-linear-to-br px-6 py-12 sm:px-10 sm:py-16">
        <div className="relative z-10 max-w-2xl space-y-4">
          <p className="text-primary text-sm font-medium tracking-wide uppercase">
            Curated catalog
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Pieces that load as you explore
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Search the Platzi Fake Store catalog, browse in pages, and open the
            cart when you are ready — built for smoother rendering and less work
            up front.
          </p>
          <CollectionSubtitle />
        </div>
      </section>

      <ProductCatalog initialProducts={initialProducts} initialQuery={query} />
    </div>
  );
}
