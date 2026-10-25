export type Certificate = {
  title: string;
  organization?: string;
  issuedDate?: string;
  credentialUrl?: string;
  imageUrl?: string;
  documentUrl?: string;
};

// Add verified credentials here. Keep this list empty until real details or files are available.
export const certificates: Certificate[] = [];
