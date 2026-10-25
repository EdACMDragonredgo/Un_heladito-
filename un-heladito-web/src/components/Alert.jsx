export default function Alert({ message, type = 'info', onClose }) {
  if (!message) return null;
  return <div className={`alert alert-${type} d-flex align-items-center justify-content-between`} role="status"><span>{message}</span>{onClose && <button className="btn-close ms-3" aria-label="Cerrar" onClick={onClose} />}</div>;
}
