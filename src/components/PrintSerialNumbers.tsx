import { useState } from "react"
import { printSerialNumbers } from "../api/nicelabel"

export default function PrintSerialNumbers() {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [excelFile, setExcelFile] = useState<File | null>(null)
    const [printerType, setPrinterType] = useState<string>("")

    function handleExcelImport(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files

        if (!files) return

        setExcelFile(files[0])
    }

    function handleSelectPrinterType(e: React.ChangeEvent<HTMLSelectElement>) {
        setPrinterType(e.target.value)
    }

    async function sendRequest() {
        setLoading(true)
        setError("")

        if (excelFile == null) {
            setLoading(false)
            return
        }

        try {
            const request = await printSerialNumbers({
                excelfile: excelFile,
                type: printerType
            })

            console.log(request)
        } catch {
            setError("Failed")
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <div className="">
            <h2>Serie nummers nieuwe printers</h2>

            <label htmlFor="excelFile">Select Excel File</label> <br />
            <input type="file" multiple onChange={(e) => handleExcelImport(e)} /> <br />

            <label htmlFor="type">Printer Types:</label> <br />
            <select name="type" id="type" onChange={(e) => handleSelectPrinterType(e)} >
                <option value="ATP-300NL">ATP-300 Pro NL</option>
                <option value="ATP-300BT">ATP-300 Pro BT</option>
                <option value="ATP-600NL">ATP-600 Pro NL</option>
                <option value="ATP-600BT">ATP-600 Pro BT</option>
                <option value="ATP-3000">ATP-3000</option>                        
            </select> <br />

            <button 
                className=""
                onClick={sendRequest} 
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Print Labels'}
            </button>
        </div>
    )
    
}
