import { useState } from "react"
import { getLabelPreview } from "../../api/labels"
import styles from "./labels.module.css"


function LabelScreen() {
  const [labelTspl, setLabelTspl] = useState<string>("")
  const [labelPreview, setLabelPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  async function handlePreview() {
    setError(null)
    setLoading(true)
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
  <div className={styles.page}>
    <h2>Label Preview</h2>

    <div className={styles.layout}>

      <div className={styles.editor}>
        <textarea
          className={styles.textArea}
          value={labelTspl}
          onChange={e => setLabelTspl(e.target.value)}
          placeholder="Enter TSPL code..."
          rows={35}
        />
        <button 
          className={styles.button} 
          onClick={handlePreview} 
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Preview Label'}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </div>

      <div className={styles.preview}>
        {labelPreview
          ? <img 
              className={styles.labelPreview} 
              src={labelPreview} 
              alt="Label preview" 
            />
          : <p className={styles.placeholder}>Preview will appear here</p>
        }
      </div>

    </div>
  </div>
)
}

export default LabelScreen