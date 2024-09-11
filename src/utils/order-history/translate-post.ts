import { PostsType } from '../../types'

export function translatePostType(post_type: PostsType): string {
  const translations: { [key: string]: string } = {
    nova_poshta_address: 'Нова пошта (адресна)',
    nova_poshta_warehouse: 'Нова пошта (відділення)'
  }

  return translations[post_type] || 'Не відомо'
}
