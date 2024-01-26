import axios from 'axios'
import { Report } from 'notiflix/build/notiflix-report-aio'

export const sendFormData = async ({ name, email, phone_number, message }) => {
  try {
    await axios.post(
      `api/cooperation?name=${name}&email=${email}&phone_number=${phone_number}&message=${message}`
    )
    return Report.success(
      'Заявка успішно відправлена',
      "Ми з Вами зв'яжемося протягом дня",
      'Добре'
    )
  } catch (e) {
    Report.failure('Упс... щось пішло не так', ' ', 'ок')
  }
}
