//Acciones:
export type BudgetActions = 
{type : 'add-budget', payload: {budget: number}}

//state local:
export type BudgetState = 
{budget : number}

//se le sincronizza con budgetstate
export const initialState : BudgetState = 
{budget : 0}


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
    return state
}
