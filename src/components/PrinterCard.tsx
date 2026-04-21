import { Printer } from "../types/printer";
import styles from "./printer/PrinterCard.module.css"

type PrinterCardProps = {
    printer: Printer
}

export default function PrinterCard({ printer }: PrinterCardProps) {
  return (
    <div className={styles.card}>

      <div className={styles.cardHeader}>
        <div className={styles.printerIcon}>🖨️</div>
        <div>
          <p className={styles.cardTitle}>{printer.model ?? 'Unknown'}</p>
          <p className={styles.cardSubtitle}>{printer.dnsName}</p>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.row}>
        <span className={styles.label}>IP Address</span>
        <span className={styles.value}>{printer.ipAddress}</span>
      </div>

      <div className={styles.row}>
        <span className={styles.label}>Port</span>
        <span className={styles.value}>{printer.port}</span>
      </div>

    </div>
  )
}