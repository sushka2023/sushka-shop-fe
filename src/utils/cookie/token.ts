import Cookies from 'js-cookie'
import { COOKIE_TOKEN_NAME } from '../../axios/settings'

const EXPIRES = 7

export const getToken = () => Cookies.get(COOKIE_TOKEN_NAME)
export const setToken = (token: string) =>
  Cookies.set(COOKIE_TOKEN_NAME, token, { expires: EXPIRES })
export const removeToken = () => Cookies.remove(COOKIE_TOKEN_NAME)
