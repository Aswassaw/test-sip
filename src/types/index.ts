export type ListPengerjaanServiceType = {
  id: number;
  service_name: string;
};

export type ListPengerjaanJsonType = {
  id: number;
  group: string;
  parent_description: null | string;
  description: string;
  mandatory: number;
  sequence: number;
  parent: string;
  type: string;
  is_multiple: number;
  remark: null | string;
  value: string;
};

export type ListPengerjaanServiceJsonType = {
  service_id: {
    id: number;
    service_name: string;
  };
  json: ListPengerjaanJsonType[];
};

export type ListPengerjaanType = {
  order_id: number;
  order_no: string;
  services: ListPengerjaanServiceType[];
  services_json: ListPengerjaanServiceJsonType[];
};
