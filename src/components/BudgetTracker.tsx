import { useBudget } from "../hooks/useBudget" //para acceder al state
import AmountDisplay from "./AmountDisplay"

const BudgetTracker = () => {
    //Accedemos al state desde el hook useBudget
    const {state, totalExpenses, remainingBudget} = useBudget();

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