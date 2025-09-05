import type { Schema, Struct } from '@strapi/strapi';

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    bgColorLowerSection: Schema.Attribute.String;
    bgColorUpperSection: Schema.Attribute.String;
    columns: Schema.Attribute.Component<'layout.footer-column', true>;
    gradientEnd: Schema.Attribute.String;
    gradientStart: Schema.Attribute.String;
    lowerContent: Schema.Attribute.Blocks;
  };
}

export interface LayoutFooterColumn extends Struct.ComponentSchema {
  collectionName: 'components_layout_footer_columns';
  info: {
    displayName: 'Footer-Column';
  };
  attributes: {
    links: Schema.Attribute.Component<'shared.link', true>;
    title: Schema.Attribute.String;
  };
}

export interface LayoutNavbar extends Struct.ComponentSchema {
  collectionName: 'components_layout_navbars';
  info: {
    displayName: 'Navbar';
  };
  attributes: {
    backgroundColor: Schema.Attribute.String;
    links: Schema.Attribute.Component<'shared.link', true>;
    logo: Schema.Attribute.Media<'images' | 'files'>;
    textColor: Schema.Attribute.String;
  };
}

export interface LayoutNotificationBanner extends Struct.ComponentSchema {
  collectionName: 'components_layout_notification_banners';
  info: {
    displayName: 'Notification-Banner';
  };
  attributes: {
    backgroundColor: Schema.Attribute.String;
    cta: Schema.Attribute.Component<'shared.link', false>;
    isEnabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.Blocks;
  };
}

export interface LayoutTheme extends Struct.ComponentSchema {
  collectionName: 'components_layout_themes';
  info: {
    displayName: 'Theme';
  };
  attributes: {
    onSurfaceColor: Schema.Attribute.String;
    primaryColor: Schema.Attribute.String;
    secondaryColor: Schema.Attribute.String;
    surfaceColor: Schema.Attribute.String;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    newTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'layout.footer': LayoutFooter;
      'layout.footer-column': LayoutFooterColumn;
      'layout.navbar': LayoutNavbar;
      'layout.notification-banner': LayoutNotificationBanner;
      'layout.theme': LayoutTheme;
      'shared.link': SharedLink;
    }
  }
}
