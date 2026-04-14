import { useState } from "react"
import styles from "./NiceLabelScreen.module.css"
import { printSerialNumbers } from "../../api/nicelabel"

export default function NiceLabelScreen() {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [excelFile, setExcelFile] = useState<File | null>(null)

    function handleExcelImport(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files

        if (!files) return

        setExcelFile(files[0])
    }

    async function sendRequest() {
        setLoading(true)
        setError("");

        if (excelFile == null) {
            setLoading(false)
            return
        }

        try {
            const request = await printSerialNumbers({
                excelfile: excelFile,
            })
        } catch {
            setError("Failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h1>NiceLabel Automations</h1>

            <div>
                <h2>Serie nummers nieuwe printers</h2>
                <div>
                    <label htmlFor="excelFile">Select Excel File</label> <br />
                    <input type="file" multiple onChange={(e) => handleExcelImport(e)} />
                    <button 
                        className={styles.button} 
                        onClick={sendRequest} 
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Preview'}
                    </button>
                </div>
            </div>
        </div>
    )
}