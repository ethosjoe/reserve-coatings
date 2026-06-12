import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BeforeAfterSlider } from "@/components/sections/shared/BeforeAfterSlider";
import { CtaBand } from "@/components/layout/CtaBand";
import { Card } from "@/components/ui/card";
import { projects } from "@/data/projects";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return buildMetadata({
    title: project.title,
    description: `${project.finish} in ${project.city} — ${project.sqft} sq ft`,
    path: `/gallery/${project.slug}`,
  });
}

export default function GalleryDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <section className="bg-obsidian py-16 text-bone md:py-20">
        <div className="mx-auto max-w-content px-6">
          <p className="text-eyebrow">{project.city} · {project.sqft} sq ft</p>
          <h1 className="mt-4 font-display text-display-md text-bone">{project.title}</h1>
          <p className="mt-2 text-bone/70">{project.finish} · {project.date}</p>
        </div>
      </section>

      <section className="surface-warm py-12 md:py-16">
        <div className="mx-auto max-w-content px-6">
          <CompareSliderSection project={project} />
          {project.space && (
            <div className="mt-16 max-w-2xl">
              <h2 className="font-display text-display-sm text-obsidian">The Space</h2>
              <p className="mt-4 text-body text-graphite">{project.space}</p>
            </div>
          )}
          {project.approach && (
            <div className="mt-12 max-w-2xl">
              <h2 className="font-display text-display-sm text-obsidian">Our Approach</h2>
              <p className="mt-4 text-body text-graphite">{project.approach}</p>
            </div>
          )}
          {project.result && (
            <div className="mt-12 max-w-2xl">
              <h2 className="font-display text-display-sm text-obsidian">The Result</h2>
              <p className="mt-4 text-body text-graphite">{project.result}</p>
            </div>
          )}
          {project.testimonial && (
            <blockquote className="mt-12 border-l-2 border-champagne pl-6 font-display text-xl italic text-obsidian">
              {project.testimonial}
            </blockquote>
          )}
        </div>
      </section>

      <section className="surface-elevated py-12 md:py-16">
        <div className="mx-auto max-w-content px-6">
          <h2 className="font-display text-display-sm text-obsidian">Related projects</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Link key={p.slug} href={`/gallery/${p.slug}`} className="group block">
                <Card variant="elevated" size="none" interactive className="overflow-hidden">
                  <div className="relative aspect-video">
                    <Image
                      src={p.after}
                      alt={`After: ${p.title}`}
                      fill
                      className="object-cover transition-transform duration-base ease-luxury group-hover:scale-[1.03]"
                      sizes="400px"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-display text-lg text-obsidian group-hover:text-champagne">
                      {p.title}
                    </p>
                    <p className="text-sm text-smoke">{p.city}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand headline="Ready for your transformation?" />
    </>
  );
}

function CompareSliderSection({ project }: { project: (typeof projects)[0] }) {
  return (
    <BeforeAfterSlider
      before={project.before}
      after={project.after}
      alt={project.title}
    />
  );
}
