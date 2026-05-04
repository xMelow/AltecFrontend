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

export type PrinterSettings = {
    ipAddress: string
    printerModel: string
    dnsName: string
    shortDnsName: string
    port: number
    firmwareVersion?: string
    serialNumber?: string
    resolution?: string
    printSpeed?: string
    printDensity?: string
    labelType?: string
    mediaType?: string
    cuts?: string
}

export type CommandResponse = {
    response: string
    success: boolean
}

export type PrinterSettings = {
    ipAddress: string
    printerModel: string
    dnsName: string
    shortDnsName: string
    port: number
    firmwareVersion?: string
    serialNumber?: string
    resolution?: string
    printSpeed?: string
    printDensity?: string
    labelType?: string
    mediaType?: string
    cuts?: string
}

export type CommandResponse = {
    response: string
    success: boolean
}