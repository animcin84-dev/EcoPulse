export type EducationalMediaAsset = {
  id: string;
  title: string;
  institution: 'NASA Earth Observatory';
  renderSrc: string;
  sourcePage: string;
  credit: string;
  alt: {
    en: string;
    kk: string;
  };
  visualNote?: {
    en: string;
    kk: string;
  };
  width: number;
  height: number;
  usage: string[];
  delivery: 'remote-institutional';
  fallback: 'authored-diagram';
  checkedAt: string;
};

export const educationalMedia: EducationalMediaAsset[] = [
  {
    id: 'atmosphere-limb',
    title: 'Sunset from the International Space Station',
    institution: 'NASA Earth Observatory',
    renderSrc: 'https://assets.science.nasa.gov/dynamicimage/assets/science/esd/eo/images/imagerecords/44000/44267/ISS023-E-57948_lrg.jpg?crop=faces%2Cfocalpoint&fit=clip&h=664&w=1000',
    sourcePage: 'https://science.nasa.gov/earth/earth-observatory/sunset-from-the-international-space-station-44267/',
    credit: 'Astronaut photograph ISS023-E-57948, ISS Crew Earth Observations / NASA-JSC; caption by William L. Stefanov, NASA-JSC.',
    alt: {
      en: 'Earth viewed edge-on from orbit, with thin blue and orange atmospheric layers glowing above the dark horizon.',
      kk: 'Орбитадан қырынан көрінген Жер: қараңғы көкжиектің үстінде атмосфераның жұқа көк және қызғылт сары қабаттары жарқырайды.',
    },
    width: 1000,
    height: 664,
    usage: ['home', 'lesson:atmosphere'],
    delivery: 'remote-institutional',
    fallback: 'authored-diagram',
    checkedAt: '2026-09-10',
  },
  {
    id: 'easton-glacier',
    title: 'Easton Glacier, August 17, 2024',
    institution: 'NASA Earth Observatory',
    renderSrc: 'https://assets.science.nasa.gov/dynamicimage/assets/science/esd/eo/images/imagerecords/153000/153482/eastonglacier_oli2_20240817_lrg.jpg?crop=faces%2Cfocalpoint&fit=clip&h=835&w=1253',
    sourcePage: 'https://science.nasa.gov/earth/earth-observatory/todays-glacial-retreat-is-a-recent-phenomenon-153482/',
    credit: 'NASA Earth Observatory image by Wanmei Liang, using Landsat data from the U.S. Geological Survey.',
    alt: {
      en: 'Landsat satellite view of Easton Glacier on Mount Baker, showing bright glacier ice surrounded by dark green mountain terrain.',
      kk: 'Landsat спутнигінен түсірілген Бейкер тауындағы Истон мұздығы: қою жасыл таулы жердің ортасында ашық түсті мұздық көрінеді.',
    },
    width: 1253,
    height: 835,
    usage: ['lesson:glaciers'],
    delivery: 'remote-institutional',
    fallback: 'authored-diagram',
    checkedAt: '2026-09-10',
  },
  {
    id: 'tidal-wetland-habitat',
    title: "Delaware's Tidal Wetlands",
    institution: 'NASA Earth Observatory',
    renderSrc: 'https://science.nasa.gov/wp-content/uploads/2023/06/doverdelaware-false-oli-20240903.jpg',
    sourcePage: 'https://science.nasa.gov/image-detail/doverdelaware-false-oli-20240903/',
    credit: 'NASA Earth Observatory / Michala Garrison.',
    alt: {
      en: 'False-color Landsat view of tidal wetlands along Delaware Bay, with dark waterways weaving through highlighted marsh and vegetation.',
      kk: 'Делавэр шығанағындағы толысу-батпақты алқаптардың жалған түсті Landsat көрінісі: ерекшеленген батпақтар мен өсімдіктер арасымен қара түсті су арналары тарамдалады.',
    },
    visualNote: {
      en: 'False-color Landsat view: colors are enhanced to distinguish water, marsh, and vegetation and are not literal natural color.',
      kk: 'Жалған түсті Landsat көрінісі: су, батпақ және өсімдіктерді ажырату үшін түстер күшейтілген; бұл табиғи түстердің дәл көрінісі емес.',
    },
    width: 720,
    height: 593,
    usage: ['lesson:habitats'],
    delivery: 'remote-institutional',
    fallback: 'authored-diagram',
    checkedAt: '2026-09-10',
  },
];

export const educationalMediaById = Object.fromEntries(
  educationalMedia.map((asset) => [asset.id, asset]),
) as Record<string, EducationalMediaAsset>;
