import { Button, Modal, Image } from 'react-bootstrap'
import styles from './productModal.module.scss'

interface Props {
  image: string
  name: string
  show: boolean
  onHide: () => void
}

function ProductModal(props: Props) {
  const { name, image, onHide } = props;
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

      <Image className={styles.image} src={image} alt={name} />

      <Modal.Footer>
        <Button onClick={onHide}>CLOSE</Button>
      </Modal.Footer>
    </Modal >
  );
}

export default ProductModal;