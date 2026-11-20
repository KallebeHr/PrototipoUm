// Descobre o Place ID do escritório e testa a chave da Places API (New).
// Buscar pelo nome:
//   node --env-file=.env.local scripts/find-place-id.mjs "Nome do escritório Cidade UF"
// Testar um Place ID já escolhido:
//   node --env-file=.env.local scripts/find-place-id.mjs ChIJxxxxxxxxxxxx

const apiKey = String(process.env.GOOGLE_PLACES_API_KEY || '').trim()
const input = process.argv.slice(2).join(' ').trim()

if (!apiKey) {
  console.error('GOOGLE_PLACES_API_KEY não encontrada. Confira o .env.local e o uso de --env-file.')
  process.exit(1)
}
if (!input) {
  console.error('Informe o nome do escritório (ou um Place ID).')
  process.exit(1)
}

async function call (url, options) {
  const response = await fetch(url, { ...options, signal: AbortSignal.timeout(10000) })
  const body = await response.json().catch(() => ({}))
  if (!response.ok) {
    console.error(`\nErro ${response.status} do Google: ${body.error?.status || ''}`)
    console.error(body.error?.message || 'Sem detalhes.')
    if (response.status === 403) {
      console.error('\nVerifique: Places API (New) ativada, faturamento vinculado e restrição da chave (deve incluir Places API (New)).')
    }
    process.exit(1)
  }
  return body
}

if (/^ChIJ[\w-]+$/.test(input)) {
  const url = new URL(`https://places.googleapis.com/v1/places/${input}`)
  url.searchParams.set('languageCode', 'pt-BR')
  const place = await call(url, {
    headers: {
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'id,displayName,formattedAddress,rating,userRatingCount,googleMapsUri',
    },
  })
  console.log('\nChave e Place ID funcionando:\n')
  console.log(`Nome:       ${place.displayName?.text}`)
  console.log(`Endereço:   ${place.formattedAddress}`)
  console.log(`Nota:       ${place.rating ?? 'sem nota'} (${place.userRatingCount ?? 0} avaliações)`)
  console.log(`Maps:       ${place.googleMapsUri}`)
} else {
  const result = await call('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount',
    },
    body: JSON.stringify({ textQuery: input, languageCode: 'pt-BR', regionCode: 'BR', pageSize: 5 }),
  })
  const places = result.places || []
  if (!places.length) {
    console.log('Nenhum resultado. Tente incluir cidade e estado no nome.')
    process.exit(0)
  }
  console.log('\nCandidatos (confira nome e endereço):\n')
  for (const place of places) {
    console.log(`GOOGLE_PLACE_ID=${place.id}`)
    console.log(`  ${place.displayName?.text} — ${place.formattedAddress}`)
    console.log(`  Nota: ${place.rating ?? 'sem nota'} (${place.userRatingCount ?? 0} avaliações)\n`)
  }
}