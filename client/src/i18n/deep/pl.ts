import type { DeepPartial } from "../deep";
import type { Translations } from "../../contexts/LanguageContext";

// Populated by translation pass. Missing keys fall back to English via deepMerge.
export const pl: DeepPartial<Translations> = {};
