export type MethodologyShareLocale = 'en' | 'kk';

export type MethodologySharePayload = {
  title: string;
  text: string;
  url: string;
};

export function methodologySharePayload(locale: MethodologyShareLocale, url: string): MethodologySharePayload {
  return locale === 'kk'
    ? {
        title: 'EcoPulse — оқу және ғылым әдісі',
        text: 'EcoPulse әдісі: ағылшын тілі, ғылыми байланыстар, дәлелге негізделген mastery және қауіпсіз real-world әрекеттер.',
        url,
      }
    : {
        title: 'EcoPulse — science and learning method',
        text: 'See the EcoPulse method: environmental English, semantic science connections, evidence-based mastery and safe real-world action.',
        url,
      };
}
