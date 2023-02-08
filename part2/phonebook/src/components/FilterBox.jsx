import React from 'react'

const FilterBox = ({keyword, handleFilter}) => {
  return (
    <div>
      filter shown with <input value={keyword} onChange={handleFilter} />
    </div>
  )
}

export default FilterBox