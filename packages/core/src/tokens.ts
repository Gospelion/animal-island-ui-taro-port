export const animalTokens = {
  colors: {
    text: '#6f4f28',
    textMuted: '#9b7b55',
    cream: '#fff8df',
    paper: '#fffdf0',
    border: '#d8bd86',
    shadow: 'rgba(95, 73, 39, 0.18)',
    primary: '#16b8aa',
    primaryDark: '#0c958c',
    danger: '#e76767',
    appPink: '#f7b6c8',
    purple: '#cdb5f8',
    appBlue: '#9bd7f4',
    appYellow: '#f8dc75',
    appOrange: '#f5b36a',
    appTeal: '#82d5bb',
    appGreen: '#9fd38a',
    appRed: '#ef8b7d',
    limeGreen: '#b9dc75',
    yellowGreen: '#d8df74',
    brown: '#c9a46a',
    warmPeachPink: '#f6b9a8'
  },
  radius: {
    small: 16,
    middle: 22,
    large: 30,
    pill: 999
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24
  },
  heights: {
    small: 32,
    middle: 45,
    large: 52
  },
  shadow: {
    soft: '0 6px 14px rgba(95, 73, 39, 0.16)',
    press: '0 5px 0 #bdaea0'
  }
} as const;

export type AnimalTokens = typeof animalTokens;
