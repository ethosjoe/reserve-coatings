/** Reserve Coatings marketing photography — local assets in /public/images */

const heroes = "/images/heroes";
const services = "/images/services";
const gallery = "/images/gallery";
const swatches = "/images/swatches";

export const VIDEOS = {
  heroHome: "/videos/hero-home.mp4",
  heroHomeMobile: "/videos/hero-home-mobile.mp4",
} as const;

export const IMAGES = {
  heroHome: `${heroes}/hero-home.jpg`,
  heroGarage: `${heroes}/hero-garage.jpg`,
  heroBasement: `${heroes}/hero-basement.jpg`,
  heroOutdoor: `${heroes}/hero-outdoor.jpg`,
  heroCommercial: `${heroes}/hero-commercial.jpg`,
  heroProcess: `${heroes}/hero-process.jpg`,
  heroColors: `${heroes}/hero-colors.jpg`,

  garage: `${services}/garage.jpg`,
  basement: `${services}/basement.jpg`,
  outdoor: `${services}/outdoor.jpg`,
  commercial: `${services}/commercial.jpg`,

  metallicPour: "/images/metallic-pour.jpg",
  /** Universal service-page footer CTA */
  footerCta: "/images/marketing/footer-cta.jpg",

  gallery: {
    garage: {
      before: `${gallery}/gallery-before-garage.jpg`,
      after: `${gallery}/gallery-after-garage.jpg`,
    },
    basement: {
      before: `${gallery}/gallery-before-basement.jpg`,
      after: `${gallery}/gallery-after-basement.jpg`,
    },
    outdoor: {
      before: `${gallery}/gallery-before-outdoor.jpg`,
      after: `${gallery}/gallery-after-outdoor.jpg`,
    },
    commercial: {
      before: `${gallery}/gallery-before-commercial.jpg`,
      after: `${gallery}/gallery-after-commercial.jpg`,
    },
  },

  /** Cycle swatch samples by tier for color catalog */
  swatchForTier: (tier: "standard" | "premium", index: number) => {
    const n = (index % 3) + 1;
    return `${swatches}/swatch-${tier}-0${n}.jpg`;
  },
} as const;
