import { Printer, PrinterRequest } from "../types/printer"

export async function getPrinters(data: PrinterRequest): Promise<Array<Printer>> {
    const params = new URLSearchParams()
    data.subnets.forEach(subnet => params.append('subnets', subnet))

    const res = await fetch(`/api/printer/discover?${params}`, {
        method: "GET",
    })

    if (!res.ok) throw new Error("Failed to fetch printers")

    return res.json()
}