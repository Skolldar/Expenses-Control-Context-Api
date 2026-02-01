import { useMemo, useState } from "react";
import { useBudget } from "../hooks/useBudget";
const BudgetForm = () => {

  const [budget, setBudget] = useState(0);
  const {dispatch} = useBudget()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber); //value para ver el valor, AsNumber para convertirlo a numero
  }

  const isValid = useMemo(() => {
   // console.log(isNaN(budget)) // cuando no es un numero aparecera TRUE
    return isNaN(budget) || budget <= 0 
  }, [budget])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({type: 'add-budget', playload: {budget}})
  }

  return (
    <>
    <form className="space-y-5 py-10" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5 mb-3">
            <label htmlFor="budget" className="text-4xl text-teal-500 font-bold text-center">
                Define Budget
            </label>
            <input
                id="budget"
                type="number"
                className="w-full bg-white border rounded-lg border-gray-200 p-2"
                placeholder="Define Budget"
                name="budget"
                value={budget}
                onChange={handleChange}
            />
        </div>
        <input
          type="submit"
          value="Add Budget"
          className="bg-teal-600 hover:bg-teal-700 cursor-pointer uppercase w-full p-2 text-white font-bold rounded-lg disabled:opacity-30"
          disabled={isValid}
        />
    </form>
    </>
  )
}

export default BudgetForm
