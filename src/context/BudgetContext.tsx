import { useReducer, createContext, Dispatch, ReactNode } from "react";
import { BudgetActions, BudgetState, budgetReducer, initialState } from "../reducers/budget-reducer";

type BudgetContextProps = {
    //context es la accion de tener el estaado global, pero el Provider van a ser los datos que va tener ese context.

    //esto es lo qie maneja el provider.
    state: BudgetState
    //Colocamos el BudgetActions como generic para decirle que si utilice la funcion pero sera dinamico por las acciones.
    dispatch:Dispatch<BudgetActions>
}

type BudgetProviderProps = {
    children: ReactNode
}

//createContext(): se necesita un argumento por default
//lo pasamos generico para que sea dinamico y asi el context sabe de donde proviene y el que el provider ya tiene acceso.

//Hay dos formas de pasar el argumento al createContext: 
// crear un obj vacio y poner un  As para castear como BudgetContextProps, lo que hace ese codigo es decirle que confie en mi. ej: createContext<BudgetContextProps>({} as BudgetContextProps)

//Otra opcion que es muy comun es ponerle un NULL con !. ej: createContext<BudgetContextProps>(null!)
export const BudgetContext = createContext<BudgetContextProps>(null!)

//le pasamos el children para usar el context.provider
export const BudgetProvider = ({children} : BudgetProviderProps) => {

    //el provider manejar de state y dispatch
    const [state, dispatch] = useReducer(budgetReducer, initialState)


    return (
        //Conectar las funciones con el context:
        //coclocando el budgetcontext con sistanxis de componente y pasamos el state, dispatch .

        <BudgetContext.Provider
        //es un prop especial que existe en provider y su value es igual y siempre es un obj, pero al serlo retornamos otro obj.    
        value={{
            state,
            dispatch
        }}
        >
            {children}
        </BudgetContext.Provider>

    )
}