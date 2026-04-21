import { Printer } from "../types/printer";

type PrinterCardProps = {
    printer: Printer
}

export default function PrinterCard({ printer }: PrinterCardProps) {
  return (
    <div className="">

      <div className="">
        <div className="">🖨️</div>
        <div>
          <p className="">{printer.model ?? 'Unknown'}</p>
          <p className="">{printer.dnsName}</p>
        </div>
      </div>

      <div className="" />

      <div className="">
        <span className="">IP Address</span>
        <span className="">{printer.ipAddress}</span>
      </div>

      <div className="">
        <span className="">Port</span>
        <span className="">{printer.port}</span>
      </div>

    </div>
  )
}