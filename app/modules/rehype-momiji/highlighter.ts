import {
  type BundledLanguage,
  type BundledTheme,
  type DynamicImportLanguageRegistration,
  type DynamicImportThemeRegistration,
  getSingletonHighlighter,
} from "shiki";

const getHighlighter = async ({
  themes,
  langs,
}: {
  themes: Record<BundledTheme, DynamicImportThemeRegistration>;
  langs: Record<BundledLanguage, DynamicImportLanguageRegistration>;
}) => {
  const newHighlighter = await getSingletonHighlighter({
    themes: [...Object.keys(themes)],
    langs: [...Object.keys(langs)],
  });
  return newHighlighter;
};

export { getHighlighter };
