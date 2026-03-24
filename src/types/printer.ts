export type PrinterRequest = {
    subnets: string[]
}

export type PrinterResponse = {
    printers: Printer[]
}

export type Printer = {
    dnsName: string,
    ipAddress: string,
    model: string,
    port: number,
}