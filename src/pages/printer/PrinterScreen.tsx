import { getPrinters } from "../../api/printers"


export default function PrinterScreen() {
    
    async function discoverPrinters() {
        const subnets = ["192.168.0.0/24", "192.168.1.0/24"]

        try {
            const req = await getPrinters({
                subnets: subnets
            })
            console.log(req)

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <h2>Printer Screen</h2>
            <button onClick={discoverPrinters}>Discover printers</button>
        </div>
    )
}
