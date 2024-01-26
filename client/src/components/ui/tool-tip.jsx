const Tooltip = ({ children, text }) => {
   return (
      <div className="relative">
         <span className="absolute left-0 z-20 inline-block px-2 py-1 text-xs font-medium text-white -top-4 bg-primary-700 w-max">{text}</span>
         {children}
      </div>
   )
}

export default Tooltip