export interface Data {
  records: Record[];
}

export interface Record {
  createdTime: Date;
  id: string;
  fields: Expedition;
}

export interface Expedition {
  short_description: string;
  long_description: string;
  description: string;
  end_date: Date;
  idv: number;
  location: string;
  main_picture: any;
  price_bronze: string;
  price_gold: string;
  price_silver: '4000';
  start_date: Date;
  title: string;
  bronze_description: string;
  silver_description: string;
  gold_description: string;
  additional_pictures: string;
  disclaimer: string;
  included_list: string;
  bronze_payment_link: string;
}
