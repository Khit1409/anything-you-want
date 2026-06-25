import { getIconByString } from "@/features/common/helpers/icon.helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  name: Path<T>;
  id?: string;
  label?: string;
  mess?: string;
  dataset?: { key: string; value: string }[];
  classNameConfig?: {
    divClass?: string;
    inputClass?: string;
    labelClass?: string;
  };
  iconProp?: string;
  iconClass?: string;
  useFormFn?: {
    register?: UseFormRegister<T>;
    setValue?: UseFormSetValue<T>;
  };
  type: "text" | "password" | "email";
}

export default function LoginInput<T extends FieldValues>({
  onChange,
  name,
  id,
  label,
  classNameConfig,
  dataset,
  mess,
  iconProp,
  iconClass,
  useFormFn,
  type,
}: Props<T>) {
  const icon = (iconClass?: string) => {
    const icon = iconProp ? getIconByString(iconProp) : undefined;
    if (icon) {
      return (
        <FontAwesomeIcon
          icon={icon}
          className={`${iconClass} text-(--muted)`}
        />
      );
    }
  };

  return (
    <div className={`${classNameConfig?.divClass}`}>
      <label htmlFor={id} className={`${classNameConfig?.labelClass}`}>
        {icon(iconClass)}
        <span>{label}</span>
      </label>

      <input
        type={type}
        onChange={(e) => {
          if (onChange) {
            onChange(e);
          }
          if (useFormFn?.setValue) {
            useFormFn.setValue(name, e.target.value as PathValue<T, Path<T>>);
          }
        }}
        className={`${classNameConfig?.inputClass}`}
        name={name}
        id={id}
        placeholder={mess}
        {...dataset?.reduce(
          (acc, item) => ({
            ...acc,
            [item.key]: item.value,
          }),
          {},
        )}
        {...(useFormFn?.register && {
          ...useFormFn.register(name),
        })}
      />
    </div>
  );
}
