import { type NextRequest, NextResponse } from "next/server"
import faqs from "@/data/faqs.json"

interface FAQ {
  id: string
  title: string
  body: string
}

interface SearchResult extends FAQ {
  score: number
  snippet: string
}

function calculateScore(query: string, faq: FAQ): number {
  const lowerQuery = query.toLowerCase()
  const searchText = `${faq.title} ${faq.body}`.toLowerCase()

  const terms = lowerQuery.split(/\s+/).filter((t) => t.length > 0)

  let score = 0

  terms.forEach((term) => {

    if (faq.title.toLowerCase() === lowerQuery) {
      score += 1000
    }
    if (faq.title.toLowerCase().includes(term)) {
      score += 100
    }
    if (new RegExp(`\\b${term}`, "i").test(searchText)) {
      score += 50
    }
    if (searchText.includes(term)) {
      score += 10
    }
  })

  const matchCount = terms.filter((term) => searchText.includes(term)).length
  score += matchCount * 5

  return score
}

function getSnippet(body: string, query: string, maxLength = 120): string {
  const lowerBody = body.toLowerCase()
  const lowerQuery = query.toLowerCase()

  const index = lowerBody.indexOf(lowerQuery)

  if (index !== -1) {
    const start = Math.max(0, index - 20)
    const end = Math.min(body.length, index + lowerQuery.length + 100)
    let snippet = body.substring(start, end)

    if (start > 0) snippet = "..." + snippet
    if (end < body.length) snippet = snippet + "..."

    return snippet
  }

  if (body.length > maxLength) {
    return body.substring(0, maxLength) + "..."
  }

  return body
}

function generateSummary(results: SearchResult[]): string {
  if (results.length === 0) return ""

  const titles = results.map((r) => r.title).join(", ")
  const metrics = results
    .flatMap((r) => r.body.match(/\d+%/g) || [])
    .slice(0, 2)
    .join(" and ")

  if (metrics) {
    return `Results highlight: ${titles}. Key improvements: ${metrics}.`
  }

  return `Found information about: ${titles}.`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query } = body

    if (!query || typeof query !== "string" || query.trim().length === 0) {
      return NextResponse.json({ error: "Query is required and must be a non-empty string" }, { status: 400 })
    }

    const trimmedQuery = query.trim()

    const scored = faqs.map((faq) => ({
      ...faq,
      score: calculateScore(trimmedQuery, faq),
      snippet: getSnippet(faq.body, trimmedQuery),
    }))

    const results = scored
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)

    const responseResults = results.map(({ score, ...rest }) => rest)

    const summary = generateSummary(results)
    const sources = results.map((r) => r.id)

    return NextResponse.json({
      results: responseResults,
      count: responseResults.length,
      summary: summary || "No matches found for your query.",
      sources,
      query: trimmedQuery,
    })
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
