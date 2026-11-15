export type Certificate = {
  title: string;
  organization?: string;
  issuedDate?: string;
  credentialUrl?: string;
  imageUrl?: string;
  documentUrl?: string;
};

// Credential names and verification links transcribed from Kshitij's supplied resume.
export const certificates: Certificate[] = [
  { title: 'Generative AI', organization: 'TCS iON', documentUrl: 'https://drive.google.com/file/d/1ZSaHVdyJn0HMY0t_QNqh3Hd4tUDvGUlN/view?usp=drivesdk' },
  { title: 'AI Foundation', organization: 'TCS iON', documentUrl: 'https://drive.google.com/file/d/1WXcRdut2NV4cH_m8WNyrqa-2uaV_ovsz/view?usp=drivesdk' },
  { title: 'Jaro Education', organization: 'Jaro Education', documentUrl: 'https://drive.google.com/file/d/11ox4fyvBR7GAFk5jLuvYv9lGECjkI_3N/view?usp=drivesdk' },
  { title: 'VaultofCodes', organization: 'VaultofCodes', documentUrl: 'https://drive.google.com/file/d/1G6BXeV53iXHKynQvX6mqWv5si4zwzd4V/view?usp=drivesdk' },
  { title: 'Machine Learning', organization: 'AWS', credentialUrl: 'https://www.credly.com/badges/151c4dc7-d311-4793-a5ea-57e39b0152ed/whatsapp' },
  { title: 'Generative AI', organization: 'AWS', credentialUrl: 'https://www.credly.com/badges/e42f2518-854a-45ae-8499-7fa262eb6afd/whatsapp' },
];
