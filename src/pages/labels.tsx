import { useState } from "react"
import { getLabelPreview } from "../api/labels"


function LabelScreen() {
    const [labelPreview, setLabelPreview] = useState<string | null>(null)

    async function handlePreview() {
        const result = await getLabelPreview({
            tspl: "",
        })
        setLabelPreview(result.labelPreview)
    }

    return (
        <div>
            <h2>Label preview</h2>
            <button onClick={handlePreview}>Preview Label</button>
        </div>
    )
}

export default LabelScreen