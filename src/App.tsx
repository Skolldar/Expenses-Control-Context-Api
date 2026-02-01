import { useEffect, useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterByCategory from "./components/FilterByCategory"

function App() {
  //con useContext accedemos a todo lo que retorna el value.
  //Aunque la mejor forma de hacerlo es atraves de un custom hook:
  //const context = useContext(BudgetContext)


  const {state} = useBudget()

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget] )

  useEffect(() => {
    //se le dice que en el local storage donde se encuentra 'budget' va a escribir lo que este en el state de budget como un string(toString) porque si no le colocamos el toString, lo pasara como un number.
    localStorage.setItem('budget', state.budget.toString())

    //Se le agrega el JSON.stringify para que se almacene como string, ya que en el localstorage no se puede guardar los arreglos[].
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state]) //le pasamos el state que ya esta exportado de manera global y asi escribimos atraves del state.


  return (
    <>
      <header className="bg-teal-600 pb-52  px-10">
        <div className="max-w-8xl mx-auto flex items-center pt-10">
          <img src="/graph-whiteLogo.svg" alt="logo control budget" className="w-40"/>
          <h1 className="font-bold text-white text-5xl text-left">FlowState</h1>
        </div>
      </header>

      <div className="translate-y-[-13rem] max-w-3xl mx-auto bg-white shadow-lg rounded-3xl p-10">
        {isValidBudget 
          ? <BudgetTracker/> 
          : <BudgetForm />}
      </div>

    {isValidBudget && (
      <main className="max-w-3xl mx-auto">
        <div className="translate-y-[-10rem]">
        <FilterByCategory/>
        <ExpenseList/>
        </div>
        <ExpenseModal/>
      </main>
    )}
    </>
  )
}

export default App
