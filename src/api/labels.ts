import { LabelPreviewRequest, LabelPreviewResponse } from "../types/label";


export async function getLabelPreview(data: LabelPreviewRequest): Promise<LabelPreviewResponse> {
    const res = await fetch('/tspl/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    if (!res.ok) {
        throw new Error("Failed to fetch label preview")
    }

    return res.json()
}