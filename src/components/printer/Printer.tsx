import { Printer } from "../../types/printer";

type PrinterCardProps = {
    printer: Printer
}

export default function PrinterCard({ printer }: PrinterCardProps) {
    return (
        <div>
            <p>{printer.dnsName}</p>
            <p>{printer.model}</p>
            <p>{printer.ipAddress}</p>
            <p>{printer.port}</p>
        </div>
    )
}