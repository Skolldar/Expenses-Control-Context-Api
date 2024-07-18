import { useMemo, useState } from "react";
import { useBudget } from "../hooks/useBudget";
const BudgetForm = () => {

  const [budget, setbudget] = useState(0);
  const {dispatch} = useBudget()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setbudget(e.target.valueAsNumber); //value para ver el valor, AsNumber para convertirlo a numero
  }

  const isValid = useMemo(() => {
   // console.log(isNaN(budget)) // cuando no es un numero aparecera TRUE
    return isNaN(budget) || budget <= 0 
  }, [budget])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({type: 'add-budget', payload: {budget}})
  }

  return (
    <>
    <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5">
            <label htmlFor="budget" className="text-4xl text-teal-500 font-bold text-center">
                Define Budget
            </label>
            <input
                id="budget"
                type="number"
                className="w-full bg-white border-gray-200 p-2"
                placeholder="Define Budget"
                name="budget"
                value={budget}
                onChange={handleChange}
            />
        </div>
        <input
          type="submit"
          value="Save Budget"
          className="bg-teal-600 hover:bg-teal-700 cursor-pointer uppercase w-full p-2 text-white font-bold rounded-md disabled:opacity-30"
          disabled={isValid}
        />
    </form>
    </>
  )
}

export default BudgetForm
