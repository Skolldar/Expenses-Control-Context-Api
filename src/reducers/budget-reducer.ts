import {v4 as uuidv4} from 'uuid';

import { DarftExpense, Expense } from "../types"

//Acciones:
export type BudgetActions = 
{type : 'add-budget', payload: {budget: number}} |
{type: 'show-modal'} |
{type: 'close-modal'} |
{type: 'add-expense', playload: {expense: DarftExpense}} |
{type: 'remove-expense', playload: {id: Expense['id']}} |
{type: 'get-expense-by-id', playload: {id: Expense['id']}} |
{type: 'update-expense', playload: {expense: Expense}} |
{type: 'reset-app'}


//state local:
export type BudgetState = {
    budget : number
    modal:boolean
    expenses: Expense[]
    editingId: Expense['id'] //using look up to edit 
}

//Guardando el state  en el localstorage
//retorna siempre como numero, ya que tenemos el budget: 0.
const initialBudget = () : number => {
    const localStorageBudget = localStorage.getItem('budget') //se asigna con el mismo nombre
    //si el localstorage tiene algo, retorna el localstorage en numero (+localstoragebudget) y si no, retornara un 0.
    return localStorageBudget ? +localStorageBudget : 0
}

//El valor inicial es Expenses[] 
const localStorageExpenses = () : Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses')
    //se usa el JSON.PARSE para que retorne siempre un string
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

//se le sincronizza con budgetstate
export const initialState : BudgetState = {
    budget : initialBudget(), //aca hacemos llamar la funcion de nuestro localstoragebudget
    modal: false,
    expenses: localStorageExpenses(),
    editingId: ''
}

const createExpense = (draftExpense: DarftExpense) : Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }
}

//reducer:
export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
    ) => {
    if(action.type === 'add-budget') {
        return {
            ...state,
            budget : action.payload.budget
        }
    }

    if(action.type === 'show-modal') {
        return {
            ...state,
            modal: true
        }
    }

    if(action.type === 'close-modal') {
        return {
            ...state,
            modal: false,
            editingId: ''
        }
    }

    if(action.type === 'add-expense') {action.playload.expense
        const expense = createExpense(action.playload.expense) //de esta forma sabe que tiene qe tomar un gasto sin ID y regresarlo con ID

        return {
            ...state,
            expenses: [...state.expenses, expense ], //action.payload.expense para que lo agrege ya que se pasa como un DRAFT
            modal: false
        }
    }

    if(action.type === 'remove-expense') {
        return {
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== action.playload.id)
        }
    }


        if(action.type === 'get-expense-by-id'){
            return {
                ...state,
                editingId: action.playload.id,
                modal: true
            }
        }

        if(action.type === 'update-expense') {
            return {
                ...state,
                //Accedemos a cada gasto individual con .map y con el .id accedemos al que este activo para actualizar, cuando dectecte que es igual, vamos a reescribir la action con el playload y en caso contrario retorno el gasto que estaba iterando.
                expenses: state.expenses.map(expense => expense.id === action.playload.expense.id ? action.playload.expense : expense),
                modal: false,
                 editingId: ''
            }
        }

        if(action.type === 'reset-app') {
            return {
                ...state,
                budget : 0,
                expenses: []

            }
        }

        return state
    }