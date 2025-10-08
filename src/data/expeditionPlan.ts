// High-level expedition plan data, structured per continent.
// Text content is in French as provided. You can internationalize later if needed.

export type ContinentPlan = {
  continent: string;
  covered: string;      // Countries and capitals (ordered, concise string)
  notCovered: string;   // Countries not covered or impractical
  months: number;       // Estimated driving months
  distanceKm: number;   // Estimated distance in km
};

export const expeditionPlan: ContinentPlan[] = [
  {
    continent: 'Europe',
    covered:
      'France (Paris), Irlande (Dublin via ferry), Royaume‑Uni (Londres via ferry), Islande (Reykjavik via ferry), Norvège (Oslo), Suède (Stockholm), Finlande (Helsinki via ferry), Lettonie (Riga), Estonie (Tallinn), Lituanie (Vilnius), Pologne (Varsovie), Allemagne (Berlin), Danemark (Copenhague), Tchéquie (Prague), Autriche (Vienne), Slovaquie (Bratislava), Hongrie (Budapest), Serbie (Belgrade), Bosnie‑Herzégovine (Sarajevo), Monténégro (Podgorica), Albanie (Tirana), Macédoine du Nord (Skopje), Bulgarie (Sofia), Roumanie (Bucarest), Moldavie (Chișinău), Ukraine (Kiev, si sûr), Biélorussie (Minsk), Russie (Moscou), Turquie (Ankara), Grèce (Athènes), Chypre (Nicosie via ferry), Italie (Rome), Vatican (Cité du Vatican), Saint‑Marin (Saint‑Marin), Monaco (Monaco), Andorre (Andorre‑la‑Vieille), Espagne (Madrid), Portugal (Lisbonne), Suisse (Berne), Luxembourg (Luxembourg), Belgique (Bruxelles), Pays‑Bas (Amsterdam).',
    notCovered: 'Malte (Valletta — ferry long, non prioritaire).',
    months: 3,
    distanceKm: 9000,
  },
  {
    continent: 'Amériques',
    covered:
      'Canada (Ottawa), États‑Unis (Washington D.C.), Mexique (Mexico), Guatemala (Guatemala City), Salvador (San Salvador), Honduras (Tegucigalpa), Nicaragua (Managua), Costa Rica (San José), Panama (Panama City), Ferry Darién Gap, Colombie (Bogotá), Équateur (Quito), Brésil (Brasilia), Paraguay (Asunción), Uruguay (Montevideo), Argentine (Buenos Aires), Chili (Santiago), Bolivie (La Paz), Pérou (Lima).',
    notCovered: 'Aucun (toutes couvertes).',
    months: 8,
    distanceKm: 28000,
  },
  {
    continent: 'Océanie',
    covered: 'Nouvelle‑Zélande (Wellington), Australie (Canberra).',
    notCovered:
      'Fidji (Suva), Papouasie‑Nouvelle‑Guinée (Port Moresby) et autres îles — non terrestres.',
    months: 1,
    distanceKm: 4000,
  },
  {
    continent: 'Asie',
    covered:
      'Indonésie (Jakarta via ferry), Thaïlande (Bangkok), Cambodge (Phnom Penh), Laos (Vientiane), Vietnam (Hanoï), Bangladesh (Dhaka), Bhoutan (Thimphu), Népal (Katmandou), Inde (New Delhi), Pakistan (Islamabad), Afghanistan (Kaboul, si sûr), Ouzbékistan (Tachkent), Turkménistan (Achgabat), Tadjikistan (Douchanbé), Kirghizistan (Bichkek), Kazakhstan (Astana), Mongolie (Oulan‑Bator), Chine (Pékin), Corée du Sud (Séoul via ferry), Japon (Tokyo via ferry), Philippines (Manille via ferry), Brunei (Bandar Seri Begawan via ferry), Malaisie (Kuala Lumpur), Singapour (Singapour), Arabie Saoudite (Riyad), Qatar (Doha via ferry), Bahreïn (Manama via ferry), Émirats Arabes Unis (Abu Dhabi).',
    notCovered:
      'Taïwan (Taipei — ferry complexe), Corée du Nord (Pyongyang — inaccessible), Oman (Mascate — détour maritime), Yémen (Sanaa — instable).',
    months: 6,
    distanceKm: 23000,
  },
  {
    continent: 'Afrique',
    covered:
      'Égypte (Le Caire), Soudan (Khartoum), Érythrée (Asmara), Éthiopie (Addis‑Abeba), Kenya (Nairobi), Ouganda (Kampala), Rwanda (Kigali), Tanzanie (Dodoma), Malawi (Lilongwe), Zimbabwe (Harare), Mozambique (Maputo), Eswatini (Mbabane), Lesotho (Maseru), Afrique du Sud (Pretoria), Namibie (Windhoek), Angola (Luanda), Zambie (Lusaka), RDC (Kinshasa), Congo (Brazzaville), Gabon (Libreville), Cameroun (Yaoundé), Tchad (N’Djamena), RCA (Bangui), Soudan du Sud (Juba), Niger (Niamey), Burkina Faso (Ouagadougou), Mali (Bamako), Sénégal (Dakar), Mauritanie (Nouakchott), Maroc (Rabat), Algérie (Alger), Tunisie (Tunis), Libye (Tripoli, si sûr).',
    notCovered: 'Cap‑Vert (Praia), Madagascar (Antananarivo) et autres îles — non terrestres.',
    months: 8,
    distanceKm: 32000,
  },
  {
    continent: 'Retour Europe',
    covered: 'Portugal (Lisbonne) via ferry, France (Paris).',
    notCovered: 'Aucun.',
    months: 0.5,
    distanceKm: 1500,
  },
];

export const expeditionTotals = {
  distanceKm: 97500,
  months: 26.5,
};