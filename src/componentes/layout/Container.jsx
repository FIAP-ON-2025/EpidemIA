export default function Container({ children, className = '' }) {
  return (
    <div className={`container-pagina ${className}`}>
      {children}
    </div>
  )
}
