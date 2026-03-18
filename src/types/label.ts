export type LabelPreviewRequest = {
    tspl: string
    showBlockOutline?: boolean
    images?: {
        name: string
        imageInBase64: string
    }
}

export type LabelPreviewResponse = {
    labelPreview: string

}