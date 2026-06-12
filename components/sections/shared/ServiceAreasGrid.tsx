import { serviceAreas } from "@/data/cities";

export function ServiceAreasGrid() {
  return (
    <section className="bg-bone py-20">
      <div className="mx-auto max-w-content px-6">
        <h2 className="font-display text-3xl font-light text-obsidian">Service areas</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {Object.entries(serviceAreas).map(([county, cities]) => (
            <div key={county} className="border-t border-champagne/30 pt-6">
              <h3 className="eyebrow-gold">{county} County</h3>
              <ul className="mt-4 space-y-2 text-sm text-graphite">
                {cities.map((city) => (
                  <li key={city}>{city}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
