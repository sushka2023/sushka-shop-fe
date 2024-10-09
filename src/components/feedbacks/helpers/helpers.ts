import axiosInstance from '../../../axios/settings'

export const submitImage = async (file: File, reviewId: string) => {
  const imageFormData: FormData = new FormData()
  imageFormData.append('description', 'image')
  imageFormData.append('image_file', file as File)
  imageFormData.append('review_id', reviewId)

  try {
    await axiosInstance.post('api/images/create_img_review', imageFormData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  } catch (error) {
    console.error('Error uploading image:', error)
  }
}
