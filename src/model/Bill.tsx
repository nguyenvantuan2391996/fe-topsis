namespace BillModel {
  export interface Bill {
    bill_id: string;
    customer_name: string;
    money: string;
    city: string;
    status: string;
  }
}

export default BillModel;
