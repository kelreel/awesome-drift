export const colors = {
  brand: {
    100: "#2A2731",
    95: "#322C40",
    90: "#3E3554",
    80: "#4B3C75",
    70: "#502FAE",
    60: "#5A2CDE",
    50: "#6B3EEA", // default
    40: "#8E6CEF",
    30: "#B19AF4",
    20: "#D5C8F9",
    15: "#E3DAFF",
    10: "#F3EEFF",
    5: "#F8F5FF",
  },
  neutral: {
    100: "#000000",
    95: "#1C1C1E",
    90: "#2C2C2E",
    80: "#3A3A3C",
    70: "#48484A",
    60: "#636366",
    50: "#8E8E93", // gray
    40: "#AEAEB2",
    30: "#C7C7CC",
    20: "#D1D1D6",
    10: "#F2F2F7",
    5: "#F8F5FF",
    white: "#FFFFFF",
  },
  success: {
    dark: "#30D158",
    light: "#34C759",
  },
  error: {
    dark: "#FF453A",
    light: "#FF3B30",
    darkFill: "#493837",
    lightFill: "#FFEDEC",
  },
  warning: {
    dark: "#FFD60A",
    light: "#FFCC00",
  },
  information: {
    dark: "#64D2FF",
    light: "#32ADE6",
  },
  focus: {
    dark: "#0A84FF",
    light: "#007AFF",
  },
};

export const spacing = {
  0: 0,
  50: 2,
  100: 4,
  150: 6,
  200: 8,
  300: 12,
  400: 16,
  500: 20,
  600: 24,
  700: 28,
  800: 32,
  1000: 40,
  1200: 48,
  1600: 64,
  2000: 80,
};

export const rounding = {
  0: 0,
  50: 2,
  100: 4,
  150: 6,
  200: 8,
  300: 12,
  400: 16,
  500: 20,
  600: 24,
  700: 28,
  full: 9999,
};

export const borders = {
  0: 0,
  165: 0.66,
  250: 1,
  375: 1.5,
  500: 2,
  750: 3,
  1000: 4,
};

const buttons = {
  variants: {
    primary: {
      color: colors.neutral.white,
      backgroundColor: colors.brand[50],

      "&:focus:not(:disabled), &:hover:not(:disabled)": {
        backgroundColor: colors.brand[60],
      },

      "&:active:not(:disabled)": {
        backgroundColor: colors.brand[70],
      },
    },
    secondary: {
      color: colors.neutral[95],
      backgroundColor: colors.neutral[10],

      "&:focus:not(:disabled), &:hover:not(:disabled)": {
        color: colors.neutral.white,
        backgroundColor: colors.brand[40],
      },

      "&:active:not(:disabled)": {
        color: colors.neutral.white,
        backgroundColor: colors.brand[50],
      },
    },
    outline: {
      color: colors.neutral[95],
      backgroundColor: colors.neutral.white,
      border: `${borders[250]}px dashed ${colors.neutral[20]}`,

      "&:focus:not(:disabled), &:hover:not(:disabled)": {
        color: colors.brand[50],
        backgroundColor: colors.brand[5],
        borderColor: colors.brand[30],
      },

      "&:active:not(:disabled)": {
        color: colors.brand[50],
        backgroundColor: colors.brand[10],
        borderColor: colors.brand[30],
      },
    },
  },
  sizes: {
    medium: {
      padding: `${spacing[300]}px ${spacing[800]}px`,
    },
    large: {
      padding: `${spacing[400]}px ${spacing[800]}px`,
    },
  },
};

export const theme = {
  colors,
  spacing,
  rounding,
  borders,
  buttons,
};
