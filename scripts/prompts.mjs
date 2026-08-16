/**
 * Zadania (prompty) pre AI generovanie fotiek na web Daviclean.
 *
 * Používa ich `scripts/generate-images.mjs`, ale dajú sa rovnako vložiť ručne
 * do Midjourney / ChatGPT / Gemini / Fluxu. Kľúč `name` = názov výsledného
 * súboru v /public/images (napr. `sluzby/tepovanie-matracov.jpg`).
 */

/** Spoločný štýlový základ — drží fotky v jednom vizuálnom jazyku značky. */
export const STYLE =
  "photorealistic commercial photography, professional cleaning technician wearing a plain black work polo shirt and black trousers, " +
  "dark moody interior, deep charcoal and near-black tones, strong electric blue accent light (#1f8bff) as rim light or equipment glow, " +
  "cinematic side lighting, shallow depth of field, 35mm lens, crisp detail on the cleaning equipment, " +
  "clean modern Slovak apartment or premises, no text, no logos, no watermark, no brand names, " +
  "hands and faces natural and anatomically correct, editorial quality, high resolution";

export const IMAGES = [
  {
    name: "hero",
    aspect: "4:5",
    prompt:
      "A cleaning technician deep-cleaning a light grey fabric sofa with a professional extraction cleaner wand, " +
      "visible clean stripe contrasting with the dirty part of the upholstery, modern dark living room in the background",
  },
  {
    name: "drawer",
    aspect: "16:10",
    prompt:
      "Two cleaning technicians in plain black work polos loading professional extraction equipment " +
      "into a dark van, early morning, urban Bratislava street, seen from a slight distance so faces are not the subject",
  },
  {
    name: "sluzby/tepovanie-gaucov-a-sedaciek",
    aspect: "16:10",
    prompt:
      "Close-up of an upholstery extraction wand pulling dirt from a grey corner sofa cushion, " +
      "half of the cushion visibly brighter and cleaner than the other half",
  },
  {
    name: "sluzby/tepovanie-matracov",
    aspect: "16:10",
    prompt:
      "Technician cleaning a white mattress in a dark bedroom with a professional upholstery extraction tool, " +
      "crisp white mattress against the dark room, blue accent light",
  },
  {
    name: "sluzby/cistenie-kobercov",
    aspect: "16:10",
    prompt:
      "Professional carpet extraction machine cleaning a beige carpet, clear contrast between the cleaned bright stripe " +
      "and the surrounding dull dirty carpet, dark room, low camera angle",
  },
  {
    name: "sluzby/cistenie-aut-interier",
    aspect: "16:10",
    prompt:
      "Car interior detailing — technician cleaning a black car seat with an extraction nozzle, " +
      "dark garage with blue LED lighting, water droplets and foam visible on the upholstery",
  },
  {
    name: "sluzby/odstranovanie-graffiti",
    aspect: "16:10",
    prompt:
      "Worker removing colourful graffiti from a concrete building wall with a hot pressure washer, " +
      "half of the wall already clean grey concrete, spray mist in the air, overcast urban setting",
  },
  {
    name: "sluzby/tlakove-cistenie-dlazby-a-fasad",
    aspect: "16:10",
    prompt:
      "Pressure washing dirty grey paving stones on a terrace, sharp clean stripe revealing the original colour " +
      "against the mossy dirty surface, water spray fan visible, low evening light",
  },
  {
    name: "sluzby/ozonovanie-odstranenie-zapachu",
    aspect: "16:10",
    prompt:
      "A professional ozone generator unit standing on the floor of an empty modern room, " +
      "soft blue glow from the device, faint haze in the air, dark minimal interior, no people",
  },
  {
    name: "sluzby/hlbkove-cistenie-kancelarii",
    aspect: "16:10",
    prompt:
      "Technician cleaning black office chairs in a modern empty open-plan office at night, " +
      "city lights through the windows, blue accent lighting, rows of desks",
  },
  {
    name: "sluzby/porealizacne-stavebne-cistenie",
    aspect: "16:10",
    prompt:
      "Post-construction cleaning of a newly renovated empty apartment, technician wiping fine construction dust " +
      "from a large window frame, bare concrete and plaster walls, bright daylight from the window, dark interior tones",
  },
];
