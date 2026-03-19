import { useState } from "react"
import { getLabelPreview } from "../api/labels"

function LabelScreen() {
  const [labelTspl, setLabelTspl] = useState<string>("")
  const [labelPreview, setLabelPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  async function handlePreview() {
    setLoading(true)
    setError(null)
    try {
      const url = await getLabelPreview({ tspl: labelTspl })
      setLabelPreview(url)
    } catch (err) {
      setError('Failed to load preview')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Label Preview</h2>

      <textarea
        value={labelTspl}
        onChange={e => setLabelTspl(e.target.value)}
        placeholder="Enter TSPL code..."
        rows={6}
      />

      <button onClick={handlePreview} disabled={loading}>
        {loading ? 'Loading...' : 'Preview Label'}
      </button>

      {error && <p>{error}</p>}

      {labelPreview && (
        <img src={labelPreview} alt="Label preview" />
      )}
    </div>
  )
}

export default LabelScreen