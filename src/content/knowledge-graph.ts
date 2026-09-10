import type { KnowledgeRelation, LocalizedText } from '../domain/content/types.ts';

export type KnowledgeNode = {
  id: string;
  label: LocalizedText;
  world: 'earth' | 'ice-water' | 'extremes' | 'life';
  x: number;
  y: number;
  description: LocalizedText;
  sourceIds: string[];
  lessonSlug?: string;
  reviewItemId?: string;
};

export type KnowledgeGraph = {
  nodes: KnowledgeNode[];
  relations: KnowledgeRelation[];
};

export const knowledgeGraph: KnowledgeGraph = {
  nodes: [
    { id: 'atmosphere', label: { en: 'Atmosphere', kk: 'Атмосфера' }, world: 'earth', x: 12, y: 20, description: { en: 'The layer of gases surrounding Earth, where most weather occurs.', kk: 'Жерді қоршап тұрған газдар қабаты; ауа райының көп бөлігі осы қабатта жүреді.' }, sourceIds: ['nasa-atmosphere'], lessonSlug: 'atmosphere', reviewItemId: 'atmosphere' },
    { id: 'weather', label: { en: 'Weather', kk: 'Ауа райы' }, world: 'earth', x: 30, y: 18, description: { en: 'Short-term atmospheric conditions at a particular time and place.', kk: 'Белгілі бір уақыт пен жердегі қысқа мерзімді атмосфера жағдайлары.' }, sourceIds: ['nasa-weather-climate'], lessonSlug: 'weather-climate', reviewItemId: 'weather' },
    { id: 'climate', label: { en: 'Climate', kk: 'Климат' }, world: 'earth', x: 48, y: 24, description: { en: 'Long-term patterns in weather measured across many years.', kk: 'Көптеген жылдар бойы өлшенетін ауа райының ұзақ мерзімді заңдылықтары.' }, sourceIds: ['nasa-weather-climate'], lessonSlug: 'weather-climate', reviewItemId: 'climate' },
    { id: 'temperature', label: { en: 'Temperature', kk: 'Температура' }, world: 'earth', x: 62, y: 38, description: { en: 'A measure of how hot or cold something is and one variable used in climate observations.', kk: 'Заттың қаншалықты ыстық немесе суық екенін көрсететін өлшем және климат бақылауларындағы көрсеткіштердің бірі.' }, sourceIds: ['nasa-weather-climate'], lessonSlug: 'weather-climate' },
    { id: 'glacier', label: { en: 'Glacier', kk: 'Мұздық' }, world: 'ice-water', x: 42, y: 50, description: { en: 'A large mass of land ice formed from accumulated snow over many years.', kk: 'Көп жылдар бойы жиналған қардан түзілген құрлықтағы үлкен мұз массасы.' }, sourceIds: ['nasa-sea-level'], lessonSlug: 'glaciers', reviewItemId: 'glacier' },
    { id: 'land-ice-melt', label: { en: 'Land-ice melt', kk: 'Құрлық мұзының еруі' }, world: 'ice-water', x: 55, y: 63, description: { en: 'The change of land-based ice into liquid water under melting conditions.', kk: 'Құрлықтағы мұздың еру жағдайында сұйық суға айналуы.' }, sourceIds: ['nasa-sea-level'], lessonSlug: 'glaciers' },
    { id: 'sea-level', label: { en: 'Sea level', kk: 'Теңіз деңгейі' }, world: 'ice-water', x: 72, y: 72, description: { en: 'The average level of the sea surface, which can change over time.', kk: 'Уақыт өте өзгеруі мүмкін теңіз бетінің орташа деңгейі.' }, sourceIds: ['nasa-sea-level'], lessonSlug: 'sea-level', reviewItemId: 'sea level' },
    { id: 'drought', label: { en: 'Drought', kk: 'Құрғақшылық' }, world: 'extremes', x: 76, y: 38, description: { en: 'A prolonged period with much less rainfall or available water than usual.', kk: 'Жауын-шашын немесе қолжетімді су әдеттегіден әлдеқайда аз болатын ұзақ кезең.' }, sourceIds: ['usgs-fire-drought'], lessonSlug: 'drought', reviewItemId: 'drought' },
    { id: 'dry-vegetation', label: { en: 'Dry vegetation', kk: 'Құрғақ өсімдіктер' }, world: 'extremes', x: 82, y: 52, description: { en: 'Vegetation with low moisture that can become more available as wildfire fuel.', kk: 'Ылғалы аз өсімдіктер; олар өртке жанғыш материал ретінде көбірек қолжетімді болуы мүмкін.' }, sourceIds: ['usgs-fire-drought'], lessonSlug: 'wildfire-extreme-weather' },
    { id: 'wildfire-risk', label: { en: 'Wildfire risk', kk: 'Өрт қаупі' }, world: 'extremes', x: 88, y: 65, description: { en: 'The possibility and potential severity of wildfire, influenced by multiple environmental and ignition factors.', kk: 'Бірнеше қоршаған орта және тұтану факторларына тәуелді табиғи өрттің болуы мен ықтимал ауырлығы.' }, sourceIds: ['usgs-wildfire-risk'], lessonSlug: 'wildfire-extreme-weather' },
    { id: 'wildfire', label: { en: 'Wildfire', kk: 'Табиғи өрт' }, world: 'extremes', x: 78, y: 78, description: { en: 'A large uncontrolled fire spreading through natural vegetation.', kk: 'Табиғи өсімдіктер арасында бақылаусыз таралатын үлкен өрт.' }, sourceIds: ['usgs-wildfire-risk'], lessonSlug: 'wildfire-extreme-weather', reviewItemId: 'wildfire' },
    { id: 'habitat', label: { en: 'Habitat', kk: 'Табиғи орта' }, world: 'life', x: 60, y: 84, description: { en: 'The natural place where an organism lives and finds the conditions it needs.', kk: 'Ағза өмір сүріп, қажетті жағдайларды табатын табиғи орта.' }, sourceIds: ['usgs-ecosystems'], lessonSlug: 'habitats', reviewItemId: 'habitat' },
    { id: 'ecosystem', label: { en: 'Ecosystem', kk: 'Экожүйе' }, world: 'life', x: 42, y: 84, description: { en: 'Living organisms and environmental conditions interacting as a system.', kk: 'Тірі ағзалар мен қоршаған орта жағдайларының бір жүйе ретінде өзара әрекеті.' }, sourceIds: ['usgs-ecosystems'], lessonSlug: 'habitats', reviewItemId: 'ecosystem' },
    { id: 'ocean-water', label: { en: 'Ocean water', kk: 'Мұхит суы' }, world: 'ice-water', x: 62, y: 74, description: { en: 'Water contained in the ocean, affected by inputs, heat and chemical processes.', kk: 'Мұхиттағы су; оған су ағыны, жылу және химиялық үдерістер әсер етеді.' }, sourceIds: ['nasa-sea-level'], lessonSlug: 'sea-level' },
    { id: 'water', label: { en: 'Water', kk: 'Су' }, world: 'ice-water', x: 50, y: 72, description: { en: 'Liquid water connecting climate, ice, ecosystems and human life.', kk: 'Климатты, мұзды, экожүйелерді және адам өмірін байланыстыратын сұйық су.' }, sourceIds: ['nasa-sea-level'], lessonSlug: 'glaciers' },
    { id: 'rainfall', label: { en: 'Rainfall', kk: 'Жауын-шашын' }, world: 'extremes', x: 70, y: 22, description: { en: 'The amount of rain that falls in a place over a period of time.', kk: 'Белгілі бір жерде уақыт аралығында түсетін жаңбыр мөлшері.' }, sourceIds: ['usgs-fire-drought'], lessonSlug: 'drought', reviewItemId: 'rainfall' },
    { id: 'water-scarcity', label: { en: 'Water scarcity', kk: 'Су тапшылығы' }, world: 'extremes', x: 91, y: 36, description: { en: 'A situation in which available water is insufficient for important needs.', kk: 'Қолжетімді су маңызды қажеттіліктерге жеткіліксіз болатын жағдай.' }, sourceIds: ['usgs-fire-drought'], lessonSlug: 'drought' },
    { id: 'biodiversity', label: { en: 'Biodiversity', kk: 'Биоалуантүрлілік' }, world: 'life', x: 28, y: 88, description: { en: 'The variety of living organisms found in an area or across Earth.', kk: 'Белгілі бір аумақта немесе Жерде кездесетін тірі ағзалардың алуан түрлілігі.' }, sourceIds: ['usgs-ecosystems'], lessonSlug: 'habitats' },
    { id: 'carbon-dioxide', label: { en: 'Carbon dioxide', kk: 'Көмірқышқыл газы' }, world: 'earth', x: 22, y: 36, description: { en: 'A gas in the atmosphere that can be absorbed by the ocean and influence seawater chemistry.', kk: 'Атмосферадағы газ; оның бір бөлігі мұхитқа сіңіп, теңіз суының химиясына әсер ете алады.' }, sourceIds: ['noaa-ocean-acidification'], lessonSlug: 'ocean-change' },
    { id: 'ocean', label: { en: 'Ocean', kk: 'Мұхит' }, world: 'ice-water', x: 28, y: 66, description: { en: 'A vast body of salt water that exchanges heat and gases with the atmosphere.', kk: 'Атмосферамен жылу және газ алмасатын тұзды судың орасан зор аймағы.' }, sourceIds: ['noaa-ocean-acidification'], lessonSlug: 'ocean-change', reviewItemId: 'ocean' },
    { id: 'more-acidic-seawater', label: { en: 'More acidic seawater', kk: 'Қышқылдырақ теңіз суы' }, world: 'life', x: 24, y: 76, description: { en: 'Seawater with a lower pH than before; this does not mean the ocean becomes literal acid.', kk: 'Бұрынғыдан pH деңгейі төмен теңіз суы; бұл мұхит тура мағынасында қышқылға айналады дегенді білдірмейді.' }, sourceIds: ['noaa-ocean-acidification'], lessonSlug: 'ocean-change' },
    { id: 'marine-ecosystem', label: { en: 'Marine ecosystem', kk: 'Теңіз экожүйесі' }, world: 'life', x: 18, y: 88, description: { en: 'An ecosystem in the ocean where organisms interact with one another and their physical environment.', kk: 'Мұхиттағы ағзалар бір-бірімен және физикалық ортамен әрекеттесетін экожүйе.' }, sourceIds: ['noaa-ocean-acidification'], lessonSlug: 'ocean-change' },
  ],
  relations: [
    { from: 'atmosphere', to: 'weather', type: 'related_to', label: { en: 'weather happens in the atmosphere', kk: 'ауа райы атмосферада жүреді' } },
    { from: 'weather', to: 'climate', type: 'related_to', label: { en: 'long-term patterns help describe climate', kk: 'ұзақ мерзімді заңдылықтар климатты сипаттайды' } },
    { from: 'climate', to: 'temperature', type: 'related_to', label: { en: 'temperature is one climate variable', kk: 'температура — климат көрсеткіштерінің бірі' } },
    { from: 'temperature', to: 'land-ice-melt', type: 'affects', label: { en: 'temperature affects melt conditions', kk: 'температура еру жағдайына әсер етеді' } },
    { from: 'glacier', to: 'land-ice-melt', type: 'related_to', label: { en: 'glacier ice can melt', kk: 'мұздық мұзы ери алады' } },
    { from: 'land-ice-melt', to: 'ocean-water', type: 'contributes_to', label: { en: 'can add water to the ocean', kk: 'мұхитқа су қоса алады' } },
    { from: 'land-ice-melt', to: 'sea-level', type: 'contributes_to', label: { en: 'can contribute to sea-level rise', kk: 'теңіз деңгейінің көтерілуіне үлес қоса алады' } },
    { from: 'climate', to: 'drought', type: 'related_to', label: { en: 'drought is studied in climate systems', kk: 'құрғақшылық климат жүйесінде зерттеледі' } },
    { from: 'drought', to: 'dry-vegetation', type: 'contributes_to', label: { en: 'can dry vegetation', kk: 'өсімдіктерді құрғата алады' } },
    { from: 'drought', to: 'wildfire-risk', type: 'contributes_to', label: { en: 'can raise wildfire risk', kk: 'өрт қаупін арттыра алады' } },
    { from: 'dry-vegetation', to: 'wildfire-risk', type: 'contributes_to', label: { en: 'dry fuels can raise risk', kk: 'құрғақ материал қауіпті арттыра алады' } },
    { from: 'wildfire', to: 'habitat', type: 'affects', label: { en: 'can affect habitats', kk: 'табиғи ортаға әсер етуі мүмкін' } },
    { from: 'habitat', to: 'ecosystem', type: 'part_of', label: { en: 'habitats are parts of ecosystems', kk: 'табиғи орталар экожүйенің бөліктері' } },
    { from: 'rainfall', to: 'drought', type: 'contributes_to', label: { en: 'unusually low rainfall can contribute to drought', kk: 'жауын-шашынның аз болуы құрғақшылыққа үлес қоса алады' } },
    { from: 'drought', to: 'water-scarcity', type: 'contributes_to', label: { en: 'can reduce available water', kk: 'қолжетімді суды азайта алады' } },
    { from: 'ecosystem', to: 'biodiversity', type: 'related_to', label: { en: 'ecosystems contain diverse life', kk: 'экожүйелерде әртүрлі тіршілік иелері болады' } },
    { from: 'carbon-dioxide', to: 'ocean', type: 'absorbed_by', label: { en: 'some carbon dioxide is absorbed by the ocean', kk: 'көмірқышқыл газының бір бөлігі мұхитқа сіңеді' } },
    { from: 'ocean', to: 'more-acidic-seawater', type: 'related_to', label: { en: 'chemistry can become more acidic', kk: 'химиялық жағдай қышқылдырақ бола алады' } },
    { from: 'more-acidic-seawater', to: 'marine-ecosystem', type: 'affects', label: { en: 'chemical change can affect marine organisms', kk: 'химиялық өзгеріс теңіз ағзаларына әсер етуі мүмкін' } },
  ],
};
