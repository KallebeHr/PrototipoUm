const apiKey = String(process.env.GOOGLE_PLACES_API_KEY || '').trim()
const placeId = String(process.env.GOOGLE_PLACE_ID || '').trim()
const withLang = process.argv[2] !== 'nolang'

const url = new URL(`https://places.googleapis.com/v1/places/${placeId}`)
if (withLang) {
  url.searchParams.set('languageCode', 'pt-BR')
  url.searchParams.set('regionCode', 'BR')
}
const response = await fetch(url, {
  headers: { 'X-Goog-Api-Key': apiKey, 'X-Goog-FieldMask': 'id,displayName,rating,userRatingCount,reviews' },
})
const body = await response.json()
console.log('HTTP', response.status, '| com idioma:', withLang)
console.log('Campos recebidos:', Object.keys(body).join(', '))
console.log('Quantidade de reviews:', Array.isArray(body.reviews) ? body.reviews.length : 'campo ausente')
if (Array.isArray(body.reviews)) {
  for (const r of body.reviews) {
    console.log('-', r.authorAttribution?.displayName, '|', r.rating, '|', r.relativePublishTimeDescription, '|', (r.text?.text || '').slice(0, 60))
  }
}