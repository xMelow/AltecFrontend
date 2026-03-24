import { useState } from "react"
import { getPrinters } from "../../api/printers"
import { Printer } from "../../types/printer"
import PrinterCard from "../../components/printer/PrinterCard"
import styles from "./PrinterScreen.module.css"


export default function PrinterScreen() {
    const [printers, setPrinters] = useState<Printer[]>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    
    async function discoverPrinters() {
        const subnets = ["192.168.0.0/24", "192.168.1.0/24"]
        setLoading(true)
        setError(null)
        try {
            const printers = await getPrinters({
                subnets: subnets
            })
            setPrinters(printers.printers)
        } catch (err) {
            setError("Failed to load printers")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h2>Printer Screen</h2>
            <button className={styles.button} onClick={discoverPrinters}>Discover printers</button>
            <div className={styles.flexContainer}>
                <p>{loading ? 'Loading...' : ''}</p>
                {error && <p className={styles.error}>{error}</p>}

                { printers?.map(el => (
                    <PrinterCard printer={el} key={el.ipAddress} />
                ))}
            </div>
        </div>
    )
}
