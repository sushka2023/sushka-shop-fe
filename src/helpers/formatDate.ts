import { format } from 'date-fns'
import { uk } from 'date-fns/locale'

export const formatDate = (dateString: string) => {
  return format(new Date(dateString), 'd MMM yyyy', { locale: uk })
}
