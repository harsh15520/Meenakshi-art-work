/**
 * Type declarations for CSS and CSS module imports.
 *
 * Next.js processes `.css` / `.module.css` imports at build time, but the
 * TypeScript language server needs explicit declarations to avoid ts(2882)
 * "Cannot find module or type declarations" errors in the editor.
 */
declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}