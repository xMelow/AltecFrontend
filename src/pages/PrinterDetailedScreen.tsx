import { useState, useRef, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"
import { getPrinterSettings, sendPrinterCommand } from "../api/printers"
import { PrinterSettings } from "../types/printer"

type CommandGroup = {
    label: string
    commands: { label: string; command: string }[]
}

const COMMAND_GROUPS: CommandGroup[] = [
    {
        label: "Status & Diagnostics",
        commands: [
            { label: "Status", command: "STATUS" },
            { label: "Get Config", command: "GET CONFIG" },
            { label: "Self Test", command: "SELFTEST" },
            { label: "Self Test Page", command: "SELFTEST PAGE" },
        ],
    },
    {
        label: "Paper Control",
        commands: [
            { label: "Feed", command: "FEED" },
            { label: "Form Feed", command: "FORMFEED" },
            { label: "Home", command: "HOME" },
            { label: "End of Page", command: "EOP" },
        ],
    },
    {
        label: "Print Buffer",
        commands: [
            { label: "Clear Buffer", command: "CLS" },
            { label: "Print 1 Copy", command: "PRINT 1" },
        ],
    },
    {
        label: "Calibration",
        commands: [
            { label: "Calibrate", command: "CALIBRATE" },
            { label: "Gap Detect", command: "GAPDETECT" },
            { label: "Black Mark Detect", command: "BLINEDETECT" },
            { label: "Auto Detect", command: "AUTODETECT" },
        ],
    },
    {
        label: "Tear / Peel / Cutter",
        commands: [
            { label: "Tear On", command: "SET TEAR ON" },
            { label: "Tear Off", command: "SET TEAR OFF" },
            { label: "Peel On", command: "SET PEEL ON" },
            { label: "Peel Off", command: "SET PEEL OFF" },
            { label: "Cutter On", command: "SET CUTTER ON" },
            { label: "Cutter Off", command: "SET CUTTER OFF" },
        ],
    },
    {
        label: "System",
        commands: [
            { label: "Reprint On", command: "SET REPRINT ON" },
            { label: "Reprint Off", command: "SET REPRINT OFF" },
            { label: "Reset", command: "RESET" },
        ],
    },
]

type LogEntry = {
    type: "sent" | "received" | "error"
    text: string
    timestamp: string
}

function SettingRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between items-center py-1.5 border-b border-altec-light last:border-0">
            <span className="text-gray-500 text-sm">{label}</span>
            <span className="font-medium text-sm text-right ml-4">{value}</span>
        </div>
    )
}

export default function PrinterDetailedScreen() {
    const { ipAddress } = useParams<{ ipAddress: string }>()
    const [commandInput, setCommandInput] = useState("")
    const [log, setLog] = useState<LogEntry[]>([])
    const [sending, setSending] = useState(false)
    const logEndRef = useRef<HTMLDivElement>(null)

    const settingsFetch = useFetch<PrinterSettings>()

    useEffect(() => {
        if (ipAddress) {
            settingsFetch.execute(() => getPrinterSettings(ipAddress))
        }
    }, [ipAddress])

    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [log])

    function addLog(type: LogEntry["type"], text: string) {
        const timestamp = new Date().toLocaleTimeString()
        setLog(prev => [...prev, { type, text, timestamp }])
    }

    async function sendCommand(command: string) {
        const trimmed = command.trim()
        if (!ipAddress || !trimmed) return
        addLog("sent", trimmed)
        setSending(true)
        try {
            const res = await sendPrinterCommand(ipAddress, trimmed)
            if (res.response) addLog("received", res.response)
        } catch (err) {
            addLog("error", err instanceof Error ? err.message : "Failed to send command")
        } finally {
            setSending(false)
        }
    }

    async function handleSend() {
        await sendCommand(commandInput)
        setCommandInput("")
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const settings = settingsFetch.result

    return (
        <div>
            <h2 className="text-center text-3xl font-bold text-altec-teal mb-4">
                {ipAddress}
            </h2>

            <div className="flex gap-4 items-start">

                {/* Left: Command Buttons */}
                <div className="w-1/5 flex flex-col border rounded-2xl border-altec-teal bg-altec-white p-4 overflow-y-auto max-h-[75vh]">
                    <h3 className="text-lg font-semibold mb-2">Commands</h3>
                    <hr className="border-b border-altec-teal mb-3" />
                    <div className="flex flex-col gap-4">
                        {COMMAND_GROUPS.map(group => (
                            <div key={group.label}>
                                <p className="text-xs font-semibold text-altec-teal uppercase tracking-wide mb-1.5">
                                    {group.label}
                                </p>
                                <div className="flex flex-col gap-1">
                                    {group.commands.map(cmd => (
                                        <button
                                            key={cmd.command}
                                            className="text-left text-sm border border-altec-teal rounded-lg px-2 py-1.5 hover:bg-altec-light transition-colors disabled:opacity-40"
                                            onClick={() => sendCommand(cmd.command)}
                                            disabled={sending}
                                        >
                                            {cmd.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Center: Printer Settings */}
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

                {/* Right: Command Terminal */}
                <div className="flex-1 flex flex-col border rounded-2xl border-altec-teal bg-altec-white p-4 max-h-[75vh]">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold">Terminal</h3>
                        <button
                            className="text-xs text-gray-400 hover:text-red-400 transition-colors"
                            onClick={() => setLog([])}
                        >
                            Clear
                        </button>
                    </div>
                    <hr className="border-b border-altec-teal mb-3" />

                    {/* Log output */}
                    <div className="flex-1 bg-altec-light rounded-xl p-3 font-mono text-sm overflow-y-auto mb-3 min-h-64">
                        {log.length === 0 && (
                            <p className="text-gray-400 text-xs">Send a command to see output here...</p>
                        )}
                        {log.map((entry, i) => (
                            <div key={i} className="mb-1 leading-snug">
                                <span className="text-gray-400 text-xs mr-2 select-none">{entry.timestamp}</span>
                                {entry.type === "sent" && (
                                    <span className="text-altec-teal font-semibold">&gt; {entry.text}</span>
                                )}
                                {entry.type === "received" && (
                                    <span className="text-altec-dark whitespace-pre-wrap">{entry.text}</span>
                                )}
                                {entry.type === "error" && (
                                    <span className="text-red-500">{entry.text}</span>
                                )}
                            </div>
                        ))}
                        <div ref={logEndRef} />
                    </div>

                    {/* Input area */}
                    <div className="flex gap-2">
                        <textarea
                            className="flex-1 border border-altec-teal rounded-xl p-2 text-sm font-mono resize-none bg-altec-white focus:outline-none focus:ring-1 focus:ring-altec-teal"
                            rows={3}
                            value={commandInput}
                            onChange={e => setCommandInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter TSPL command... (Enter to send, Shift+Enter for new line)"
                            disabled={sending}
                        />
                        <button
                            className="border bg-altec-teal text-altec-white px-4 rounded-xl self-stretch disabled:opacity-50"
                            onClick={handleSend}
                            disabled={sending || !commandInput.trim()}
                        >
                            {sending ? "..." : "Send"}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
