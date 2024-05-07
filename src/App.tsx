
import BudgetForm from "./components/BudgetForm"
function App() {

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
