export default function Button({ children, onClick, primary, danger, disabled, ...rest }) {
  let className = "btn";
  if (primary) className += " btn-primary";
  if (danger) className += " btn-danger";
  if (disabled) className += " btn-disabled";

  return (
    <button className={className} onClick={onClick} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
