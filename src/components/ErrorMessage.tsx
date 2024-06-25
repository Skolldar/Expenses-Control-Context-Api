import { ReactNode } from "react"
//Permite renderizar strings y componentes que esten en otros componentes.


type ErrorMessageProps = {
    children: ReactNode 
}


const ErrorMessage = ({children} : ErrorMessageProps) => {
  return (
    <p className="bg-red-600 p-2 text-white font-bold text-sm text-center rounded-lg">
        {children}
    </p>
  )
}

export default ErrorMessage