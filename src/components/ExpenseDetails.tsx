import { useMemo } from "react"
import { formatDate } from "../helpers"
import { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"

type ExpenseDetailsProps = {
    expense : Expense
}


const ExpenseDetails = ({expense} : ExpenseDetailsProps) => {
  //Filtar y retornar el nombre despues de selecionarlo en el form.
  const   categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])


  return (
    <>
    <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
      <div>
        <img 
          src={`/icono_${categoryInfo.icon}.svg`}
          alt="icon expense"
          className="w-20"
        />
      </div>

      <div>
        <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
        <p>{expense.expenseName}</p>                            
        <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
      </div>

    <AmountDisplay 
      amount={expense.amount}
    />

    </div>
    </> 
  ) 
}

export default ExpenseDetails