import type { LocalizedText } from '../domain/content/types.ts';

export type HomeTopicVisual = 'climate' | 'recycling' | 'ocean' | 'forest' | 'water' | 'biodiversity' | 'energy' | 'consumption';

export type HomeTopic = {
  id: string;
  title: LocalizedText;
  kicker: LocalizedText;
  href: `/learn${string}`;
  visual: HomeTopicVisual;
  index: string;
};

export const homeTopics: readonly HomeTopic[] = [
  {
    id: 'climate-change',
    index: '01',
    title: { en: 'Climate Change', kk: 'Климаттың өзгеруі' },
    kicker: { en: 'Atmosphere · heat · systems', kk: 'Атмосфера · жылу · жүйелер' },
    href: '/learn/climate-change',
    visual: 'climate',
  },
  {
    id: 'recycling',
    index: '02',
    title: { en: 'Recycling', kk: 'Қалдықтарды қайта өңдеу' },
    kicker: { en: 'Materials · cycles · choices', kk: 'Материалдар · циклдер · таңдау' },
    href: '/learn/recycling',
    visual: 'recycling',
  },
  {
    id: 'ocean-pollution',
    index: '03',
    title: { en: 'Ocean Pollution', kk: 'Мұхиттардың ластануы' },
    kicker: { en: 'Ocean · chemistry · life', kk: 'Мұхит · химия · тіршілік' },
    href: '/learn/ocean-pollution',
    visual: 'ocean',
  },
  {
    id: 'deforestation',
    index: '04',
    title: { en: 'Deforestation', kk: 'Ормандардың жойылуы' },
    kicker: { en: 'Forests · habitat · carbon', kk: 'Орман · табиғи орта · көміртек' },
    href: '/learn/deforestation',
    visual: 'forest',
  },
  {
    id: 'water-conservation',
    index: '05',
    title: { en: 'Water Conservation', kk: 'Суды сақтау' },
    kicker: { en: 'Water · scarcity · action', kk: 'Су · тапшылық · әрекет' },
    href: '/learn/water-conservation',
    visual: 'water',
  },
  {
    id: 'biodiversity',
    index: '06',
    title: { en: 'Biodiversity', kk: 'Биоалуантүрлілік' },
    kicker: { en: 'Species · habitat · networks', kk: 'Түрлер · табиғи орта · желілер' },
    href: '/learn/biodiversity',
    visual: 'biodiversity',
  },
  {
    id: 'renewable-energy',
    index: '07',
    title: { en: 'Renewable Energy', kk: 'Жаңартылатын энергия' },
    kicker: { en: 'Sun · wind · transition', kk: 'Күн · жел · ауысу' },
    href: '/learn/renewable-energy',
    visual: 'energy',
  },
  {
    id: 'sustainable-consumption',
    index: '08',
    title: { en: 'Sustainable Consumption', kk: 'Жауапты тұтыну' },
    kicker: { en: 'Products · resources · impact', kk: 'Өнімдер · ресурстар · әсер' },
    href: '/learn/sustainable-consumption',
    visual: 'consumption',
  },
] as const;
