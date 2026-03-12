export default function Input({ label, value, onChange, type = "text", error, ...rest }) {
  return (
    <div className="input-group">
      {label && <label>{label}</label>}
      <input type={type} value={value} onChange={onChange} {...rest} />
      {error && <small className="input-error">{error}</small>}
    </div>
  );
}
