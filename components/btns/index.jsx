import './style.css'

const SimpleBtn = ({ children, ...props }) => {
  return (
    <button {...props} className="simple-btn">
      {children}
    </button>
  );
}

export {SimpleBtn}