import {useState} from "react"
import {getLabelPreview} from "../api/labels"

export default function TsplScreen() {
    // result and param needed
    const [labelTspl, setLabelTspl] = useState<string>("")
    const [labelPreview, setLabelPreview] = useState<string | null>(null)
    const [showBlockOutline, setBlockOutline] = useState<boolean>(false)
    const [labelImages, setLabelImages] = useState<Record<string, string>>({})

    // request and response handling
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    async function handlePreview() {
        setError(null)
        setLoading(true)
        try {
            const url = await getLabelPreview({
                tspl: labelTspl,
                showBlockOutlines: showBlockOutline,
                images: labelImages
            })
            setLabelPreview(url)
        } catch (err) {
            setError('Failed to load preview')
        } finally {
            setLoading(false)
        }
    }

    function handleImageImport(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files
        if (!files) return

        Array.from(files).forEach(file => {
            const reader = new FileReader()
            reader.onload = () => {
                const base64 = (reader.result as string).split(',')[1]
                setLabelImages(prev => ({
                    ...prev,
                    [file.name]: base64
                }))
            }
            reader.readAsDataURL(file)
        })
    }

    return (
        <div className="">
            <h2>Label Preview</h2>

            <div className="">
                <div className="">
          <textarea
              className=""
              value={labelTspl}
              onChange={e => setLabelTspl(e.target.value)}
              placeholder="Enter TSPL code..."
              rows={35}
          />
                    {error && <p className="">{error}</p>}
                </div>

                <div className="">
                    <h2>settings</h2>
                    <div>
                        <label htmlFor="labelImages">Select images</label>
                        <input type="file" multiple onChange={(e) => handleImageImport(e)}/>
                        <label htmlFor="showBlockOutline">Show block outline</label>
                        <input type="checkbox" name="showBlockOutline" id="showBlockOutline"
                               onClick={() => setBlockOutline(!showBlockOutline)}/>
                    </div>

                    <button
                        className=""
                        onClick={handlePreview}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Preview'}
                    </button>
                </div>

                <div className="">
                    {labelPreview
                        ? <img
                            className=""
                            src={labelPreview}
                            alt="Label preview"
                        />
                        : <p className="">Preview will appear here</p>
                    }
                </div>
            </div>
        </div>
    )
}
