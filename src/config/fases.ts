import type { Fase } from "@/motor";

/**
 * De vijf fases van de reis, met hun label, korte intro en icoon. De iconen zijn
 * de losse fase-iconen uit brand/iconen (alleen hier en bovenaan categoriepagina's
 * gebruikt, nergens anders — brandbook). Volgorde = de reis zelf.
 */
export interface FaseMeta {
  key: Fase;
  label: string;
  intro: string;
  icoon: string;
}

export const fasesVolgorde: Fase[] = [
  "kinderwens",
  "zwangerschap",
  "bevalling",
  "postpartum",
  "moederschap",
];

export const faseMeta: Record<Fase, FaseMeta> = {
  kinderwens: {
    key: "kinderwens",
    label: "Kinderwens",
    intro: "De tijd vóór de zwangerschap: voorbereiding, rust en ruimte voor de wens.",
    icoon: "/iconen/fase-1-kinderwens.png",
  },
  zwangerschap: {
    key: "zwangerschap",
    label: "Zwangerschap",
    intro: "Negen maanden groei, met begeleiding voor lichaam en geest.",
    icoon: "/iconen/fase-2-zwangerschap.png",
  },
  bevalling: {
    key: "bevalling",
    label: "Bevalling",
    intro: "De geboorte zelf: voorbereiding en begeleiding rond die ene dag.",
    icoon: "/iconen/fase-3-bevalling.png",
  },
  postpartum: {
    key: "postpartum",
    label: "Postpartum",
    intro: "De eerste periode na de bevalling: herstel en hechting.",
    icoon: "/iconen/fase-4-postpartum.png",
  },
  moederschap: {
    key: "moederschap",
    label: "Moederschap",
    intro: "Opgroeien als moeder, samen met je kind, stap voor stap.",
    icoon: "/iconen/fase-5-moederschap.png",
  },
};
