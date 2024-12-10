import ClearDayIcon from '../assets/clear-day.svg?react';
import ClearNightIcon from '../assets/clear-night.svg?react';
import PartlyCloudlyDayIcon from '../assets/partly-cloudy-day.svg?react';
import PartlyCloudlyNightIcon from '../assets/partly-cloudy-night.svg?react';
import CloudyIcon from '../assets/cloudy.svg?react';
import OvercastDayIcon from '../assets/overcast-day.svg?react';
import OvercastNightIcon from '../assets/overcast-night.svg?react';
import MistIcon from '../assets/mist.svg?react';
import PartlyCloudlyDayRainIcon from '../assets/partly-cloudy-day-rain.svg?react';
import PartlyCloudlyNightRainIcon from '../assets/partly-cloudy-night-rain.svg?react';
import PartlyCloudlyDaySnowIcon from '../assets/partly-cloudy-day-snow.svg?react';
import PartlyCloudlyNightSnowIcon from '../assets/partly-cloudy-night-snow.svg?react';
import PartlyCloudlyDaySleetIcon from '../assets/partly-cloudy-day-sleet.svg?react';
import PartlyCloudlyNightSleetIcon from '../assets/partly-cloudy-night-sleet.svg?react';
import PartlyCloudlyDayDrizzleIcon from '../assets/partly-cloudy-day-drizzle.svg?react';
import PartlyCloudlyNightDrizzleIcon from '../assets/partly-cloudy-night-drizzle.svg?react';
import ThunderstormsDayIcon from '../assets/thunderstorms-day.svg?react';
import ThunderstormsNightIcon from '../assets/thunderstorms-night.svg?react';
import SnowIcon from '../assets/snow.svg?react';
import FogDayIcon from '../assets/fog-day.svg?react';
import FogNightIcon from '../assets/fog-night.svg?react';
import FogIcon from '../assets/fog.svg?react';
import DrizzleIcon from '../assets/drizzle.svg?react';
import RainIcon from '../assets/rain.svg?react';
import SleetIcon from '../assets/sleet.svg?react';
import HailIcon from '../assets/hail.svg?react';
import ThunderstormsDayRainIcon from '../assets/thunderstorms-day-rain.svg?react';
import ThunderstormsNightRainIcon from '../assets/thunderstorms-night-rain.svg?react';
import ThunderstormsRainIcon from '../assets/thunderstorms-rain.svg?react';
import ThunderstormsDaySnowIcon from '../assets/thunderstorms-day-snow.svg?react';
import ThunderstormsNightSnowIcon from '../assets/thunderstorms-night-snow.svg?react';
import ThunderstormsSnowIcon from '../assets/thunderstorms-snow.svg?react';

/**
 * Possible = PartlyCloudly version
 * Patchy/light/moderate/heavy/freezing = Regular version icon
 * Thunderstorms are an exception
 * Patchy light snow with thundder = Day/Night version icon
 * Moderate/heavy snow with thunder = Regular version icon
 */
export const weatherIconCodeMapping = {
  '1000': {
    day: ClearDayIcon,
    night: ClearNightIcon,
  },
  '1003': {
    day: PartlyCloudlyDayIcon,
    night: PartlyCloudlyNightIcon
  },
  '1006': {
    day: CloudyIcon,
    night: CloudyIcon,
  },
  '1009': {
    day: OvercastDayIcon,
    night: OvercastNightIcon
  },
  '1030': {
    day: MistIcon,
    night: MistIcon,
  },
  '1063': {
    day: PartlyCloudlyDayRainIcon,
    night: PartlyCloudlyNightRainIcon
  },
  '1066': {
    day: PartlyCloudlyDaySnowIcon,
    night: PartlyCloudlyNightSnowIcon
  },
  '1069': {
    day: PartlyCloudlyDaySleetIcon,
    night: PartlyCloudlyNightSleetIcon
  },
  '1072': {
    day: PartlyCloudlyDayDrizzleIcon,
    night: PartlyCloudlyNightDrizzleIcon
  },
  '1087': {
    day: ThunderstormsDayIcon,
    night: ThunderstormsNightIcon
  },
  '1114': {
    day: SnowIcon,
    night: SnowIcon
  },
  '1117': {
    day: SnowIcon,
    night: SnowIcon
  },
  '1135': {
    day: FogDayIcon,
    night: FogNightIcon
  },
  '1147': {
    day: FogIcon,
    night: FogIcon
  },
  '1150': {
    day: DrizzleIcon,
    night: DrizzleIcon
  },
  '1153': {
    day: DrizzleIcon,
    night: DrizzleIcon
  },
  '1168': {
    day: DrizzleIcon,
    night: DrizzleIcon,
  },
  '1171': {
    day: DrizzleIcon,
    night: DrizzleIcon
  },
  '1180': {
    day: RainIcon,
    night: RainIcon
  },
  '1183': {
    day: RainIcon,
    night: RainIcon
  },
  '1186': {
    day: RainIcon,
    night: RainIcon
  },
  '1189': {
    day: RainIcon,
    night: RainIcon
  },
  '1192': {
    day: RainIcon,
    night: RainIcon
  },
  '1195': {
    day: RainIcon,
    night: RainIcon
  },
  '1198': {
    day: RainIcon,
    night: RainIcon
  },
  '1201': {
    day: RainIcon,
    night: RainIcon
  },
  '1204': {
    day: SleetIcon,
    night: SleetIcon
  },
  '1207': {
    day: SleetIcon,
    night: SleetIcon
  },
  '1210': {
    day: SnowIcon,
    night: SnowIcon
  },
  '1213': {
    day: SnowIcon,
    night: SnowIcon
  },
  '1216': {
    day: SnowIcon,
    night: SnowIcon
  },
  '1219': {
    day: SnowIcon,
    night: SnowIcon
  },
  '1222': {
    day: SnowIcon,
    night: SnowIcon
  },
  '1225': {
    day: SnowIcon,
    night: SnowIcon
  },
  '1237': {
    day: HailIcon,
    night: HailIcon
  },
  '1240': {
    day: RainIcon,
    night: RainIcon
  },
  '1243': {
    day: RainIcon,
    night: RainIcon
  },
  '1246': {
    day: RainIcon,
    night: RainIcon
  },
  '1249': {
    day: SleetIcon,
    night: SleetIcon
  },
  '1252': {
    day: SleetIcon,
    night: SleetIcon
  },
  '1255': {
    day: SnowIcon,
    night: SnowIcon
  },
  '1258': {
    day: SnowIcon,
    night: SnowIcon
  },
  '1261': {
    day: HailIcon,
    night: HailIcon
  },
  '1264': {
    day: HailIcon,
    night: HailIcon
  },
  '1273': {
    day: ThunderstormsDayRainIcon,
    night: ThunderstormsNightRainIcon
  },
  '1276': {
    day: ThunderstormsRainIcon,
    night: ThunderstormsRainIcon
  },
  '1279': {
    day: ThunderstormsDaySnowIcon,
    night: ThunderstormsNightSnowIcon
  },
  '1282': {
    day: ThunderstormsSnowIcon,
    night: ThunderstormsSnowIcon
  }
};
