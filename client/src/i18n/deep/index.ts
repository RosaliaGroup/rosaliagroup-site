/**
 * Per-language overrides for the deep content dictionary (see ../deep.ts).
 * Each locale file exports a `DeepPartial<Translations>` — it may override any
 * subset of the core + deep dictionaries. Anything omitted falls back to
 * English via `deepMerge` in getTranslation().
 *
 * Swahili (sw) and Haitian Creole (ht) additionally provide the CORE interface
 * strings here (they have no inline block in LanguageContext), so all 22
 * languages translate the general website interface.
 */
import type { DeepPartial } from "../deep";
import type { Translations } from "../../contexts/LanguageContext";

import { es } from "./es";
import { pt } from "./pt";
import { fr } from "./fr";
import { it } from "./it";
import { de } from "./de";
import { nl } from "./nl";
import { pl } from "./pl";
import { ru } from "./ru";
import { uk } from "./uk";
import { ar } from "./ar";
import { zh } from "./zh";
import { zhTW } from "./zh-TW";
import { ja } from "./ja";
import { ko } from "./ko";
import { hi } from "./hi";
import { bn } from "./bn";
import { tr } from "./tr";
import { vi } from "./vi";
import { tl } from "./tl";
import { sw } from "./sw";
import { ht } from "./ht";

export const DEEP: Record<string, DeepPartial<Translations>> = {
  es, pt, fr, it, de, nl, pl, ru, uk, ar,
  zh, "zh-TW": zhTW, ja, ko, hi, bn, tr, vi, tl,
  sw, ht,
};
