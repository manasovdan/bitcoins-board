import currencyService from '../../services/currencies'

export const show = ({ params }, res, next) => currencyService().then((currencies) => res.status(200).json(currencies));
