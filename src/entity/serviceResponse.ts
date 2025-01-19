export class ServiceResponse<T> {
  data?: T;
  message: string = "";
  status: number;

  constructor(data?: T, message: string = "", status: number = 0) {
    this.data = data;
    this.message = message;
    this.status = status;
  }
}
