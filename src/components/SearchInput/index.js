import {BsSearch} from 'react-icons/bs'
import './index.css'

const SearchInput = props => {
  const {searchInput, updateSearchInput, searchIconClicked} = props

  const onChangeInput = event => {
    updateSearchInput(event.target.value)
  }

  const onClickSearchIcon = () => {
    searchIconClicked()
  }

  return (
    <div className="search-input-container">
      <input
        className="search-input"
        value={searchInput}
        type="search"
        onChange={onChangeInput}
        placeholder="Search"
      />
      <button
        className="search-button"
        type="button"
        data-testid="searchButton"
        onClick={onClickSearchIcon}
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )
}

export default SearchInput
