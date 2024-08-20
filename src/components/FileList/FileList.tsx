import {
  Dispatch,
  FC,
  Fragment,
  RefObject,
  SetStateAction,
  useState
} from 'react'
import styles from '../Crm-images/crmImages.module.scss'
import { RootState } from '../../redux/store/index'
import { useSelector } from 'react-redux'
import { FileItem } from './FileItem'
import { FilePreview } from './FilePreview'
import { UploadPhoto } from '../UploadPhoto/UploadPhoto'
import { ProductResponse, ImageResponse } from '../../types'

type Props = {
  product?: ProductResponse
  filesArr: File[]
  filePreviews: Record<string, string>
  activeFile: string | null
  setActiveFile: Dispatch<SetStateAction<string | null>>
  fileInputRef: RefObject<HTMLInputElement>
  cleaningInput: () => void
  setFilePreviews: Dispatch<SetStateAction<Record<string, string>>>
  setFilesArr: Dispatch<SetStateAction<File[]>>
}

export type FileType = File | ImageResponse

export const FileList: FC<Props> = ({
  product,
  filesArr,
  filePreviews,
  activeFile,
  setActiveFile,
  fileInputRef,
  cleaningInput,
  setFilePreviews,
  setFilesArr
}) => {
  const [fileIsOpen, setFileIsOpen] = useState<string>('')
  const formErrors = useSelector(
    (state: RootState) => state.newProduct.formErrors
  )

  const arrayToUse = product ? product.images : filesArr

  const isFile = (item: FileType): item is File =>
    'name' in item && 'lastModified' in item

  const handleClickDelete = (fileName: string) => {
    const deletedFiles = filesArr.filter((item) => item.name !== fileName)
    const newFilePreviews = { ...filePreviews }
    URL.revokeObjectURL(newFilePreviews[fileName])

    if (fileInputRef.current) {
      cleaningInput()
    }

    if (!deletedFiles.some((item) => item.name === activeFile)) {
      setActiveFile(null)
    }
    delete newFilePreviews[fileName]
    setFilePreviews(newFilePreviews)
    setFilesArr(deletedFiles)
  }

  const toggleActiveStar = (fileName: string) => {
    setActiveFile(activeFile === fileName ? null : fileName)
  }

  const handleMouseDown = (fileName: string) => {
    setFileIsOpen(fileName)
  }

  const handleMouseUp = () => {
    setFileIsOpen('')
  }

  return (
    <Fragment>
      <ul className={styles.fileList}>
        {arrayToUse.map((file: FileType) => {
          const fileName = isFile(file) ? file.name : file.id.toString()
          const imageUrl = isFile(file)
            ? filePreviews[file.name]
            : file.image_url

          return (
            <li key={fileName}>
              <FileItem
                file={file}
                isActive={activeFile === fileName}
                onStarClick={toggleActiveStar}
                onDeleteClick={handleClickDelete}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                isProduct={!!product}
              />
              {fileIsOpen === fileName && (
                <FilePreview imageUrl={imageUrl} fileName={fileName} />
              )}
            </li>
          )
        })}
      </ul>
      <UploadPhoto
        product={product}
        formErrors={formErrors}
        filesArr={filesArr}
      />
    </Fragment>
  )
}
