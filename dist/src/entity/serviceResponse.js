export class ServiceResponse {
    data;
    message = "";
    status;
    constructor(data, message = "", status = 0) {
        this.data = data;
        this.message = message;
        this.status = status;
    }
}
