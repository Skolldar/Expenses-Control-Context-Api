
//Acciones:
export type BudgetActions = 
{type : 'add-budget', payload: {budget: number}} |
{type: 'show-modal'}

//state local:
export type BudgetState = {
    budget : number,
    modal:boolean
}

//se le sincronizza con budgetstate
export const initialState : BudgetState = {
    budget : 0,
    modal: false
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
    return state
}
