import { AlertCircle } from "lucide-react"

interface SearchEmptyProps {
  query: string
}

export function SearchEmpty({ query }: SearchEmptyProps) {
  return (
    <div className="mt-12 rounded-lg border border-border bg-card p-12 text-center">
      <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-medium text-foreground">No results found</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        We couldn't find any matches for <strong>"{query}"</strong>
      </p>
      <p className="mt-3 text-xs text-muted-foreground">
        Try searching for "trust", "form", "test", "funnel", or "question"
      </p>
    </div>
  )
}
