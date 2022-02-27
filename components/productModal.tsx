import { useEffect, useState } from 'react'
import { Button, Modal, Image } from 'react-bootstrap'
import styles from './productModal.module.scss'
import ImageNext from 'next/image'

interface Props {
  images: string[]
  name: string
  show: boolean
  index: number
  onHide: () => void
}

function ProductModal(props: Props) {
  const { name, images, onHide, index } = props;
  const [imageIdx, setImageIdx] = useState(index);

  useEffect(() => setImageIdx(index), [index])

  return (
    <Modal
      className={styles['product-modal']}
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className='text-light pl-3' id="contained-modal-title-vcenter" as='h1'>
          {name}
        </Modal.Title>
      </Modal.Header>

      <Image className={styles.image} src={images[imageIdx]} alt={name} />
      {/* Mini Images ----------- */}
      <div className={styles.miniImagesWrapper}>
        {images.map((image, idx) => (
          <div key={idx} onClick={() => setImageIdx(idx)}>
            <ImageNext src={image} layout='fill' objectFit='contain' />
          </div>
        ))}
      </div>
      <Modal.Footer>
        <Button onClick={onHide}>CLOSE</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductModal;