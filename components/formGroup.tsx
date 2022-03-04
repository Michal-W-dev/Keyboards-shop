import { ChangeEvent, CSSProperties } from 'react'
import { Form } from 'react-bootstrap'
import styles from './formGroup.module.scss'
import cls from 'classnames';

interface Props {
  name: string
  placeholder?: string
  inline?: boolean
  float?: boolean
  style?: CSSProperties
  // ...propsFormGroup
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  type?: string
  autoFocus?: boolean
}

const FormGroup = (props: Props) => {
  const { placeholder, name, inline, float, style, ...propsFormGroup } = props;
  return (
    <Form.Group controlId={name} className={cls(styles.formGroup, inline && styles.inline)} style={{ ...style }}>

      {!float && <Form.Label>{name}</Form.Label>}
      <Form.Control
        className={inline ? 'inline' : ''}
        {...propsFormGroup}
        placeholder={(float && ' ') || placeholder || `Enter ${name}`}
        style={{ width: inline ? 'auto' : '100%' }}
        autoComplete="off"
      />
      {float && <Form.Label className='form-placeholder'>{placeholder}</Form.Label>}
    </Form.Group >
  )
}

FormGroup.defaultProps = {
  type: 'text',
  autoFocus: false,
  required: false,
  inline: false,
  float: false,
}

export default FormGroup
