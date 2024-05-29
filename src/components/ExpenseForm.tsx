import { categories } from "../data/categories"

const ExpenseForm = () => {
  return (
    <>
    <form className="space-y-5">
        <legend className="uppercase text-center text-2xl font-black border-b-4 py-2 border-teal-500 ">
            New Expense
        </legend>

        <div className="flex flex-col gap-2">
            <label 
            htmlFor="expenseName"
            className="text-xl">
                Expense Name
            </label>

            <input
                type="text"
                id="expenseName"
                placeholder="add the name of the expense"
                className="bg-slate-100 p-2 rounded-lg"
                name="expenseName"
            />
        </div>

        <div className="flex flex-col gap-2">
            <label 
            htmlFor="amount"
            className="text-xl">
                Amount
            </label>

            <input
                type="number"
                id="amount"
                placeholder="add the amount ex: 300"
                className="bg-slate-100 p-2 rounded-lg"
                name="amount"
            />
        </div>

        <div className="flex flex-col gap-2">
            <label 
            htmlFor="category"
            className="text-xl">
                Category
            </label>

            <select
                id="category"
                className="bg-slate-100 p-2 rounded-lg"
                name="category">

                    <option value="">-- Select --</option>
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
            </select>
        </div>

        <input 
            type="submit"
            className="bg-teal-500 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
            value={'Register Expenses'}
        />
    </form>
    </>
  )
}

export default ExpenseForm