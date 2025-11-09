"use client"

import { useState } from "react"
import { SearchBar } from "./search-bar"
import { SearchResults } from "./search-results"
import { SearchEmpty } from "./search-empty"

interface SearchResult {
  id: string
  title: string
  body: string
  snippet: string
}

interface SearchResponse {
  results: SearchResult[]
  count: number
  summary: string
  sources: string[]
  query: string
}

export function SearchPage() {
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [summary, setSummary] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [query, setQuery] = useState("")

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setError("Please enter a search term")
      return
    }

    setLoading(true)
    setError(null)
    setResults([])
    setSummary(null)
    setQuery(searchQuery)
    setHasSearched(true)

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchQuery }),
      })

      const data: SearchResponse = await response.json()

      if (!response.ok) {
        setError(data.error || "Search failed")
        setResults([])
        setSummary(null)
      } else {
        setResults(data.results)
        setSummary(data.summary)
        setError(null)
      }
    } catch (err) {
      setError("Failed to search. Please try again.")
      setResults([])
      setSummary(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">FAQ Search</h1>
            <p className="mt-2 text-base text-muted-foreground">Find answers from our knowledge base instantly</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <SearchBar onSearch={handleSearch} loading={loading} />

        {loading && (
          <div className="mt-12 flex flex-col items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-primary" />
            <p className="mt-4 text-sm text-muted-foreground">Searching...</p>
          </div>
        )}

        {error && (
          <div className="mt-8 rounded-lg border border-destructive/50 bg-destructive/5 px-4 py-3">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {hasSearched && !loading && results.length > 0 && (
          <div className="mt-12 space-y-6">
            {summary && (
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-sm text-muted-foreground italic">{summary}</p>
              </div>
            )}
            <SearchResults results={results} query={query} />
          </div>
        )}

        {hasSearched && !loading && results.length === 0 && !error && <SearchEmpty query={query} />}
      </div>
    </main>
  )
}
