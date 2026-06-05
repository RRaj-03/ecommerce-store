const URL = `${process.env.NEXT_PUBLIC_API_URL}/theme`;

export interface StoreTheme {
  preset: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  foregroundColor: string;
  mutedColor: string;
  mutedForeground: string;
  borderColor: string;
  cardColor: string;
  destructiveColor: string;
  darkPrimary: string;
  darkSecondary: string;
  darkAccent: string;
  darkBackground: string;
  darkForeground: string;
  darkMuted: string;
  darkMutedFg: string;
  darkBorder: string;
  darkCard: string;
  darkDestructive: string;
  fontFamily: string;
  headingFont: string;
  borderRadius: string;
  navbarStyle: string;
  footerStyle: string;
  productCardStyle: string;
}

const getTheme = async (): Promise<StoreTheme> => {
  try {
    const res = await fetch(URL, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch theme");
    return res.json();
  } catch (error) {
    // Return defaults if fetch fails
    return {
      preset: "default",
      primaryColor: "222.2 47.4% 11.2%",
      secondaryColor: "210 40% 96.1%",
      accentColor: "210 40% 96.1%",
      backgroundColor: "0 0% 100%",
      foregroundColor: "222.2 84% 4.9%",
      mutedColor: "210 40% 96.1%",
      mutedForeground: "215.4 16.3% 46.9%",
      borderColor: "214.3 31.8% 91.4%",
      cardColor: "0 0% 100%",
      destructiveColor: "0 84.2% 60.2%",
      darkPrimary: "210 40% 98%",
      darkSecondary: "217.2 32.6% 17.5%",
      darkAccent: "217.2 32.6% 17.5%",
      darkBackground: "222.2 84% 4.9%",
      darkForeground: "210 40% 98%",
      darkMuted: "217.2 32.6% 17.5%",
      darkMutedFg: "215 20.2% 65.1%",
      darkBorder: "217.2 32.6% 17.5%",
      darkCard: "222.2 84% 4.9%",
      darkDestructive: "0 62.8% 30.6%",
      fontFamily: "Inter",
      headingFont: "Inter",
      borderRadius: "0.5rem",
      navbarStyle: "default",
      footerStyle: "default",
      productCardStyle: "default",
    };
  }
};

export default getTheme;
