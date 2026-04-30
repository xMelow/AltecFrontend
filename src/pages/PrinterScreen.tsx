import { getPrinters } from "../api/printers"
import {PrinterResponse} from "../types/printer"
import PrinterCard from "../components/PrinterCard"
import {useFetch} from "../hooks/useFetch";

export default function PrinterScreen() {
    const {loading, error, result, execute} = useFetch<PrinterResponse>()
    
    async function discoverPrinters() {
        const subnets = ["192.168.0.0/24", "192.168.1.0/24"]

        await execute(() => getPrinters({
            subnets: subnets
        }))
    }

    return (
        <div className="">
            <h2 className="text-center text-3xl font-bold text-altec-teal mb-3">Printers</h2>

            {error && <p className="text-red-500">{error}</p>}

            <div className="flex flex-row justify-center flex-wrap gap-4">
                {result?.printers?.map(el => (
                    <PrinterCard printer={el} key={el.ipAddress} />
                ))}
            </div>

            <button
                className="border bg-altec-teal text-altec-white p-1.5 rounded-xl mt-2"
                onClick={discoverPrinters}
            >
                {loading && loading ? "Loading..." : "Search Printers"}
            </button>
        </div>
    )
}
