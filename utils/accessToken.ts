let accessToken = ''

export const setAccessToken = (newToken: string) => {
  accessToken = newToken
}
export const getAccessToken = () => {
  return accessToken
}
export const fetchAccessToken = () => {
  return fetch(`http://${URL}/refresh_token`, {
    method: 'POST',
    credentials: 'include',
  })
}
