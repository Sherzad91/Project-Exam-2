import { useFormik } from 'formik';
import get from 'lodash/get';

export default function useForm(initialValues, onSubmit, validationSchema = {}) {
  const { values, setValues, handleChange, handleBlur, errors, handleSubmit, touched } = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    enableReinitialize: true,
  });

  function input(name, type = 'text', label = '') {
    return {
      name,
      type,
      value: get(values, name),
      onChange: handleChange,
      onBlur: handleBlur,
      error: touched[name] && !!errors[name],
      helperText: touched[name] && errors[name],
      label: label || name.charAt(0).toUpperCase() + name.slice(1),
    };
  }

  function checkbox(name, label = '') {
    return {
      name,
      checked: get(values, name),
      onChange: handleChange,
      onBlur: handleBlur,

      label: label || name.charAt(0).toUpperCase() + name.slice(1),
    };
  }

  return { values, input, errors, handleSubmit, setValues, checkbox };
}
