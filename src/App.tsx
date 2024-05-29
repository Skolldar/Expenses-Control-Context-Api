import { useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
function App() {
  //con useContext accedemos a todo lo que retorna el value.
  //Aunque la mejor forma de hacerlo es atraves de un custom hook:
  //const context = useContext(BudgetContext)


  const {state} = useBudget()

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget] )


  return (
    <>
      <header className="bg-teal-600 bg-fixed py-20">
        <h1 className="max-w-5xl mx-auto font-bold text-white pb-10 text-7xl">Control<span className="text-4xl">.Budget</span></h1>
      </header>

      <div className="translate-y-[-5rem] max-w-3xl mx-auto bg-white shadow-lg rounded-3xl p-10">
        {isValidBudget 
          ? <BudgetTracker/> 
          : <BudgetForm />}
      </div>

  {isValidBudget && (
    <main className="max-w-3xl mx-auto py-10">
      <ExpenseModal/>
    </main>
  )}
    </>
  )
}

export default App
