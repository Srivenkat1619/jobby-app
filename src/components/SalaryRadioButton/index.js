import './index.css'

const SalaryRadioButton = props => {
  const {salaryRangeDetails, updateSalaryRangeId, isChecked} = props
  const {label, salaryRangeId} = salaryRangeDetails

  const onClickRadio = () => {
    updateSalaryRangeId(salaryRangeId)
  }

  return (
    <li className="radio-list-item">
      <input
        className="radio-input"
        type="radio"
        onChange={onClickRadio}
        id={`salary-${salaryRangeId}`}
        name="salary"
        checked={isChecked}
      />
      <label className="filter-label" htmlFor={`salary-${salaryRangeId}`}>
        {label}
      </label>
    </li>
  )
}

export default SalaryRadioButton
