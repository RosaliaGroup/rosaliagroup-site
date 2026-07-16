/** Shared shape for the translatable legal documents (Privacy Policy / Terms). */
export type LegalBlock =
  | { p: string }
  | { ul: string[] }
  | { strong: string };

export interface LegalSection {
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  title: string;
  intro: string;
  sections: LegalSection[];
}

export interface LegalPack {
  privacy: LegalDoc;
  terms: LegalDoc;
}

export type LegalDocId = keyof LegalPack;
