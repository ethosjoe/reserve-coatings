import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bone px-6 text-center">
      <h1 className="font-display text-5xl font-light text-obsidian">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-4 text-graphite">
        Try the instant quote tool or browse our services.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link href="/" className="btn-primary">Home</Link>
        <Link href="/quote" className="btn-secondary">Instant Quote</Link>
        <Link href="/garages" className="link-gold">Garages</Link>
        <Link href="/contact" className="link-gold">Contact</Link>
      </div>
    </div>
  );
}
