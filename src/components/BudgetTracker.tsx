import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { useBudget } from "../hooks/useBudget" //para acceder al state
import AmountDisplay from "./AmountDisplay"

const BudgetTracker = () => {
    //Accedemos al state desde el hook useBudget
    const {state, totalExpenses, remainingBudget, dispatch} = useBudget();

    const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)
    // console.log(percentage)

  // Function to determine pathColor based on percentage
  const getPathColor = (percentage: number) => {
    if (percentage < 85) {
      return '#2563EB'; // Blue (less than 85%)
    } else if (percentage >= 95) {
      return '#DC2626'; // Red (95% to 100%)
    } else {
      return '#EF7201'; // Orange (85% to 95%)
    }
  };

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
            <CircularProgressbar
                value={percentage}
                styles={buildStyles({
                    pathColor: getPathColor(percentage), 
                    trailColor: '#F5F5F5',
                    textColor: '#2563EB',
                    textSize: 12,
                })}
                text={`${percentage}%`}
            />
        </div>
        <div className="flex flex-col justify-center items-center gap-8">
            <button
            type="button"
            className="bg-yellow-600 w-full p-2 text-white uppercase font-bold rounded-lg"
            onClick={() => dispatch({type: 'reset-app'})}
            >
                Reset App
            </button>

            <AmountDisplay 
                label="Budget"
                amount={state.budget}
            />

            <AmountDisplay 
                label="Available"
                amount={remainingBudget}
            />

            <AmountDisplay 
                label="Spent"
                amount={totalExpenses}
            />

        </div>
    </div>
    </>
  )
}

export default BudgetTracker