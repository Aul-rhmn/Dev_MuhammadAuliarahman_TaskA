import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SearchResult {
  id: string
  title: string
  body: string
  snippet: string
}

interface SearchResultsProps {
  results: SearchResult[]
  query: string
}

export function SearchResults({ results, query }: SearchResultsProps) {
  return (
    <div className="space-y-3">
      {results.map((result, index) => (
        <Card key={result.id} className="overflow-hidden transition-shadow hover:shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <Badge variant="secondary" className="mb-2">
                  #{index + 1} Match
                </Badge>
                <CardTitle className="text-lg">{result.title}</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">{result.snippet}</p>
            <div className="mt-3 text-xs text-muted-foreground">
              ID: <code className="rounded bg-muted px-2 py-1 font-mono text-foreground">{result.id}</code>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
