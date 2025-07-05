import { Field } from 'formik';

function Input(props) {
  const { name, label, ...restProps } = props;
  return (
    <Field name={name}>
      {({ field, meta }) => {
        return (
          <label className="block mb-2 font-semibold text-gray-700">
            <span>{label}</span>
            <input
              className={`
                block w-full rounded border px-2 py-1
                ${!meta.error && meta.touched ? 'border-green-500' : ''}
                ${meta.error && meta.touched ? 'border-red-500' : ''}
              `}
              {...restProps}
              {...field}
            />
            {meta.error && meta.touched && (
              <span className="text-sm text-red-500">{meta.error}</span>
            )}
          </label>
        );
      }}
    </Field>
  );
}

export default Input;
