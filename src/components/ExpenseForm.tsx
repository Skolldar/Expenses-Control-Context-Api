import { useState } from "react"
import {DarftExpense, Value} from "../types"
import { categories } from "../data/categories"
import DatePicker from 'react-date-picker'
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import ErrorMessage from "./ErrorMessage"
import { useBudget } from "../hooks/useBudget"


const ExpenseForm = () => {

    const [error, setError] = useState('')
    
    const {dispatch} = useBudget()

    const [expense, setExpenses] = useState<DarftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target
        const isAmountField = ['amount'].includes(name)
        setExpenses({
            ...expense,
            [name] : isAmountField ? +value : value // covert to number with + or Number()
        })
    }


    const handleChangeDate = (value : Value) => {
        setExpenses({
            ...expense,
            date: value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //validar
        if(Object.values(expense).includes('')) {
            setError('All fields are required')
            return
        }

        //Agregar nuevo gasto
        dispatch({type: 'add-expense', playload: {expense}})
    }

  return (
    <>
    <form className="space-y-5" onSubmit={handleSubmit}>
        <legend className="uppercase text-center text-2xl font-black border-b-4 py-2 border-teal-500 ">
            New Expense
        </legend>

        {error &&
         <ErrorMessage>
            {error}
         </ErrorMessage>}

        <div className="flex flex-col gap-2">
            <label 
            htmlFor="expenseName"
            className="text-xl">
                Expense Name
            </label>

            <input
                type="text"
                id="expenseName"
                placeholder="Add the name of the expense"
                className="bg-slate-100 p-2 rounded-lg"
                name="expenseName"
                value={expense.expenseName}
                onChange={handleChange}
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
                placeholder="Add the amount ex: 300"
                className="bg-slate-100 p-2 rounded-lg"
                name="amount"
                value={expense.amount}
                onChange={handleChange}

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
                name="category"
                value={expense.category}
                onChange={handleChange}
                >

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

        <div className="flex flex-col gap-2">
            <label
            htmlFor="amount"
            className="text-xl">
        Fecha Gasto:
            </label>
            <DatePicker 
                className="bg-slate-100 p-2 border-0-"
                value={expense.date}
                onChange={handleChangeDate}
            />

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