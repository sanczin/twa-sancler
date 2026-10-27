export async function getJSON(url) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Não foi possível carregar os dados (HTTP ${res.status}).`)
  }
  return res.json()
}
