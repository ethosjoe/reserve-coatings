import Image from "next/image";
import Link from "next/link";
import { PageTitleBar } from "@/components/layout/PageTitleBar";
import { PAGE_INTROS } from "@/lib/copy";
import { blogPosts } from "@/data/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Journal",
  description: "Notes from the field — garages, basements, material science, and Metro Detroit installs.",
  path: "/blog",
});

export default function BlogPage() {
  const featured = blogPosts[0];

  return (
    <>
      <PageTitleBar
        eyebrow={PAGE_INTROS.blog.eyebrow ?? "Journal"}
        title="Notes from the field"
        subtitle={PAGE_INTROS.blog.subtitle}
      />
      <section className="bg-bone py-16">
        <div className="mx-auto grid max-w-content gap-12 px-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Link href={`/blog/${featured.slug}`} className="group block overflow-hidden rounded-sm border border-hairline bg-white">
              <div className="relative aspect-[21/9]">
                <Image src={featured.image} alt="" fill className="object-cover" sizes="800px" />
              </div>
              <div className="p-8">
                <p className="eyebrow">{featured.category}</p>
                <h2 className="mt-2 font-display text-3xl font-light text-obsidian group-hover:text-champagne">
                  {featured.title}
                </h2>
                <p className="mt-4 text-graphite">{featured.excerpt}</p>
              </div>
            </Link>
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {blogPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="border border-hairline bg-white p-6 hover:border-champagne/60">
                  <p className="eyebrow text-[10px]">{post.category}</p>
                  <h3 className="mt-2 font-display text-xl text-obsidian">{post.title}</h3>
                  <p className="mt-2 text-sm text-smoke">{post.date}</p>
                </Link>
              ))}
            </div>
          </div>
          <aside className="space-y-6">
            <div className="rounded-sm border border-hairline bg-obsidian p-6 text-bone">
              <p className="font-display text-xl">Get your number in a minute.</p>
              <Link href="/quote" className="btn-primary mt-4 inline-flex w-full justify-center">
                INSTANT QUOTE
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
