export const decimalTransformer = {
  to: (value?: number | null) => (typeof value === 'number' ? value : null),
  from: (value?: string | number | null) => {
    if (value === null || value === undefined) {
      return null;
    }

    if (typeof value === 'number') {
      return value;
    }

    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  },
};
