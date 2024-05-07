
const BudgetForm = () => {
  return (
    <>
    <form className="space-y-5">
        <div className="flex flex-col space-y-5">
            <label htmlFor="budget" className="text-4xl text-teal-500 font-bold text-center">
                Define Budget
            </label>
            <input
                id="budget"
                type="number"
                className="w-full bg-white border-3xl  border-gray-200 p-2"
                placeholder="Define Budget"
                name="budget"
            />
        </div>
        <input
          type="submit"
          value="Define Presupuesto"
          className="bg-teal-600 hover:bg-teal-700 cursor-pointer uppercase w-full p-2 text-white"
        />
    </form>
    </>
  )
}

export default BudgetForm
