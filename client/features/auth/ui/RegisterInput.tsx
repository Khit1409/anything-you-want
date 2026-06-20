import {
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  elementProps: {
    name: Path<T>;
    type?: "text" | "email" | "password";
    id?: string;
    label: string;
    mess?: string;
    styleClass?: string;
    value?: string;
    isRequired?: boolean;
  };
  useFormFn?: {
    register?: UseFormRegister<T>;
    setValue?: UseFormSetValue<T>;
  };
}

export default function RegisterInput<T extends FieldValues>({
  onChange,
  elementProps,
  useFormFn,
}: InputProps<T>) {
  return (
    <div className="flex flex-col">
      <label
        className="text-sm font-medium text-gray-700 mb-2"
        htmlFor="currentPassword"
      >
        {elementProps.label}
        <span className="text-red-500">{elementProps.isRequired && "*"}</span>
      </label>
      <input
        required={elementProps.isRequired}
        type={elementProps.type}
        name={elementProps.name}
        id={elementProps.id}
        className={`${elementProps.styleClass} "px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"`}
        {...(useFormFn?.register && useFormFn.register(elementProps.name))}
        onChange={(e) => {
          if (useFormFn?.setValue) {
            useFormFn.setValue(
              elementProps.name as Path<T>,
              e.target.value as PathValue<T, Path<T>>,
            );
          }
          if (onChange) {
            onChange(e);
          }
        }}
      />
    </div>
  );
}
