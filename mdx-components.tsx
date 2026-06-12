import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="font-display text-4xl font-light text-obsidian">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 font-display text-2xl font-light text-obsidian">{children}</h2>
    ),
    p: ({ children }) => (
      <p className="mt-4 leading-relaxed text-graphite">{children}</p>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-champagne underline underline-offset-4">
        {children}
      </a>
    ),
    ...components,
  };
}
