import './index.css'

const EmploymentCheckBox = props => {
  const {employmentTypesDetails, updateCheckedEmploymentTypes, isChecked} =
    props

  const {label, employmentTypeId} = employmentTypesDetails

  const onClickCheckbox = () => {
    updateCheckedEmploymentTypes(employmentTypeId)
  }

  return (
    <li className="checkbox-list-item">
      <input
        className="checkbox-input"
        type="checkbox"
        onChange={onClickCheckbox}
        id={`employment-${employmentTypeId}`}
        checked={isChecked}
      />
      <label
        className="filter-label"
        htmlFor={`employment-${employmentTypeId}`}
      >
        {label}
      </label>
    </li>
  )
}

export default EmploymentCheckBox
