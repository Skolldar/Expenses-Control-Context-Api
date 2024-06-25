import {v4 as uuidv4} from 'uuid';

import { DarftExpense, Expense } from "../types"

//Acciones:
export type BudgetActions = 
{type : 'add-budget', payload: {budget: number}} |
{type: 'show-modal'} |
{type: 'close-modal'} |
{type: 'add-expense', playload: {expense: DarftExpense}} |
{type: 'remove-expense', playload: {id: Expense['id']}}

//state local:
export type BudgetState = {
    budget : number,
    modal:boolean,
    expenses: Expense[]
}

//se le sincronizza con budgetstate
export const initialState : BudgetState = {
    budget : 0,
    modal: false,
    expenses: []
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
            modal: false
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

    if(action.type === 'remove-expense')
        return {
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== action.playload.id)
        }
        
        return state
    }