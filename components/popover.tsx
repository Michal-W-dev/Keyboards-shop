import { ReactElement } from 'react'
import { Popover, OverlayTrigger } from 'react-bootstrap'
import styles from './popover.module.scss'

const popover = (text: string) => (
  <Popover className={styles.popover} id="popover-basic">
    <Popover.Header className={styles.header}>Under construction</Popover.Header>
    <Popover.Body className={styles.body}>
      {text}
    </Popover.Body>
  </Popover>
);

interface Props {
  children: ReactElement
  text: string
}
const PopoverUnderConstruction = ({ children, text }: Props) => (
  <OverlayTrigger trigger="click" overlay={popover(text)}>
    {children}
  </OverlayTrigger>
);

PopoverUnderConstruction.defaultProps = {
  text: 'Sorry, this component is not fully functional yet.'
}


export default PopoverUnderConstruction;