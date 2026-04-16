/** Google Maps embed iframe URLs (centered on each address). */
export const CONTACT_GOOGLE_MAP_EMBEDS = {
  registered:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2964.876!2d21.3886799!3d42.005065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sVolgogradska%203%2C%20Karposh%2C%20Skopje!5e0!3m2!1sen!2smk!4v1!5m2!1sen!2smk",
  office:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2965!2d21.4220053!3d41.9991202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPartizanski%20Odredi%2018%20Skopje!5e0!3m2!1sen!2smk!4v1!5m2!1sen!2smk",
} as const;

/** Full Google Maps URLs for opening in a new tab / app (Maps URL search API). */
export const CONTACT_GOOGLE_MAPS_OPEN_URLS = {
  registered: "https://www.google.com/maps/search/?api=1&query=42.005065%2C21.3886799",
  office: "https://www.google.com/maps/search/?api=1&query=41.9991202%2C21.4220053",
} as const;
