import { StoreTheme } from "@/actions/getTheme";

const GOOGLE_FONTS_BASE = "https://fonts.googleapis.com/css2?display=swap";

function buildFontUrl(fonts: string[]): string {
  const unique = [...new Set(fonts)].filter(Boolean);
  const params = unique
    .map((f) => `family=${f.replace(/\s+/g, "+")}:wght@300;400;500;600;700`)
    .join("&");
  return `${GOOGLE_FONTS_BASE}&${params}`;
}

/**
 * Server component that injects dynamic CSS custom properties
 * based on the store's theme configuration from the admin panel.
 */
export function ThemeInjector({ theme }: { theme: StoreTheme }) {
  const fontUrl = buildFontUrl([theme.fontFamily, theme.headingFont]);

  return (
    <>
      {/* Load Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link href={fontUrl} rel="stylesheet" />

      {/* Inject CSS custom properties */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            :root {
              --background: ${theme.backgroundColor};
              --foreground: ${theme.foregroundColor};
              --card: ${theme.cardColor};
              --card-foreground: ${theme.foregroundColor};
              --popover: ${theme.cardColor};
              --popover-foreground: ${theme.foregroundColor};
              --primary: ${theme.primaryColor};
              --primary-foreground: ${theme.backgroundColor};
              --secondary: ${theme.secondaryColor};
              --secondary-foreground: ${theme.foregroundColor};
              --muted: ${theme.mutedColor};
              --muted-foreground: ${theme.mutedForeground};
              --accent: ${theme.accentColor};
              --accent-foreground: ${theme.foregroundColor};
              --destructive: ${theme.destructiveColor};
              --destructive-foreground: ${theme.backgroundColor};
              --border: ${theme.borderColor};
              --input: ${theme.borderColor};
              --ring: ${theme.primaryColor};
              --radius: ${theme.borderRadius};
              --font-body: '${theme.fontFamily}', sans-serif;
              --font-heading: '${theme.headingFont}', sans-serif;
            }

            .dark {
              --background: ${theme.darkBackground};
              --foreground: ${theme.darkForeground};
              --card: ${theme.darkCard};
              --card-foreground: ${theme.darkForeground};
              --popover: ${theme.darkCard};
              --popover-foreground: ${theme.darkForeground};
              --primary: ${theme.darkPrimary};
              --primary-foreground: ${theme.darkBackground};
              --secondary: ${theme.darkSecondary};
              --secondary-foreground: ${theme.darkForeground};
              --muted: ${theme.darkMuted};
              --muted-foreground: ${theme.darkMutedFg};
              --accent: ${theme.darkAccent};
              --accent-foreground: ${theme.darkForeground};
              --destructive: ${theme.darkDestructive};
              --destructive-foreground: ${theme.darkForeground};
              --border: ${theme.darkBorder};
              --input: ${theme.darkBorder};
              --ring: ${theme.darkPrimary};
            }

            body {
              font-family: var(--font-body);
            }

            h1, h2, h3, h4, h5, h6 {
              font-family: var(--font-heading);
            }
          `,
        }}
      />
    </>
  );
}
