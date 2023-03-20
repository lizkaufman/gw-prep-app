import { ImageProps } from "next/image";

export interface ItemDetails {
  id: number;
  name: string;
  price: string;
  image?: ImageProps;
}
