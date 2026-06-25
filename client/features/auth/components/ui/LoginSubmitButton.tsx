interface ButtonProps {
  title?: string;
  styleClass?: string;
  messButton: string;
  disable?: boolean;
  divClass?: string;
}

export default function LoginSubmitButton({
  styleClass,
  title,
  messButton,
  disable,
  divClass,
}: ButtonProps) {
  return (
    <div className={`${divClass}`}>
      <button
        className={`${styleClass}`}
        type="submit"
        title={title}
        disabled={disable}
      >
        {messButton}
      </button>
    </div>
  );
}
