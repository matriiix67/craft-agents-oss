interface LocalFontData {
  postscriptName: string
  fullName: string
  family: string
  style: string
}

interface Window {
  queryLocalFonts?: () => Promise<LocalFontData[]>
}
