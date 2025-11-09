export interface FAQ {
  id: string
  title: string
  body: string
}

export interface SearchResult extends FAQ {
  snippet: string
}

export interface SearchResponse {
  results: SearchResult[]
  count: number
  summary: string
  sources: string[]
  query: string
}
