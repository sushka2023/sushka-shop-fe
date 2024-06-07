import React, { FC, ReactNode } from 'react'
import {
  Autocomplete,
  Box,
  CircularProgress,
  FormHelperText,
  TextField
} from '@mui/material'
import { AutocompleteForCityNP } from '../../Autocomplete/AutocompleteForCityNP'

type PropsType = {
  errors: any
  register: any
  stateRef: any
  StyledPopper: any
  ListboxComponent: any
  cityRenderArray: any
  loading: any
  setValueInput: any
  handleChange: any
}

export const NovaPoshtaPickup: FC<PropsType> = ({
  errors,
  register,
  stateRef,
  StyledPopper,
  ListboxComponent,
  cityRenderArray,
  loading,
  setValueInput,
  handleChange
}) => {
  // const [warehouses, setWarehouses] = useState<string[]>([]);

  // useEffect(() => {
  //   const fetchWarehouses = async (city: string) => {
  //     try {
  //       const response = await axiosInstance.get(`/api/nova_poshta/warehouses/${city}`);
  //       console.log('✌️response --->', response.data);
  //       setWarehouses(response.data);
  //     } catch (error) {
  //       console.error('Error fetching warehouses:', error);
  //     }
  //   };

  //   fetchWarehouses('Рівне');
  // }, []);

  return (
    <Box sx={{ p: '5px 0' }}>
      {errors.pickupNP && (
        <FormHelperText
          sx={{
            color: 'error.darker',
            fontWeight: 500
          }}
        >
          {errors.pickupNP?.message}
        </FormHelperText>
      )}
      <AutocompleteForCityNP
        register={register}
        stateRef={stateRef}
        StyledPopper={StyledPopper}
        ListboxComponent={ListboxComponent}
        cityRenderArray={cityRenderArray}
        loading={loading}
        setValueInput={setValueInput}
        handleChange={handleChange}
      />
      <Autocomplete
        {...register('pickupNP')}
        ref={stateRef}
        id="virtualize-demo1"
        sx={{ width: 400, mt: 2 }}
        disableListWrap
        PopperComponent={StyledPopper}
        ListboxComponent={ListboxComponent}
        options={warehouses}
        loading={loading}
        noOptionsText="Немає варіантів"
        onInputChange={(_, val) => {
          setValueInput(val)
        }}
        onChange={(_, value: string | null) => handleChange(value)}
        renderGroup={(params: any) => params}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Оберіть місто"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={23} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              )
            }}
          />
        )}
        renderOption={(props, option, state) =>
          [props, option, state.index] as ReactNode
        }
      />
    </Box>
  )
}
