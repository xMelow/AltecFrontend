import {useEffect} from "react";
import {useFetch} from "../hooks/useFetch";
import {Printer, PrinterSettings} from "../types/printer";
import {getPrinterSettings} from "../api/printers";

type SettingsRowProps = {
    ipAddress: string | undefined
}

export default function SettingsRow({ipAddress}: SettingsRowProps) {
    const settingsFetch = useFetch<PrinterSettings>()
    const settings = settingsFetch.result

    useEffect(() => {
        if (ipAddress) {
            settingsFetch.execute(() => getPrinterSettings(ipAddress))
        }
    }, [ipAddress])


    function SettingRow({ label, value }: { label: string; value: string }) {
        return (
            <div className="flex justify-between items-center py-1.5 border-b border-altec-light last:border-0">
                <span className="text-gray-500 text-sm">{label}</span>
                <span className="font-medium text-sm text-right ml-4">{value}</span>
            </div>
        )
    }

    return (
        <div className="w-1/4 flex flex-col border rounded-2xl border-altec-teal bg-altec-white p-4 max-h-[75vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-2">Printer Settings</h3>
            <hr className="border-b border-altec-teal mb-3" />
            {settingsFetch.loading && (
                <p className="text-sm text-altec-teal">Loading...</p>
            )}
            {settingsFetch.error && (
                <p className="text-sm text-red-500">{settingsFetch.error}</p>
            )}
            <div className="flex flex-col">
                {settings ? (
                    <>
                        <SettingRow label="IP Address" value={settings.ipAddress} />
                        <SettingRow label="Model" value={settings.printerModel} />
                        <SettingRow label="DNS Name" value={settings.dnsName} />
                        <SettingRow label="Short DNS" value={settings.shortDnsName} />
                        <SettingRow label="Port" value={String(settings.port)} />
                        {settings.firmwareVersion && <SettingRow label="Firmware" value={settings.firmwareVersion} />}
                        {settings.serialNumber && <SettingRow label="Serial" value={settings.serialNumber} />}
                        {settings.resolution && <SettingRow label="Resolution" value={settings.resolution} />}
                        {settings.printSpeed && <SettingRow label="Print Speed" value={settings.printSpeed} />}
                        {settings.printDensity && <SettingRow label="Density" value={settings.printDensity} />}
                        {settings.labelType && <SettingRow label="Label Type" value={settings.labelType} />}
                        {settings.mediaType && <SettingRow label="Media Type" value={settings.mediaType} />}
                        {settings.cuts && <SettingRow label="Cuts" value={settings.cuts} />}
                    </>
                ) : !settingsFetch.loading && (
                    <SettingRow label="IP Address" value={ipAddress ?? ""} />
                )}
            </div>
        </div>
    )
}