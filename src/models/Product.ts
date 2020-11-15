import * as Yup from 'yup';

export type Product = {
  id: string,
  description: string,
  flavor: string,
  price: number,
  count: number,
};

export const ProductSchema = Yup.object().shape({
  description: Yup.string(),
  flavor: Yup.string().required(),
  price: Yup.number().required(),
});
