import PrintSerialNumbers from "../../components/printSerialNumbers/PrintSerialNumbers"
import styles from "./NiceLabelScreen.module.css"

export default function NiceLabelScreen() {
    return (
        <div>
            <h1>NiceLabel SDK</h1>

            <div className={styles.systems}>
                <PrintSerialNumbers />
            </div>
        </div>
    )
}
