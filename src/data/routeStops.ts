// Ordered capital stops for the animated map.
// We keep labels in French (as provided). The animation assigns t positions evenly across the route.
export type RouteStop = {
  label: string;
  continent: 'Europe' | 'Amériques' | 'Océanie' | 'Asie' | 'Afrique' | 'Retour';
  // If set, indicates how the segment from this stop to the next is traversed.
  modeToNext?: 'road' | 'ferry';
};

const europe: RouteStop[] = [
  { label: 'Paris (France)', continent: 'Europe' },
  { label: 'Dublin (Irlande)', continent: 'Europe', modeToNext: 'ferry' },
  { label: 'Londres (Royaume‑Uni)', continent: 'Europe' },
  { label: 'Reykjavik (Islande)', continent: 'Europe', modeToNext: 'ferry' },
  { label: 'Oslo (Norvège)', continent: 'Europe' },
  { label: 'Stockholm (Suède)', continent: 'Europe' },
  { label: 'Helsinki (Finlande)', continent: 'Europe', modeToNext: 'ferry' },
  { label: 'Riga (Lettonie)', continent: 'Europe' },
  { label: 'Tallinn (Estonie)', continent: 'Europe' },
  { label: 'Vilnius (Lituanie)', continent: 'Europe' },
  { label: 'Varsovie (Pologne)', continent: 'Europe' },
  { label: 'Berlin (Allemagne)', continent: 'Europe' },
  { label: 'Copenhague (Danemark)', continent: 'Europe' },
  { label: 'Prague (Tchéquie)', continent: 'Europe' },
  { label: 'Vienne (Autriche)', continent: 'Europe' },
  { label: 'Bratislava (Slovaquie)', continent: 'Europe' },
  { label: 'Budapest (Hongrie)', continent: 'Europe' },
  { label: 'Belgrade (Serbie)', continent: 'Europe' },
  { label: 'Sarajevo (Bosnie‑Herzégovine)', continent: 'Europe' },
  { label: 'Podgorica (Monténégro)', continent: 'Europe' },
  { label: 'Tirana (Albanie)', continent: 'Europe' },
  { label: 'Skopje (Macédoine du Nord)', continent: 'Europe' },
  { label: 'Sofia (Bulgarie)', continent: 'Europe' },
  { label: 'Bucarest (Roumanie)', continent: 'Europe' },
  { label: 'Chișinău (Moldavie)', continent: 'Europe' },
  { label: 'Kiev (Ukraine)', continent: 'Europe' },
  { label: 'Minsk (Biélorussie)', continent: 'Europe' },
  { label: 'Moscou (Russie)', continent: 'Europe' },
  { label: 'Ankara (Turquie)', continent: 'Europe' },
  { label: 'Athènes (Grèce)', continent: 'Europe' },
  { label: 'Nicosie (Chypre)', continent: 'Europe', modeToNext: 'ferry' },
  { label: 'Rome (Italie)', continent: 'Europe' },
  { label: 'Cité du Vatican', continent: 'Europe' },
  { label: 'Saint‑Marin', continent: 'Europe' },
  { label: 'Monaco', continent: 'Europe' },
  { label: 'Andorre‑la‑Vieille (Andorre)', continent: 'Europe' },
  { label: 'Madrid (Espagne)', continent: 'Europe' },
  { label: 'Lisbonne (Portugal)', continent: 'Europe' },
  { label: 'Berne (Suisse)', continent: 'Europe' },
  { label: 'Luxembourg', continent: 'Europe' },
  { label: 'Bruxelles (Belgique)', continent: 'Europe' },
  { label: 'Amsterdam (Pays‑Bas)', continent: 'Europe' },
];

const americas: RouteStop[] = [
  { label: 'Ottawa (Canada)', continent: 'Amériques' },
  { label: 'Washington D.C. (États‑Unis)', continent: 'Amériques' },
  { label: 'Mexico (Mexique)', continent: 'Amériques' },
  { label: 'Guatemala City (Guatemala)', continent: 'Amériques' },
  { label: 'San Salvador (Salvador)', continent: 'Amériques' },
  { label: 'Tegucigalpa (Honduras)', continent: 'Amériques' },
  { label: 'Managua (Nicaragua)', continent: 'Amériques' },
  { label: 'San José (Costa Rica)', continent: 'Amériques' },
  { label: 'Panama City (Panama)', continent: 'Amériques', modeToNext: 'ferry' }, // Darién Gap
  { label: 'Bogotá (Colombie)', continent: 'Amériques' },
  { label: 'Quito (Équateur)', continent: 'Amériques' },
  { label: 'Brasilia (Brésil)', continent: 'Amériques' },
  { label: 'Asunción (Paraguay)', continent: 'Amériques' },
  { label: 'Montevideo (Uruguay)', continent: 'Amériques' },
  { label: 'Buenos Aires (Argentine)', continent: 'Amériques' },
  { label: 'Santiago (Chili)', continent: 'Amériques' },
  { label: 'La Paz (Bolivie)', continent: 'Amériques' },
  { label: 'Lima (Pérou)', continent: 'Amériques' },
];

const oceania: RouteStop[] = [
  { label: 'Wellington (Nouvelle‑Zélande)', continent: 'Océanie', modeToNext: 'ferry' },
  { label: 'Canberra (Australie)', continent: 'Océanie' },
];

const asia: RouteStop[] = [
  { label: 'Jakarta (Indonésie)', continent: 'Asie', modeToNext: 'ferry' },
  { label: 'Bangkok (Thaïlande)', continent: 'Asie' },
  { label: 'Phnom Penh (Cambodge)', continent: 'Asie' },
  { label: 'Vientiane (Laos)', continent: 'Asie' },
  { label: 'Hanoï (Vietnam)', continent: 'Asie' },
  { label: 'Dhaka (Bangladesh)', continent: 'Asie' },
  { label: 'Thimphu (Bhoutan)', continent: 'Asie' },
  { label: 'Katmandou (Népal)', continent: 'Asie' },
  { label: 'New Delhi (Inde)', continent: 'Asie' },
  { label: 'Islamabad (Pakistan)', continent: 'Asie' },
  { label: 'Kaboul (Afghanistan)', continent: 'Asie' },
  { label: 'Tachkent (Ouzbékistan)', continent: 'Asie' },
  { label: 'Achgabat (Turkménistan)', continent: 'Asie' },
  { label: 'Douchanbé (Tadjikistan)', continent: 'Asie' },
  { label: 'Bichkek (Kirghizistan)', continent: 'Asie' },
  { label: 'Astana (Kazakhstan)', continent: 'Asie' },
  { label: 'Oulan‑Bator (Mongolie)', continent: 'Asie' },
  { label: 'Pékin (Chine)', continent: 'Asie' },
  { label: 'Séoul (Corée du Sud)', continent: 'Asie', modeToNext: 'ferry' },
  { label: 'Tokyo (Japon)', continent: 'Asie', modeToNext: 'ferry' },
  { label: 'Manille (Philippines)', continent: 'Asie', modeToNext: 'ferry' },
  { label: 'Bandar Seri Begawan (Brunei)', continent: 'Asie', modeToNext: 'ferry' },
  { label: 'Kuala Lumpur (Malaisie)', continent: 'Asie' },
  { label: 'Singapour', continent: 'Asie' },
  { label: 'Riyad (Arabie Saoudite)', continent: 'Asie' },
  { label: 'Doha (Qatar)', continent: 'Asie', modeToNext: 'ferry' },
  { label: 'Manama (Bahreïn)', continent: 'Asie', modeToNext: 'ferry' },
  { label: 'Abu Dhabi (EAU)', continent: 'Asie' },
];

const africa: RouteStop[] = [
  { label: 'Le Caire (Égypte)', continent: 'Afrique' },
  { label: 'Khartoum (Soudan)', continent: 'Afrique' },
  { label: 'Asmara (Érythrée)', continent: 'Afrique' },
  { label: 'Addis‑Abeba (Éthiopie)', continent: 'Afrique' },
  { label: 'Nairobi (Kenya)', continent: 'Afrique' },
  { label: 'Kampala (Ouganda)', continent: 'Afrique' },
  { label: 'Kigali (Rwanda)', continent: 'Afrique' },
  { label: 'Dodoma (Tanzanie)', continent: 'Afrique' },
  { label: 'Lilongwe (Malawi)', continent: 'Afrique' },
  { label: 'Harare (Zimbabwe)', continent: 'Afrique' },
  { label: 'Maputo (Mozambique)', continent: 'Afrique' },
  { label: 'Mbabane (Eswatini)', continent: 'Afrique' },
  { label: 'Maseru (Lesotho)', continent: 'Afrique' },
  { label: 'Pretoria (Afrique du Sud)', continent: 'Afrique' },
  { label: 'Windhoek (Namibie)', continent: 'Afrique' },
  { label: 'Luanda (Angola)', continent: 'Afrique' },
  { label: 'Lusaka (Zambie)', continent: 'Afrique' },
  { label: 'Kinshasa (RDC)', continent: 'Afrique' },
  { label: 'Brazzaville (Congo)', continent: 'Afrique' },
  { label: 'Libreville (Gabon)', continent: 'Afrique' },
  { label: 'Yaoundé (Cameroun)', continent: 'Afrique' },
  { label: 'N’Djamena (Tchad)', continent: 'Afrique' },
  { label: 'Bangui (RCA)', continent: 'Afrique' },
  { label: 'Juba (Soudan du Sud)', continent: 'Afrique' },
  { label: 'Niamey (Niger)', continent: 'Afrique' },
  { label: 'Ouagadougou (Burkina Faso)', continent: 'Afrique' },
  { label: 'Bamako (Mali)', continent: 'Afrique' },
  { label: 'Dakar (Sénégal)', continent: 'Afrique' },
  { label: 'Nouakchott (Mauritanie)', continent: 'Afrique' },
  { label: 'Rabat (Maroc)', continent: 'Afrique' },
  { label: 'Alger (Algérie)', continent: 'Afrique' },
  { label: 'Tunis (Tunisie)', continent: 'Afrique' },
  { label: 'Tripoli (Libye)', continent: 'Afrique' },
];

const retour: RouteStop[] = [
  { label: 'Lisbonne (Portugal)', continent: 'Retour', modeToNext: 'ferry' },
  { label: 'Paris (France)', continent: 'Retour' },
];

export const routeStopsByContinent = {
  Europe: europe,
  Amériques: americas,
  Océanie: oceania,
  Asie: asia,
  Afrique: africa,
  Retour: retour,
};

export const routeStops: RouteStop[] = [
  ...europe,
  ...americas,
  ...oceania,
  ...asia,
  ...africa,
  ...retour,
];
