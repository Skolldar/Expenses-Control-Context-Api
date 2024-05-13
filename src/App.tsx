
import BudgetForm from "./components/BudgetForm"
import { BudgetContext } from "./context/BudgetContext"
function App() {

  //con useContext accedemos a todo lo que retorna el value.
  //Aunque la mejor forma de hacerlo es atraves de un custom hook:
  //const context = useContext(BudgetContext)

  return (
    <>
      <header className="bg-teal-600 bg-fixed py-20">
        <h1 className="max-w-5xl mx-auto font-bold text-white pb-10 text-6xl">Control.<span className="text-xl">Budget</span></h1>
      </header>

      <div className="translate-y-[-3rem] max-w-3xl mx-auto bg-white shadow-lg rounded-3xl p-10">
        <BudgetForm/>
      </div>
    </>
  )
}

export default App
