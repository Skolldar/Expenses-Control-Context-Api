
const BudgetTracker = () => {
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
            <img src="/grafico.jpg" alt="Grafico"/>

        </div>
        <div className="flex flex-col justify-center items-center gap-8">
            <button
            type="button"
            className="bg-yellow-600 w-full p-2 text-white uppercase font-bold rounded-lg"
            >
                Reset App
            </button>
        </div>
    </div>
    </>
  )
}

export default BudgetTracker