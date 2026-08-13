export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; source?: string }
  | { type: "image"; src: string; alt: string; caption?: string };

export type FaqItem = { q: string; a: string };

export type Article = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  updatedAt: string; // ISO
  readingTime: number;
  cover: string;
  coverAlt: string;
  keywords: string[];
  keyPoints: string[];
  blocks: Block[];
  faq: FaqItem[];
};

export const SITE = {
  name: "GameFocus",
  url: "https://gamefocus.fr",
  tagline: "L'actualité jeux vidéo, sans le bruit",
  description:
    "GameFocus : actualités, guides et analyses sur les jeux vidéo les plus attendus. Dossier spécial GTA 6 : date de sortie, trailers, précommandes, histoire et rumeurs vérifiées.",
};

export const GTA_RELEASE_ISO = "2026-11-19T00:00:00Z";

export const articles: Article[] = [
  {
    slug: "gta-6-date-de-sortie-prix-editions-precommande",
    shortTitle: "Date, prix & précommandes",
    title:
      "GTA 6 : date de sortie, prix, éditions et précommandes — le guide complet",
    description:
      "GTA 6 sort le 19 novembre 2026 sur PS5 et Xbox Series X|S. Date de sortie, prix, éditions Standard et Ultimate, bonus de précommande, version PC : tout ce qu'il faut savoir, mis à jour en août 2026.",
    excerpt:
      "Sortie confirmée au 19 novembre 2026, précommandes ouvertes depuis le 25 juin, deux éditions et toujours aucun prix officiel : on fait le point sur tout ce qu'il faut savoir avant d'acheter GTA 6.",
    category: "Guide",
    date: "2026-08-10",
    updatedAt: "2026-08-13",
    readingTime: 8,
    cover: "/images/article-guide.jpg",
    coverAlt:
      "Un gigantesque chiffre romain VI en néon vert illuminant la skyline d'une ville tropicale la nuit, évoquant GTA 6",
    keywords: [
      "GTA 6 date de sortie",
      "GTA 6 prix",
      "GTA 6 précommande",
      "GTA 6 éditions",
      "GTA VI PS5",
      "GTA 6 Xbox Series",
    ],
    keyPoints: [
      "GTA 6 sort officiellement le 19 novembre 2026 sur PS5 et Xbox Series X|S.",
      "Les précommandes sont ouvertes depuis le 25 juin 2026, avec le pack « Vintage Vice City » en bonus.",
      "Deux éditions : Standard et Ultimate (cette dernière uniquement en numérique).",
      "Aucun prix officiel n'a encore été communiqué par Rockstar ou Take-Two.",
      "Aucune version PS4, Xbox One ou PC n'est annoncée à ce jour.",
    ],
    blocks: [
      {
        type: "p",
        text: "Après treize ans d'attente et deux reports, **Grand Theft Auto VI** a enfin une date gravée dans le marbre : le **19 novembre 2026**. Confirmée par Rockstar Games en novembre 2025 puis réaffirmée par Take-Two Interactive à chaque bilan financier depuis, elle est désormais soutenue par une campagne marketing qui s'intensifie semaine après semaine. Voici le point complet, à jour au 13 août 2026.",
      },
      { type: "h2", text: "La date de sortie officielle de GTA 6" },
      {
        type: "p",
        text: "GTA 6 sera disponible le **jeudi 19 novembre 2026** sur **PlayStation 5** et **Xbox Series X|S**. C'est la seule date officielle communiquée par Rockstar Games. Annoncé d'abord pour l'automne 2025, puis pour le 26 mai 2026, le jeu a finalement été repoussé de six mois supplémentaires — Rockstar invoquant le temps nécessaire pour atteindre « le niveau de finition que les joueurs attendent et méritent ».",
      },
      {
        type: "p",
        text: "Bonne nouvelle pour les collectionneurs : Strauss Zelnick, le PDG de Take-Two, a confirmé en février 2026 que le jeu sortira **en version physique en même temps qu'en numérique**, mettant fin aux rumeurs d'un lancement 100 % dématérialisé. Attention toutefois : d'après les listings de plusieurs revendeurs, la boîte de l'édition Standard contiendrait un **code de téléchargement** plutôt qu'un disque. Prévoyez donc une connexion solide et de l'espace de stockage.",
      },
      { type: "h2", text: "Quel prix pour GTA 6 ?" },
      {
        type: "p",
        text: "C'est LA question que tout le monde se pose — et à laquelle Rockstar refuse encore de répondre. Interrogé à plusieurs reprises, Strauss Zelnick a botté en touche : les bilans financiers « ne sont pas le lieu pour les annonces marketing ». Les rumeurs d'un jeu à 80, 90 voire 100 euros restent donc des **spéculations**. Le prix sera dévoilé avec la campagne de lancement, probablement d'ici l'automne.",
      },
      { type: "h2", text: "Les éditions disponibles en précommande" },
      {
        type: "p",
        text: "Les précommandes de GTA 6 sont **ouvertes depuis le 25 juin 2026**, quelques jours après la révélation de la jaquette officielle. Deux éditions principales sont proposées :",
      },
      {
        type: "list",
        items: [
          "**Édition Standard** — le jeu de base, plus le bonus de précommande : le pack « Vintage Vice City ».",
          "**Édition Ultimate** (numérique uniquement) — ajoute des véhicules, des armes, des vêtements exclusifs ainsi que plusieurs commerces et services intégrés à l'univers du jeu.",
        ],
      },
      {
        type: "p",
        text: "Faut-il précommander dès maintenant ? Si vous êtes certain de jouer dès le jour J, le pack Vintage Vice City est un vrai bonus. Sinon, rien ne presse : en version numérique, le jeu ne risque pas la rupture de stock, et les mois à venir apporteront de nouvelles informations pour choisir votre édition en connaissance de cause.",
      },
      { type: "h2", text: "Et sur PC, PS4 ou Xbox One ?" },
      {
        type: "p",
        text: "Rockstar n'a annoncé **aucune date pour la version PC**. L'histoire du studio suggère une sortie décalée de 12 à 19 mois après les consoles — nous y consacrons un article complet. Quant à la PS4 et la Xbox One, elles sont définitivement hors course : GTA 6 est pensé exclusivement pour la génération actuelle.",
      },
      {
        type: "quote",
        text: "Ces mois supplémentaires nous permettront de terminer le jeu avec le niveau de finition que vous attendez et méritez.",
        source: "Rockstar Games, communiqué officiel",
      },
    ],
    faq: [
      {
        q: "Quelle est la date de sortie de GTA 6 ?",
        a: "GTA 6 sort officiellement le 19 novembre 2026 sur PlayStation 5 et Xbox Series X|S. La date a été confirmée par Rockstar Games et réaffirmée par Take-Two en mai 2026.",
      },
      {
        q: "Peut-on déjà précommander GTA 6 ?",
        a: "Oui, les précommandes sont ouvertes depuis le 25 juin 2026. Elles donnent accès au pack bonus « Vintage Vice City ». Deux éditions sont proposées : Standard et Ultimate (numérique uniquement).",
      },
      {
        q: "Quel est le prix de GTA 6 ?",
        a: "Aucun prix officiel n'a été communiqué à ce jour. Les montants qui circulent (80 à 100 €) sont des spéculations. Le prix devrait être annoncé pendant la campagne de lancement, à l'automne 2026.",
      },
      {
        q: "GTA 6 sortira-t-il sur PC ?",
        a: "Une version PC n'est pas officiellement datée. Si l'on se base sur l'historique de Rockstar (GTA V, Red Dead Redemption 2), elle pourrait arriver entre 2027 et 2028.",
      },
    ],
  },
  {
    slug: "gta-6-trailer-3-quand-sortira-prochaine-bande-annonce",
    shortTitle: "Trailer 3 : le point",
    title:
      "GTA 6 : quand sortira le trailer 3 ? Ce que la conférence Take-Two du 7 août a changé",
    description:
      "La communauté attendait un trailer 3 de GTA 6 lors de la conférence Take-Two du 7 août 2026. Marketing d'envergure confirmé, site officiel mis à jour : on décrypte le calendrier le plus crédible pour la prochaine bande-annonce.",
    excerpt:
      "Trois mises à jour du site officiel en 24 heures, une conférence financière ultra-surveillée et une campagne marketing « d'envergure » promise pour l'été : les indices s'accumulent autour du trailer 3 de GTA 6.",
    category: "Actu",
    date: "2026-08-08",
    updatedAt: "2026-08-13",
    readingTime: 6,
    cover: "/images/article-trailer.jpg",
    coverAlt:
      "Une foule de fans silhouettés devant un écran géant diffusant une ville au néon, évoquant l'attente du trailer 3 de GTA 6",
    keywords: [
      "GTA 6 trailer 3",
      "GTA 6 bande-annonce 3",
      "GTA 6 gameplay",
      "GTA 6 nouvelles images",
      "Take-Two août 2026",
    ],
    keyPoints: [
      "Take-Two a tenu sa conférence de résultats le 7 août 2026, la première depuis l'ouverture des précommandes.",
      "Des fans ont repéré trois mises à jour du site officiel de GTA 6 en moins de 24 heures.",
      "Le trailer 2 a battu tous les records avec 475 millions de vues en 24 heures.",
      "La chronologie la plus crédible : trailer 3 à l'été/automne, gameplay détaillé ensuite, trailer de lancement en novembre.",
    ],
    blocks: [
      {
        type: "p",
        text: "Rarement une conférence de résultats financiers aura autant fait trembler la communauté gaming. Le **7 août 2026**, Take-Two Interactive présentait ses chiffres trimestriels — le premier rendez-vous du genre depuis l'ouverture des précommandes de GTA 6 le 25 juin. Dans les jours précédents, des fans aux aguets affirmaient avoir repéré **trois mises à jour du site officiel du jeu en moins de 24 heures**. De quoi nourrir tous les espoirs.",
      },
      { type: "h2", text: "Ce que l'on sait réellement" },
      {
        type: "p",
        text: "Soyons rigoureux : Rockstar n'a **jamais confirmé** de trailer 3 pour cette date. Le rendez-vous du 7 août était un événement financier, pas un showcase. Mais le contexte est éloquent. Strauss Zelnick a promis dès février 2026 une campagne marketing estivale **« d'envergure »**, « à la hauteur de l'événement » et volontairement différente de celle de GTA V en 2013. Les précommandes sont ouvertes, la jaquette est dévoilée, et le site officiel bouge : tous les signaux d'une machine qui s'emballe sont là.",
      },
      { type: "h2", text: "Le poids record des trailers de GTA 6" },
      {
        type: "p",
        text: "Pour mesurer l'attente : le **trailer 2**, publié en mai 2025 après l'annonce du premier report, a dépassé les **475 millions de vues en 24 heures** — un record absolu, tous médias confondus, films compris. Le premier trailer, dévoilé en décembre 2023, avait déjà fracassé les compteurs de YouTube. Chaque nouvelle vidéo de Rockstar est devenue un événement culturel mondial, et le studio le sait : il contrôle son calendrier au millimètre et n'a besoin d'aucun salon pour exister.",
      },
      {
        type: "quote",
        text: "Une campagne d'envergure, à la hauteur de l'événement, adaptée aux attentes actuelles du public.",
        source: "Strauss Zelnick, PDG de Take-Two Interactive",
      },
      { type: "h2", text: "Le scénario le plus crédible pour la suite" },
      {
        type: "p",
        text: "En croisant le calendrier habituel de Rockstar et les déclarations de Take-Two, voici la chronologie qui tient la route :",
      },
      {
        type: "list",
        items: [
          "**Été / début d'automne 2026** — le trailer 3, centré sur l'histoire et les personnages.",
          "**Septembre–octobre 2026** — une véritable présentation de gameplay, le graal que les joueurs attendent depuis 2023.",
          "**Début novembre 2026** — le trailer de lancement, quelques jours avant la sortie du 19 novembre.",
        ],
      },
      {
        type: "p",
        text: "Une certitude : à trois mois de la sortie, le silence ne peut plus durer. La campagne marketing doit forcément s'intensifier. Le trailer 3 n'est plus une question de « si », mais de « quand » — et GameFocus vous le signalera dès sa mise en ligne.",
      },
    ],
    faq: [
      {
        q: "Le trailer 3 de GTA 6 est-il confirmé ?",
        a: "Non, Rockstar n'a pas encore officialisé de date pour le trailer 3. La campagne marketing d'envergure promise par Take-Two pour l'été 2026 le rend toutefois imminent.",
      },
      {
        q: "Combien de vues a fait le trailer 2 de GTA 6 ?",
        a: "Le trailer 2, publié en mai 2025, a dépassé 475 millions de vues en 24 heures, un record absolu devant tous les jeux vidéo et films.",
      },
      {
        q: "Y aura-t-il une vidéo de gameplay avant la sortie ?",
        a: "Très probablement. Rockstar publie traditionnellement une présentation de gameplay quelques semaines avant le lancement, ce qui la placerait entre septembre et octobre 2026.",
      },
    ],
  },
  {
    slug: "gta-6-histoire-lucia-jason-leonida-vice-city",
    shortTitle: "Histoire & carte",
    title:
      "GTA 6 : Lucia, Jason, Leonida… tout ce que l'on sait de l'histoire et de la carte",
    description:
      "Lucia Caminos et Jason Duval, un couple de criminels façon Bonnie and Clyde dans l'État de Leonida et sa capitale Vice City : découvrez tout ce que Rockstar a confirmé sur l'histoire, les personnages et la carte de GTA 6.",
    excerpt:
      "Première héroïne jouable de la saga moderne, duo de braqueurs amoureux, retour à Vice City agrandi à l'échelle d'un État entier : ce que l'on sait de l'histoire de GTA 6 tient déjà du mythe.",
    category: "Dossier",
    date: "2026-08-05",
    updatedAt: "2026-08-12",
    readingTime: 7,
    cover: "/images/article-histoire.jpg",
    coverAlt:
      "Un homme et une femme de dos adossés à une voiture rétro dans une rue tropicale baignée de néons verts, évoquant Lucia et Jason dans GTA 6",
    keywords: [
      "GTA 6 histoire",
      "GTA 6 Lucia",
      "GTA 6 Jason",
      "GTA 6 carte",
      "Leonida",
      "Vice City",
    ],
    keyPoints: [
      "GTA 6 suit Jason Duval et Lucia Caminos, un couple de criminels façon Bonnie and Clyde moderne.",
      "Lucia est la première femme jouable du mode solo dans l'histoire moderne de la saga.",
      "Le jeu se déroule dans l'État de Leonida, une Floride parodique dont la capitale est Vice City.",
      "Le trailer 2 a été entièrement capturé sur PS5 — et il contient déjà du gameplay.",
      "Rockstar a dévoilé 70 images officielles présentant les lieux et personnages de Leonida.",
    ],
    blocks: [
      {
        type: "p",
        text: "Rockstar a beau distiller les informations au compte-goutte, le tableau est déjà saisissant. GTA 6 racontera l'histoire de **Jason Duval** et **Lucia Caminos**, deux amoureux qui, après un coup qui tourne mal, se retrouvent pris dans une conspiration criminelle à l'échelle d'un État — et n'ont plus que l'un l'autre pour s'en sortir. Un **Bonnie and Clyde des temps modernes**, dans la veine la plus cinématographique du studio.",
      },
      { type: "h2", text: "Lucia, une héroïne historique pour la saga" },
      {
        type: "p",
        text: "C'est une première depuis les origines 2D de la franchise : **une femme sera jouable en mode solo**. Lucia Caminos, aperçue dès le premier trailer en tenue de détenue puis en braqueuse de supérette, s'annonce comme le cœur narratif du jeu. Son duo avec Jason — discret, taiseux, mais tout aussi dangereux — promet une dynamique inédite pour la série, où l'on alternera entre les deux personnages.",
      },
      { type: "h2", text: "Leonida : bien plus qu'une simple carte" },
      {
        type: "p",
        text: "Adieu Los Santos, bonjour **Leonida**. Cet État fictif, parodie assumée de la Floride, a pour capitale **Vice City** — la métropole inspirée de Miami que les fans n'avaient plus foulée depuis GTA: Vice City Stories en 2006. Mais là où le Vice City de 2002 tenait sur quelques îles, la version 2026 s'étend à l'échelle d'un État entier : plages art déco, marécages, petites villes de l'arrière-pays et autoroutes interminables.",
      },
      {
        type: "p",
        text: "Rockstar a publié en mai 2025 pas moins de **70 images officielles** détaillant les lieux et habitants de Leonida, des néons d'Ocean Beach aux étendues sauvages inspirées des Everglades. Certaines rumeurs évoquent une carte deux fois plus grande que celle de GTA V — une information à prendre avec prudence, mais cohérente avec l'ambition affichée.",
      },
      { type: "h2", text: "Du vrai gameplay, déjà" },
      {
        type: "p",
        text: "Détail qui a son importance : Rockstar a confirmé que le **trailer 2 a été entièrement capturé sur PlayStation 5**, et qu'il mélange cinématiques et véritables séquences de gameplay. Autrement dit, ce que vous avez vu tourne déjà sur console — ce qui n'était pas le cas de toutes les bandes-annonces de l'histoire du studio. De quoi faire monter la confiance à trois mois de la sortie.",
      },
      {
        type: "quote",
        text: "Nous sommes incroyablement impatients que les joueurs découvrent l'immense État de Leonida et ce retour à Vice City, version moderne.",
        source: "Rockstar Games",
      },
    ],
    faq: [
      {
        q: "Qui sont les personnages principaux de GTA 6 ?",
        a: "Jason Duval et Lucia Caminos, un couple de criminels comparé à un Bonnie and Clyde moderne. Après un coup raté, ils sont pris dans une conspiration à l'échelle de l'État de Leonida.",
      },
      {
        q: "Où se déroule GTA 6 ?",
        a: "Dans l'État fictif de Leonida, inspiré de la Floride. Sa plus grande ville est Vice City, la version parodique de Miami déjà culte depuis GTA: Vice City (2002).",
      },
      {
        q: "Peut-on jouer une femme dans GTA 6 ?",
        a: "Oui. Lucia Caminos est la première héroïne jouable du mode solo dans l'histoire moderne de Grand Theft Auto. Le joueur alternera entre Lucia et Jason.",
      },
      {
        q: "La carte de GTA 6 est-elle plus grande que celle de GTA 5 ?",
        a: "Rockstar ne l'a pas chiffré officiellement. Les rumeurs évoquent une carte jusqu'à deux fois plus vaste, couvrant un État entier plutôt qu'une seule ville et sa périphérie.",
      },
    ],
  },
  {
    slug: "gta-6-pc-quand-sortira-version-pc",
    shortTitle: "GTA 6 sur PC",
    title:
      "GTA 6 sur PC : pourquoi il va falloir patienter (et combien de temps)",
    description:
      "Aucune date PC pour GTA 6 n'a été annoncée. En se basant sur l'historique de Rockstar — GTA V, Red Dead Redemption 2 — on estime la fenêtre de sortie la plus probable pour la version PC.",
    excerpt:
      "Consoles d'abord, PC ensuite : Rockstar ne déroge presque jamais à sa règle. Analyse de l'historique du studio pour estimer la fenêtre de sortie de GTA 6 sur PC.",
    category: "Analyse",
    date: "2026-08-02",
    updatedAt: "2026-08-11",
    readingTime: 6,
    cover: "/images/article-pc.jpg",
    coverAlt:
      "Un setup PC gaming haut de gamme aux ventilateurs RGB verts affichant une ville néon, symbolisant l'attente de GTA 6 sur PC",
    keywords: [
      "GTA 6 PC",
      "GTA 6 version PC",
      "GTA 6 date PC",
      "GTA VI PC 2027",
      "GTA 6 config PC",
    ],
    keyPoints: [
      "GTA 6 sort le 19 novembre 2026 sur PS5 et Xbox Series X|S uniquement. Aucune date PC n'est annoncée.",
      "GTA V avait mis 19 mois à passer des consoles au PC ; Red Dead Redemption 2, 13 mois.",
      "La fenêtre la plus crédible pour GTA 6 sur PC : fin 2027, voire 2028.",
      "La stratégie de la « double vente » consoles puis PC est historiquement très rentable pour Take-Two.",
    ],
    blocks: [
      {
        type: "p",
        text: "Si vous jouez sur PC, autant le dire franchement : **il va falloir s'armer de patience**. GTA 6 sortira le 19 novembre 2026 sur PS5 et Xbox Series X|S — et Rockstar n'a soufflé mot d'une quelconque version PC. Aucune date, aucune fenêtre, pas même une confirmation officielle. Mais l'histoire du studio donne de solides indications.",
      },
      { type: "h2", text: "Ce que dit l'historique de Rockstar" },
      {
        type: "p",
        text: "Le studio a une tradition bien établie : **consoles d'abord, PC ensuite**.",
      },
      {
        type: "list",
        items: [
          "**GTA V** — sorti en septembre 2013 sur PS3/Xbox 360, porté sur PC en avril 2015, soit **19 mois** plus tard.",
          "**Red Dead Redemption 2** — sorti en octobre 2018 sur consoles, arrivé sur PC en novembre 2019, soit **13 mois** plus tard.",
          "**Red Dead Redemption premier du nom** — a attendu… 14 ans avant son portage PC en 2024.",
        ],
      },
      {
        type: "p",
        text: "Appliqué à GTA 6, ce rythme place la version PC entre **fin 2027 et 2028**. Rien d'officiel, mais une estimation bien plus crédible que les espoirs d'une sortie simultanée.",
      },
      { type: "h2", text: "Pourquoi une telle attente ?" },
      {
        type: "p",
        text: "Deux raisons complémentaires. D'abord, la technique : Rockstar peaufine ses portages PC (options graphiques, framerates débloqués) plutôt que de livrer une conversion bâclée. Ensuite — et surtout — l'économie : échelonner les sorties permet à Take-Two de **vendre le jeu deux fois** à une partie de son public, d'abord sur console puis sur PC. Une stratégie assumée de longue date et qui a fait ses preuves : GTA V s'est écoulé à plus de 200 millions d'exemplaires sur trois générations de plateformes.",
      },
      { type: "h2", text: "Que faire en attendant ?" },
      {
        type: "p",
        text: "Notre conseil : ne construisez pas votre config autour de GTA 6 pour l'instant. Les spécifications officielles n'existent pas, et les exigences réelles ne seront connues qu'à l'approche du portage. Profitez-en pour finir votre backlog — et si l'impatience est trop forte, la génération PS5 / Xbox Series reste la seule porte d'entrée vers Leonida en novembre 2026.",
      },
    ],
    faq: [
      {
        q: "GTA 6 sort-il sur PC en même temps que sur consoles ?",
        a: "Non. La sortie du 19 novembre 2026 ne concerne que la PS5 et la Xbox Series X|S. Rockstar n'a annoncé aucune date pour le PC.",
      },
      {
        q: "Quand GTA 6 sortira-t-il sur PC ?",
        a: "Aucune date officielle n'existe. En se basant sur GTA V (19 mois d'écart) et Red Dead Redemption 2 (13 mois), une sortie entre fin 2027 et 2028 est l'hypothèse la plus crédible.",
      },
      {
        q: "Quelle config PC faudra-t-il pour GTA 6 ?",
        a: "Les configurations requises ne sont pas connues et ne le seront probablement pas avant l'annonce officielle du portage PC. Méfiez-vous des « configs » qui circulent : ce sont des spéculations.",
      },
    ],
  },
  {
    slug: "gta-6-gta-online-avenir-nouveau-mode-en-ligne",
    shortTitle: "L’après GTA Online",
    title:
      "GTA 6 et l'après GTA Online : ce que le 19 novembre va changer pour des millions de joueurs",
    description:
      "Que deviendra GTA Online quand GTA 6 sortira le 19 novembre 2026 ? Nouveau mode en ligne, économie record, fin d'une ère de 13 ans : analyse de ce que le lancement va changer pour l'industrie et les joueurs.",
    excerpt:
      "Treize ans après GTA V et son Online devenu empire, le 19 novembre 2026 ne marquera pas seulement une sortie de jeu : c'est toute une économie du jeu vidéo qui bascule.",
    category: "Analyse",
    date: "2026-07-28",
    updatedAt: "2026-08-10",
    readingTime: 6,
    cover: "/images/article-online.jpg",
    coverAlt:
      "Vue aérienne nocturne d'une métropole tropicale dont les rues forment un réseau de lignes néon vertes, évoquant le futur de GTA Online",
    keywords: [
      "GTA Online 2",
      "GTA 6 online",
      "avenir GTA Online",
      "GTA 6 multijoueur",
      "GTA 6 économie",
    ],
    keyPoints: [
      "GTA V est sorti en 2013 : GTA 6 met fin à une attente record de 13 ans entre deux épisodes.",
      "Le report de GTA 6 à 2026 aurait coûté environ 2,7 milliards de dollars à l'industrie du jeu vidéo.",
      "Rockstar n'a encore rien officialisé concernant un éventuel nouveau GTA Online.",
      "L'édition Ultimate de GTA 6 intègre déjà des « commerces et services » dans l'univers du jeu.",
    ],
    blocks: [
      {
        type: "p",
        text: "Il y a les sorties de jeux, et il y a le **19 novembre 2026**. Lorsque GTA 6 débarquera sur PS5 et Xbox Series, ce ne sera pas seulement la fin d'une attente de treize ans — GTA V est sorti en septembre 2013, soit une éternité à l'échelle du jeu vidéo. Ce sera aussi un **séisme économique** pour toute l'industrie, et un point d'interrogation géant sur l'avenir du jeu en ligne le plus rentable de l'histoire.",
      },
      { type: "h2", text: "Un report qui a coûté 2,7 milliards de dollars" },
      {
        type: "p",
        text: "Lorsque Take-Two a annoncé le second report de GTA 6, en novembre 2025, les analystes ont estimé le manque à gagner pour l'ensemble de l'industrie à environ **2,7 milliards de dollars** : consoles non vendues, jeux concurrents repositionnés, cartes Shark Card en berne. Peu de produits culturels, tous secteurs confondus, ont un tel poids macroéconomique. Le trailer 2, lui, avait signé **475 millions de vues en 24 heures** — un record absolu devant n'importe quel blockbuster cinéma.",
      },
      { type: "h2", text: "Que va devenir GTA Online ?" },
      {
        type: "p",
        text: "C'est le grand mystère. Lancé en 2013, GTA Online est devenu une plateforme à part entière, nourrie de mises à jour pendant plus d'une décennie et pilier des revenus récurrents de Take-Two. Officiellement, Rockstar n'a rien annoncé : ni fermeture, ni successeur. Mais plusieurs indices laissent deviner la suite.",
      },
      {
        type: "list",
        items: [
          "L'**édition Ultimate** de GTA 6 inclut des « commerces et services intégrés à l'univers du jeu » — un vocabulaire qui sent bon la composante en ligne.",
          "Take-Two présente GTA 6 comme « le socle » des années futures, exactement le rôle que GTA V a tenu depuis 2013.",
          "Historiquement, le mode en ligne de GTA V était arrivé **deux semaines après** le jeu de base, le temps de stabiliser les serveurs.",
        ],
      },
      { type: "h2", text: "Ce qui va changer pour les joueurs" },
      {
        type: "p",
        text: "Si Rockstar suit son modèle historique, attendez-vous à un lancement en deux temps : d'abord l'expérience solo de Jason et Lucia, puis l'ouverture progressive d'un **nouveau monde en ligne** dans Leonida. Pour les vétérans de Los Santos, la question de la migration des progressions et des achats reste entière — et sans réponse officielle. Une chose est sûre : à trois mois du jour J, les annonces vont se succéder. Restez focus.",
      },
    ],
    faq: [
      {
        q: "GTA Online va-t-il fermer à la sortie de GTA 6 ?",
        a: "Rien n'a été annoncé par Rockstar. GTA Online continue de recevoir du contenu et aucune date de fermeture n'a été communiquée.",
      },
      {
        q: "Y aura-t-il un nouveau mode en ligne dans GTA 6 ?",
        a: "Rockstar ne l'a pas officialisé, mais l'édition Ultimate du jeu intègre des commerces et services en ligne, et l'historique du studio suggère un nouveau mode en ligne peu après le lancement.",
      },
      {
        q: "Pourquoi GTA 6 est-il si important pour l'industrie ?",
        a: "Son simple report à 2026 a été estimé à 2,7 milliards de dollars de manque à gagner pour l'industrie. Le jeu influence les ventes de consoles, le calendrier des concurrents et les revenus de tout un secteur.",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
