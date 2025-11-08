import React from 'react';
import {Typography} from './../';
import {FormController, useForm, useFormContext} from './../../utils';
import styles from './styled';
import Validation from './validate';

const inputHOC =
  WrappedComponent =>
  ({name, rules, onChangeText, ...props}) => {
    if (!name) {
      return <WrappedComponent {...props} onChangeText={onChangeText} />;
    }
    const styled = styles();
    const context = useFormContext();
    const {control} = context ? context : useForm();

    const defaultRules = Validation.getRules(name);
    const preparedRules = Array.isArray(rules)
      ? Validation.convertValidationRules(rules)
      : rules || defaultRules;

    return (
      <FormController
        control={control}
        name={name}
        rules={preparedRules}
        render={({
          field: {onChange, onBlur, value, disabled},
          fieldState: {error},
        }) => {
          const wrapperProps = {
            ...props,
            disabled,
            value,
            onBlur,
          };

          return (
            <>
              <WrappedComponent
                {...wrapperProps}
                onChangeText={rest => {
                  onChange && onChange(rest);
                  onChangeText && onChangeText(rest);
                }}
                style={[props.style, error && styled.inputError]}
                value={value}
              />

              {error && (
                <Typography
                  variant="p4"
                  marginTop={4}
                  marginLeft={20}
                  style={styled.error}
                  color="neutral2">
                  {error.message || error.type}
                </Typography>
              )}
            </>
          );
        }}
      />
    );
  };

export default inputHOC;
