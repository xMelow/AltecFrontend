import {Printer} from "../types/printer";
import {Link} from "react-router-dom";

type PrinterCardProps = {
    printer: Printer
}

export default function PrinterCard({printer}: PrinterCardProps) {
    return (
        <div
            className="w-1/5 h-1/4 pl-5 pb-5 pr-5 flex flex-col border rounded-2xl border-altec-teal bg-altec-white justify-center">
            <Link to={`/printers/${printer.ipAddress}`}>

                <div className="flex justify-between items-center pt-2 pb-2">
                    <p className="font-semibold">{printer.printerModel ?? 'Unknown'}</p>
                    <p className="border border-altec-teal bg-altec-light rounded-xl p-1 w-8">🖨️</p>
                </div>

                <div className="border-b border-altec-teal"/>

                <div className="flex justify-between mt-2">
                    <span className="">DNS naam</span>
                    <span className="">{printer.shortDnsName}</span>
                </div>

                <div className="flex justify-between">
                    <span className="">IP Address</span>
                    <span className="">{printer.ipAddress}</span>
                </div>

                <div className="flex justify-between">
                    <span className="">Port</span>
                    <span className="">{printer.port}</span>
                </div>
            </Link>
        </div>
    )
}
