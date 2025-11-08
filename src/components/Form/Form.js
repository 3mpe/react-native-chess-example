/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {useForm, FormProvider} from './../../utils';
import FormItem from './FormItem';

const DyamicForm = ({children, form}) => {
  const methods = form || useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

DyamicForm.Item = FormItem;
export default DyamicForm;
