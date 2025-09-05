// types/global.d.ts
export type Link = { label: string; url: string; newTab?: boolean };

export type Navbar = {
  backgroundColor?: string;
  textColor?: string;
  links?: Link[];
  logo?: { data?: { attributes?: { url?: string; alternativeText?: string } } };
};

export type FooterColumn = { title?: string; links?: Link[] };

export type Footer = {
  bgColorUpperSection?: string;
  bgColorLowerSection?: string;
  lowerContent?: string | any; // blocks or html
  gradientStart?: string;
  gradientEnd?: string;
  columns?: FooterColumn[];
};

export type Banner = {
  isEnabled?: boolean;
  backgroundColor?: string;
  text?: string | any; // blocks or html
  cta?: Link;
};

export type Theme = {
  primaryColor?: string;
  secondaryColor?: string;
  surfaceColor?: string;
  onSurfaceColor?: string;
};

export type GlobalAttrs = {
  navbar?: Navbar;
  footer?: Footer;
  notificationBanner?: Banner;
  theme?: Theme;
};

export type GlobalResponse = { data?: { id: number; attributes?: GlobalAttrs } };

// Home type
export type HomeResponse = {
  data?: { id: number; attributes?: { carousel?: { data?: { attributes?: { url: string; alternativeText?: string } }[] } } };
};
