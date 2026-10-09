import "server-only";

// Alle externen Links an einer Stelle.
// Ohne die Zusätze, die die Apps beim Teilen anhängen (?xtok=…, ?s=cl&…):
// Sie dienen nur der Statistik und werden für den Link nicht gebraucht.
export const links = {
  whatsapp: "https://chat.whatsapp.com/K2uXIfxQP30FUi0H5tGD15",
  instagram: "https://www.instagram.com/augsburg.builders/",
  email: "hello@builder.community", // hello@ oder hallo@? Wartet auf Antwort von Johannes
} as const;
