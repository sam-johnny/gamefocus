import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À propos — qui sommes-nous ?",
  description:
    "NeonActu est un blog indépendant dédié à l'actualité des jeux vidéo. Découvrez notre ligne éditoriale, nos sources et notre équipe.",
  alternates: { canonical: "/a-propos/" },
};

export default function About() {
  return (
    <div className="container about-page">
      <p className="hero-kicker">Qui sommes-nous ?</p>
      <h1 className="about-title">À propos de NeonActu</h1>

      <div className="prose about-prose">
        <p>
          <strong>NeonActu</strong> est un blog indépendant né d'une conviction
          simple : l'actualité jeux vidéo mérite mieux que du clicbait. Nous
          couvrons les jeux qui comptent vraiment pour les joueurs, avec des
          articles vérifiés, sourcés et mis à jour.
        </p>
        <h2>Notre ligne éditoriale</h2>
        <ul>
          <li>
            <strong>Vérifier avant de publier.</strong> Rumeurs et fuites sont
            toujours signalées comme telles, jamais présentées comme des faits.
          </li>
          <li>
            <strong>Aller à l'essentiel.</strong> Chaque article s'ouvre sur un
            résumé actionnable, pour les pressés comme pour les passionnés.
          </li>
          <li>
            <strong>Mettre à jour.</strong> Un dossier vivant vaut mieux qu'une
            actualité morte : nos guides sont révisés à chaque annonce.
          </li>
        </ul>
        <h2>Pourquoi GTA 6 ?</h2>
        <p>
          Grand Theft Auto VI, attendu le <strong>19 novembre 2026</strong>, est
          tout simplement le jeu le plus attendu de la décennie. Son dossier
          spécial — date de sortie, trailers, précommandes, histoire, version
          PC — est notre couverture principale, et sera suivi jusqu'au jour J.
        </p>
        <h2>Transparence</h2>
        <p>
          NeonActu est un site de fans, <strong>non affilié</strong> à Rockstar
          Games ni à Take-Two Interactive. Le site est financé par des espaces
          publicitaires clairement identifiés. Les visuels d'illustration sont
          générés par nos soins.
        </p>
        <p>
          Une question, une correction, une info à partager ?{" "}
          <Link href="/">Revenez à l'accueil</Link> et retrouvez-nous sur les
          réseaux.
        </p>
      </div>
    </div>
  );
}
