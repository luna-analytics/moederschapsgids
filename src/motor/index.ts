/**
 * Publieke motor-API voor de configuratielaag en tests. Bewust ZONDER de React-
 * componenten, zodat dit veilig in een node-omgeving (tests, site.config) te
 * importeren is. Componenten importeer je uit "@/motor/components".
 */
export * from "./contract";
export * from "./registry";
