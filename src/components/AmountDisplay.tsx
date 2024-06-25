import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
  label?: string //means that ca be optional
  amount: number
}

const AmountDisplay = ({label, amount} : AmountDisplayProps) => {
  return (
    <>
    <p className="text-2xl text-teal-700 font-bold">
      {label && `${label}: `}
      <span className="font-black text-gray-600">{formatCurrency(amount)}</span>
    </p>
    </>
  )
}

export default AmountDisplay