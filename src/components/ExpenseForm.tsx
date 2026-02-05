import { useEffect, useState } from "react"
import {DarftExpense, Value} from "../types"
import { categories } from "../data/categories"
import DatePicker from 'react-date-picker'
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import ErrorMessage from "./ErrorMessage"
import { useBudget } from "../hooks/useBudget"


const ExpenseForm = () => {

    const [error, setError] = useState('')

    const [previousAmount, setPreviousAmount] = useState(0)
    
    const {dispatch, state, remainingBudget} = useBudget()

    useEffect(() => {
        if(state.editingId) {
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId) [0] //retorna un arreglo posicion 0
            setExpenses(editingExpense) //regresamos de lo local a lo logabla para tener la validacion
            setPreviousAmount(editingExpense.amount)
        }
    }, [state.editingId, state.expenses])

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

        // Validar que no se pase del limite del presupuesto
        if((expense.amount - previousAmount) > remainingBudget) {
            setError('Budget exceeded')
            return
        }

        //Agregar o actualizar nuevo gasto:
        if(state.editingId) {
            //Recuperamos el gasto del id desde el state.editingId y el resto tomara una copia del que tenemos como expense.
            dispatch({type: 'update-expense', playload:{ expense: {id: state.editingId, ...expense}}})
        } else {
            dispatch({type: 'add-expense', playload: {expense}})
        }

        //reiniciar formulario
        setExpenses({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })
        setPreviousAmount(0)
    }

  return (
    <>
    <form className="space-y-5" onSubmit={handleSubmit}>
        <legend className="uppercase text-center text-2xl font-black border-b-4 py-5 border-teal-500 ">{state.editingId ? 'Save Changes' : 'New Expense'}
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
                className="bg-slate-100 lg:p-2 p-4 rounded-lg text-base"
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
                className="bg-slate-100 lg:p-2 p-4 rounded-lg text-base"
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
                className="bg-slate-100 lg:p-2 p-4 rounded-lg text-base"
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
            htmlFor="date"
            className="lg:text-xl text-lg">
        Fecha Gasto:
            </label>
            <DatePicker 
                className="bg-slate-100 lg:p-2 p-4 rounded-lg text-base"
                value={expense.date}
                onChange={handleChangeDate}
            />

        </div>

        <input 
            type="submit"
            className="bg-teal-500 cursor-pointer w-full lg:p-2 p-4 text-white uppercase font-bold rounded-lg"
            value={state.editingId ? 'Save Changes' : 'Record Expense'}
        />
    </form>
    </>
  ) 
}

export default ExpenseForm