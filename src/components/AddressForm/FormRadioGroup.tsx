// FormRadioGroup.tsx
import React from 'react'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { BpCheckedIcon, BpIcon } from './style'

type FormRadioGroupProps = {
  selectedValue: string
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>
  renderFormFields: () => JSX.Element | null
}

function BpRadio(props: any) {
  return (
    <Radio
      disableRipple
      color="default"
      icon={<BpIcon />}
      checkedIcon={<BpCheckedIcon />}
      {...props}
    />
  )
}

const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
  selectedValue,
  setSelectedValue,
  renderFormFields
}) => {
  return (
    <RadioGroup
      name="value"
      value={selectedValue}
      onChange={(e) => setSelectedValue(e.target.value)}
    >
      <FormControlLabel
        value="np_office"
        control={<BpRadio />}
        label="Нова пошта (відділення)"
      />
      {selectedValue === 'np_office' && renderFormFields()}

      <FormControlLabel
        value="np_parcel_locker"
        control={<BpRadio />}
        label="Нова пошта (поштомат)"
      />
      {selectedValue === 'np_parcel_locker' && renderFormFields()}

      <FormControlLabel
        value="np_address"
        control={<BpRadio />}
        label="Нова пошта (адресна)"
      />
      {selectedValue === 'np_address' && renderFormFields()}

      <FormControlLabel
        value="ukr_post"
        control={<BpRadio />}
        label="Укрпошта"
      />
      {selectedValue === 'ukr_post' && renderFormFields()}
    </RadioGroup>
  )
}

export default FormRadioGroup
