export interface FooterData {
    companyInfo: {
      name: string;
      description: string;
    };
    quickLinks: {
      label: string;
      url: string;
    }[];
    socialMedia: {
      platform: string;
      url: string;
    }[];
  }
  