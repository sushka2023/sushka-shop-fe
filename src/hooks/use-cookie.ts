import Cookies from 'js-cookie'
import { COOKIE_TOKEN_NAME } from '../axios/settings'

const EXPIRES = 7

export const useCookieMenager = () => {
  const getToken = () => Cookies.get(COOKIE_TOKEN_NAME)
  const setToken = (token: string) =>
    Cookies.set(COOKIE_TOKEN_NAME, token, { expires: EXPIRES })
  const removeToken = () => Cookies.remove(COOKIE_TOKEN_NAME)

  return { getToken, setToken, removeToken }
}
