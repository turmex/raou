// TypeScript types for content.json structure

export interface SiteConfig {
    name: string;
    tagline: string;
    description: string;
    companyInfo: {
        fullName: string;
        locations: string[];
        email: string;
        phone: string;
    };
    social: {
        instagram: string;
        facebook: string;
        twitter: string;
    };
}

export interface MenuItem {
    label: string;
    path: string;
    hasDropdown?: boolean;
}

export interface NavigationConfig {
    logo: string;
    menuItems: MenuItem[];
    ctaButton: {
        label: string;
        path: string;
    };
}

export interface Destination {
    region: string;
    slug: string;
    countries: string[];
    countryLinks?: Record<string, string>; // Maps country name to URL
    image: string;
    description: string;
}

export interface Experience {
    title: string;
    slug: string;
    link?: string; // Computed as /experiences/{slug}
    icon: string;
    image: string;
    description: string;
    longDescription: string;
}

export interface ExperiencesConfig {
    who: Experience[];
    what: Experience[];
    remarkable: Experience[];
}

export interface HomeHero {
    image: string;
    subtitle: string;
    title: string;
    description: string;
    primaryCta: {
        label: string;
        path: string;
    };
    secondaryCta: {
        label: string;
        path: string;
    };
}

export interface HomeSection {
    title: string;
    subtitle: string;
}

export interface RemarkableItem {
    title: string;
    description: string;
    image: string;
}

export interface HomeConfig {
    hero: HomeHero;
    whosTraveling: HomeSection;
    featuredDestinations: HomeSection;
    whatCallsToYou: HomeSection;
    remarkableExperiences: {
        title: string;
        subtitle: string;
        items: RemarkableItem[];
    };
    whyRaou: {
        title: string;
        description: string;
        ctaLabel: string;
        ctaPath: string;
    };
    finalCta: {
        title: string;
        description: string;
        ctaLabel: string;
        ctaPath: string;
    };
}

export interface PhilosophyValue {
    title: string;
    description: string;
}

export interface AboutConfig {
    hero: {
        title: string;
        subtitle: string;
        image: string;
    };
    whatWereAbout: {
        title: string;
        paragraphs: string[];
    };
    philosophy: {
        title: string;
        subtitle: string;
        values: PhilosophyValue[];
    };
    whyChooseRaou: {
        title: string;
        items: {
            title: string;
            description: string;
        }[];
    };
    commitment: {
        title: string;
        paragraphs: string[];
    };
}

export interface Office {
    city: string;
    address: string;
    phone: string;
    email: string;
}

export interface ContactConfig {
    hero: {
        title: string;
        subtitle: string;
    };
    form: {
        title: string;
        fields: {
            name: string;
            email: string;
            phone: string;
            subject: string;
            message: string;
        };
        submitButton: string;
        successMessage: string;
    };
    officeInfo: {
        title: string;
        offices: Office[];
    };
}

export interface FooterLink {
    label: string;
    path: string;
}

export interface FooterSection {
    title: string;
    links: FooterLink[];
}

export interface FooterConfig {
    brandName: string;
    description: string;
    sections: FooterSection[];
    newsletter: {
        title: string;
        description: string;
        placeholder: string;
        buttonLabel: string;
    };
    copyright: string;
}

export interface FeatureRequest {
    id: string;
    type: string;
    title: string;
    description: string;
    priority: string;
    date: string;
}

export interface ContentConfig {
    site: SiteConfig;
    navigation: NavigationConfig;
    destinations: Destination[];
    experiences: ExperiencesConfig;
    home: HomeConfig;
    about: AboutConfig;
    contact: ContactConfig;
    footer: FooterConfig;
    featureRequests?: FeatureRequest[];
}
