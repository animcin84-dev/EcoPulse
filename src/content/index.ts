import { atmosphereLesson } from './lessons/atmosphere.ts';
import { weatherClimateLesson } from './lessons/weather-climate.ts';
import { glaciersLesson } from './lessons/glaciers.ts';
import { seaLevelLesson } from './lessons/sea-level.ts';
import { droughtLesson } from './lessons/drought.ts';
import { wildfireExtremeWeatherLesson } from './lessons/wildfire-extreme-weather.ts';
import { habitatsLesson } from './lessons/habitats.ts';
import { oceanChangeLesson } from './lessons/ocean-change.ts';
import { missions } from './missions.ts';
import { homeTopics } from './home-topics.ts';

export {
  atmosphereLesson,
  weatherClimateLesson,
  glaciersLesson,
  seaLevelLesson,
  droughtLesson,
  wildfireExtremeWeatherLesson,
  habitatsLesson,
  oceanChangeLesson,
  missions,
  homeTopics,
};

export const lessonSequence = [
  atmosphereLesson,
  weatherClimateLesson,
  glaciersLesson,
  seaLevelLesson,
  droughtLesson,
  wildfireExtremeWeatherLesson,
  habitatsLesson,
  oceanChangeLesson,
] as const;

export const lessonsBySlug = {
  [atmosphereLesson.slug]: atmosphereLesson,
  [weatherClimateLesson.slug]: weatherClimateLesson,
  [glaciersLesson.slug]: glaciersLesson,
  [seaLevelLesson.slug]: seaLevelLesson,
  [droughtLesson.slug]: droughtLesson,
  [wildfireExtremeWeatherLesson.slug]: wildfireExtremeWeatherLesson,
  [habitatsLesson.slug]: habitatsLesson,
  [oceanChangeLesson.slug]: oceanChangeLesson,
} as const;
