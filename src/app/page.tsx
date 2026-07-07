import { SiteShell } from "@/components/SiteShell";
import { Hero, FaseBlokken, HoeHetWerkt } from "@/components/home";
import { ZorgverlenersOproep } from "@/components/ZorgverlenersOproep";
import { Nieuwsbrief } from "@/components/Nieuwsbrief";
import { getAllePlaatsen } from "@/lib/data/providers";
import { veiligeData } from "@/lib/data/veilig";

// Homepage. Plaatsen komen uit de database (voor de zoek-autocomplete). Revalideren
// zodat nieuwe plaatsen periodiek meekomen zonder herbouw.
export const revalidate = 3600;

export default async function Home() {
  const plaatsen = await veiligeData(getAllePlaatsen, [], "getAllePlaatsen (home)");

  return (
    <SiteShell>
      <Hero plaatsen={plaatsen} />
      <FaseBlokken />
      <HoeHetWerkt />
      <div className="border-t border-zand py-12">
        <ZorgverlenersOproep />
      </div>
      <section className="border-t border-zand py-12">
        <h2 className="font-display text-3xl text-antraciet">Blijf op de hoogte</h2>
        <p className="mt-3 max-w-xl font-body text-antraciet/90">
          Af en toe een bericht over nieuwe zorgverleners en de groei van de gids. Geen spam.
        </p>
        <div className="mt-6">
          <Nieuwsbrief />
        </div>
      </section>
    </SiteShell>
  );
}
