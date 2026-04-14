import { SerialNumberRequest } from "../types/nicelabel";


export async function printSerialNumbers(body: SerialNumberRequest) {
    const formData = new FormData()
    formData.append('excelFile', body.excelfile)
    formData.append('printerType', body.type)

    const res = await fetch(`/api/nicelabel/automations/serialNumbersNewPrinters`, {
        method: 'POST',
        body: formData
    })

    if (!res.ok) throw new Error("Failed to print serial numbers")

    return await res.json()
}
