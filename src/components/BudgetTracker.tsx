import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget" //para acceder al state
import AmountDisplay from "./AmountDisplay"

const BudgetTracker = () => {
    //Accedemos al state desde el hook useBudget
    const {state} = useBudget();

    //se ejecutara cada que cambie el state de gastos, se pasa como dependencia [state.expenses]... hacemos el calculo que inicia en 0 y dara el total que hemos gastado del budget.
    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0 ), [state.expenses])

    //Solo restamos lo anterior para que nos de el valor de lo que nos quede disponible
    const remainingBudget = state.budget - totalExpenses

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
            <img src="/grafico.jpg" alt="Grafico"/>

        </div>
        <div className="flex flex-col justify-center items-center gap-8">
            <button
            type="button"
            className="bg-yellow-600 w-full p-2 text-white uppercase font-bold rounded-lg"
            >
                Reset App
            </button>

            <AmountDisplay 
                label="Budget"
                amount={state.budget}
            />

            <AmountDisplay 
                label="Available"
                amount={remainingBudget}
            />

            <AmountDisplay 
                label="Spent"
                amount={totalExpenses}
            />

        </div>
    </div>
    </>
  )
}

export default BudgetTracker