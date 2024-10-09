import SuccessIcon from '../../../icons/success.svg?react'

export const FeedbackDoneModal = () => {
  return (
    <div style={{ paddingBottom: '28px', textAlign: 'center' }}>
      <SuccessIcon style={{ marginBottom: '30px' }} />
      <p style={{ fontSize: '22px', lineHeight: '1.2', fontWeight: '600' }}>
        Ваш відгук успішно надісланий на модерацію
      </p>
    </div>
  )
}
