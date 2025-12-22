import { FILTERS } from "../constants/filters.js";

const parseDlaKogo = (dlaKogo) => {
  const isString = typeof dlaKogo === 'string';
  if (!isString) return;

  if (FILTERS.DLA_KOGO.includes(dlaKogo)) {
    return dlaKogo;
  }
};

const parseSwieta = (swieta) => {
  const isString = typeof swieta === 'string';
  if (!isString) return;

  if (FILTERS.SWIETA.includes(swieta)) {
    return swieta;
  }
};

const parsePrice = (priceLabel) => {
  const isString = typeof priceLabel === 'string';
  if (!isString) return;

  const range = FILTERS.PRICE_RANGES.find(r => r.label === priceLabel);
  if (range) {
    return { minPrice: range.min, maxPrice: range.max };
  }
};

export const parseFilterParams = (query) => {
  const { dlaKogo, swieta, cena } = query;

  const parsedDlaKogo = parseDlaKogo(dlaKogo);
  const parsedSwieta = parseSwieta(swieta);
  const parsedPrice = parsePrice(cena);

  const filter = {};

  if (parsedDlaKogo) filter.dlaKogo = parsedDlaKogo;
  if (parsedSwieta) filter.swieta = parsedSwieta;
  if (parsedPrice) {
    filter.price = {
      $gte: parsedPrice.minPrice,
      $lte: parsedPrice.maxPrice
    };
  }

  return filter;
};
