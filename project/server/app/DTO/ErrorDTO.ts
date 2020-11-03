export class ErrorDTO {
    message: any;
    status: number;
    constructor(msg: any, status?: number) {
        this.message = msg;
        this.status = status || 0;
    }
}