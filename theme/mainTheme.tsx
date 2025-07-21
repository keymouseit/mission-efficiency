export function implementTheme(theme: { [x: string]: string | null }) {
  const root = document.documentElement;
  Object.keys(theme).forEach((cssColors) => {
    root.style.setProperty(cssColors, theme[cssColors]);
  });
}

export function createTheme({
  vast,
  significant,
  highToSignificant,
  high,
  moderateToHigh,
  moderate,
}: {
  vast: any;
  significant: any;
  highToSignificant: any;
  high: any;
  moderateToHigh: any;
  moderate: any;
}) {
  return {
    "--theme-map-vast": vast,
    "--theme-map-significant": significant,
    "--theme-map-highToSignificant": highToSignificant,
    "--theme-map-high": high,
    "--theme-map-moderateToHigh": moderateToHigh,
    "--theme-map-moderate": moderate,
  };
}
