export type PrinterRequest = {
    subnets: string[]
}

export type PrinterResponse = {
    printers: Printer[]
}

export type Printer = {
    dnsName: string,
    shortDnsName: string,
    ipAddress: string,
    printerModel: string,
    port: number,
}