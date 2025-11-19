export type Country = "RO" | "UK";

export interface Component {
  id: string;
  name: string;
  price: number;
  image?: string;
  specs?: Record<string, any>;
  socket?: string;
  tdp?: number;
  wattage?: number;
  type?: string;
}

export interface Build {
  cpu?: Component;
  motherboard?: Component;
  ram1?: Component;
  ram2?: Component;
  gpu?: Component;
  storage1?: Component;
  storage2?: Component;
  psu?: Component;
  case?: Component;
  name?: string;
  country: Country;
  totalPrice?: number;
  createdAt?: string;
}
