import { updateCurrencies, currencies, updateBestCurrency } from '../../services/currencies'

export const show = (req, res, next) => res.status(200).json(currencies);
export const updateCurrency = (req, res, next) => updateCurrencies().then((result) => res.status(200).json(result));
export const bestCurrency = (req, res, next) => res.status(200).json(updateBestCurrency());
