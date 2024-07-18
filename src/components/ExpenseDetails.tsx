import { useMemo } from "react"
import { formatDate } from "../helpers"
import { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list'
import { useBudget } from "../hooks/useBudget"
import "react-swipeable-list/dist/styles.css"

type ExpenseDetailsProps = {
    expense : Expense
}


const ExpenseDetails = ({expense} : ExpenseDetailsProps)  => {

  const {dispatch} = useBudget()

  //Filtar y retornar el nombre despues de selecionarlo en el form.
  const   categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])

  //Componentes de la accion del deslizado
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() => dispatch({type: 'get-expense-by-id', playload:{id: expense.id}})} 
      >
        Edit
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => dispatch({type: 'remove-expense', playload: {id: expense.id}})} 
        destructive={true} //eliminar animacion
      >
        Delete
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={1}
        leadingActions={leadingActions()} //arrasstrar del ladoo izzq
        trailingActions={trailingActions()} //arrastra del lado derecho
      >
        <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center rounded-lg">
          <div>
            <img 
              src={`/icono_${categoryInfo.icon}.svg`}
              alt="icon expense"
              className="w-20"
            />
          </div>

          <div className="flex-1 space-y-2">
            <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>

            <p>{expense.expenseName}</p>                            
            <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
          </div>

        <AmountDisplay 
          amount={expense.amount}
        />

        </div>
      </SwipeableListItem>
    </SwipeableList>
  ) 
}

export default ExpenseDetails