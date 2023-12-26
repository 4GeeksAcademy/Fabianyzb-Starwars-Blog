const baseUrl = 'https://www.swapi.tech/api'

async function makeRequest(url, method = 'GET', body = null) {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body && JSON.stringify(body),
  })
  const data = await response.json()
  if (!response.ok) {
    const newError = new Error(data.message)
    newError.httpStatus = response.status
    throw newError
  }
  return data
}

export async function fetchList({ type, url }) {
  const response = await makeRequest(
    url ??
      `${baseUrl}/${type === 'characters' ? 'people' : type}?page=1&limit=10`
  )
  return response
}

export async function fetchDetails({ type, uid }) {
  const response = await makeRequest(
    `${baseUrl}/${type === 'character' ? 'people' : type + 's'}/${uid}`
  )
  const details = {
    ...response.result.properties,
    uid: response.result.uid,
    type,
  }

  if (type === 'character') {
    const homeworld = await makeRequest(response.result.properties.homeworld)
    details.homeworld = {
      ...homeworld.result.properties,
      uid: homeworld.result.uid,
    }
  }

  return details
}
