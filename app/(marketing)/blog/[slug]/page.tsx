import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog";
import { buildMetadata } from "@/lib/seo";
import BlogPost from "@/content/blog/polyurea-vs-epoxy-michigan-garages.mdx";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return buildMetadata({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}` });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <>
      <section className="relative min-h-[32vh] overflow-hidden md:min-h-[40vh]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/40 to-obsidian/20" />
        <div className="relative mx-auto flex min-h-[32vh] max-w-2xl flex-col justify-end px-6 pb-10 pt-24 md:min-h-[40vh] md:pb-12">
          <p className="text-eyebrow">{post.category} · {post.date}</p>
          <h1 className="mt-4 font-display text-display-md text-bone text-balance">{post.title}</h1>
        </div>
      </section>
      <article className="surface-warm py-12 md:py-16">
        <div className="mx-auto max-w-2xl px-6">
          <div className="prose prose-neutral max-w-none">
            <BlogPost />
          </div>
          <div className="mt-16 rounded-xl border border-white/10 bg-obsidian p-6 text-center text-bone md:p-8">
            <p className="font-display text-xl">Get your instant estimate</p>
            <Link href="/quote" className="btn-primary mt-4 inline-flex min-h-[48px]">
              TRY THE QUOTE TOOL
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
