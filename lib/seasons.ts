/**
 * Season detection and configuration system for automatic seasonal theming.
 * Provides season detection based on current date and seasonal configuration data.
 */

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

/**
 * Configuration interface for seasonal theming data.
 */
export interface SeasonalConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  heroImage: string;
  mood: string;
}

/**
 * Detects the current season based on the current date.
 * 
 * Season definitions:
 * - Spring: March (2) - May (4)
 * - Summer: June (5) - August (7)
 * - Autumn: September (8) - November (10)
 * - Winter: December (11) - February (1)
 * 
 * @returns The current season
 */
export function getCurrentSeason(): Season {
  const month = new Date().getMonth();
  
  // Spring: March (2) - May (4)
  if (month >= 2 && month <= 4) return 'spring';
  
  // Summer: June (5) - August (7)  
  if (month >= 5 && month <= 7) return 'summer';
  
  // Autumn: September (8) - November (10)
  if (month >= 8 && month <= 10) return 'autumn';
  
  // Winter: December (11) - February (1)
  return 'winter';
}

/**
 * Gets the seasonal configuration for a given season.
 * Includes color palettes, hero image paths, and mood indicators.
 * 
 * @param season - The season to get configuration for
 * @returns The seasonal configuration object
 */
export function getSeasonalConfig(season: Season): SeasonalConfig {
  const configs: Record<Season, SeasonalConfig> = {
    spring: {
      colors: {
        primary: '#7CB342',  // Fresh green
        secondary: '#FFB74D', // Soft orange
        accent: '#81C784'     // Light green
      },
      heroImage: '/images/hero-spring.png',
      mood: 'fresh-renewal'
    },
    summer: {
      colors: {
        primary: '#FF8A65',  // Warm coral
        secondary: '#FFD54F', // Golden yellow
        accent: '#4DB6AC'     // Cool teal
      },
      heroImage: '/images/hero-summer.png', 
      mood: 'warm-vibrant'
    },
    autumn: {
      colors: {
        primary: '#D84315',  // Deep orange
        secondary: '#FF7043', // Burnt orange
        accent: '#FFB74D'     // Gold
      },
      heroImage: '/images/hero-autumn.png',
      mood: 'warm-cozy'
    },
    winter: {
      colors: {
        primary: '#5C6BC0',  // Cool blue
        secondary: '#78909C', // Slate blue
        accent: '#ECEFF1'     // Light gray
      },
      heroImage: '/images/hero-winter.png',
      mood: 'cool-serene'
    }
  };
  
  return configs[season];
}

/**
 * Gets the hero image path for the current season.
 * Falls back to default hero image if seasonal image doesn't exist.
 * 
 * @returns The hero image path for the current season
 */
export function getSeasonalHeroImage(): string {
  // Seasonal hero images are not yet created — always return the default.
  // The seasonal config lookup is left commented for future use:
  // const season = getCurrentSeason();
  // const config = getSeasonalConfig(season);
  // return config.heroImage;

  return '/images/hero-home.webp';
}