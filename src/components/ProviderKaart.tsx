"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

export interface KaartMarker {
  lat: number;
  lng: number;
  naam: string;
  live: boolean;
  href?: string | null;
}

/**
 * Leaflet-kaart met OpenStreetMap-tegels en clustering (geen Google Maps). Sage
 * markers voor live, grijs voor scraped. Leaflet wordt pas in de browser geladen
 * (dynamische import in het effect) zodat SSR nooit `window` raakt.
 */
export function ProviderKaart({
  markers,
  hoogte = 420,
}: {
  markers: KaartMarker[];
  hoogte?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let opgeruimd = false;
    // Bewaar de map-instantie voor cleanup.
    let mapInstantie: { remove: () => void } | null = null;

    (async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet.markercluster");
      if (opgeruimd || !containerRef.current) return;

      const map = L.map(containerRef.current, { scrollWheelZoom: false });
      mapInstantie = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap-bijdragers",
        maxZoom: 18,
      }).addTo(map);

      const kleur = (live: boolean) => (live ? "#8A9A7B" : "#B7AC98");
      const cluster = L.markerClusterGroup();

      for (const m of markers) {
        const icon = L.divIcon({
          className: "",
          html: `<span style="display:block;width:16px;height:16px;border-radius:9999px;background:${kleur(
            m.live,
          )};border:2px solid #F5F0E8;box-shadow:0 0 0 1px #3A342C33"></span>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });
        const marker = L.marker([m.lat, m.lng], { icon, title: m.naam });
        const popup = m.href
          ? `<a href="${m.href}" style="color:#A0502F;font-weight:600">${m.naam}</a>`
          : `<span>${m.naam}</span>`;
        marker.bindPopup(popup);
        cluster.addLayer(marker);
      }

      map.addLayer(cluster);

      if (markers.length > 0) {
        const bounds = L.latLngBounds(markers.map((m) => [m.lat, m.lng] as [number, number]));
        map.fitBounds(bounds.pad(0.2), { maxZoom: 13 });
      } else {
        map.setView([52.1, 5.1], 7); // Randstad
      }
    })();

    return () => {
      opgeruimd = true;
      if (mapInstantie) mapInstantie.remove();
    };
  }, [markers]);

  return (
    <div
      ref={containerRef}
      role="application"
      aria-label="Kaart met aanbieders"
      className="w-full overflow-hidden rounded-control border border-zand"
      style={{ height: hoogte }}
    />
  );
}
