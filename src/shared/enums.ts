export enum Role {
  Admin = "ADMIN",
  Employee = "EMPLOYEE",
  Manager = "MANAGER",
  Shipper = "SHIPPER",
  Branch = "BRANCH",
}

export enum OrderStatus {
  Processing = "PROCESSING",
  Approved = "APPROVED",
  Shipping = "SHIPPING",
  Completed = "COMPLETED",
  Cancelled = "CANCELLED",
  Returned = "RETURNED",
}

export enum Payment {
  Cash = "CASH",
  Banking = "BANKING",
}
