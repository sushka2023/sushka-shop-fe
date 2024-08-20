import React, { Dispatch, FC, RefObject, SetStateAction, useState } from 'react'
import styles from '../Crm-images/crmImages.module.scss'
import { FileItem } from './FileItem'
import { FilePreview } from './FilePreview'

type ProductImage = {
  id: number
  name: string
  description: string
  image_url: string
}

type Props = {
  product: any
  filesArr: File[]
  filePreviews: Record<string, string>
  activeFile: string | null
  setActiveFile: Dispatch<SetStateAction<string | null>>
  fileInputRef: RefObject<HTMLInputElement>
  cleaningInput: () => void
  setFilePreviews: Dispatch<SetStateAction<Record<string, string>>>
  setFilesArr: Dispatch<SetStateAction<File[]>>
}

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
  const [fileIsOpen, setFileIsOpen] = useState('')

  const arrayToUse = product ? product.images : filesArr

  const handleClickDelete = (file: string) => {
    const delletedFiles = filesArr.filter(
      (item: { name: string }) => item.name !== file
    )
    const newFilePreviews = { ...filePreviews }
    URL.revokeObjectURL(newFilePreviews[file])

    if (fileInputRef.current) {
      cleaningInput()
    }

    if (
      !delletedFiles.some((file: { name: string }) => file.name === activeFile)
    ) {
      setActiveFile('')
    }
    delete newFilePreviews[file]
    setFilePreviews(newFilePreviews)
    setFilesArr(delletedFiles)
  }

  const toggleActiveStar = (file: string) => {
    setActiveFile(activeFile === file ? null : file)
  }

  const handleMouseDown = (file: string) => {
    setFileIsOpen(file)
  }

  const handleMouseUp = () => {
    setFileIsOpen('')
  }

  return (
    <ul className={styles.fileList}>
      {arrayToUse.map((file: ProductImage) => {
        const imageUrl = !product ? filePreviews[file.name] : file.image_url

        return (
          <React.Fragment key={file.id}>
            <FileItem
              file={file}
              isActive={activeFile === file.name}
              onStarClick={toggleActiveStar}
              onDeleteClick={handleClickDelete}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              isProduct={!!product}
            />
            {fileIsOpen === file.name && (
              <FilePreview imageUrl={imageUrl} fileName={file.name} />
            )}
          </React.Fragment>
        )
      })}
    </ul>
  )
}
