import { useState } from "react"
import { getPrinters } from "../../api/printers"
import { Printer } from "../../types/printer"
import PrinterCard from "../../components/printer/Printer"

export default function PrinterScreen() {
    const [printers, setPrinters] = useState<Printer[]>()
    
    async function discoverPrinters() {
        const subnets = ["192.168.0.0/24", "192.168.1.0/24"]

        try {
            const printers = await getPrinters({
                subnets: subnets
            })
            console.log(printers)
            setPrinters(printers.printers)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <h2>Printer Screen</h2>
            <button onClick={discoverPrinters}>Discover printers</button>
            <div>
                { printers?.map(el => (
                    <PrinterCard printer={el} key={el.ipAddress} />
                ))}
            </div>
        </div>
    )
}
