import React, { useState } from "react";

const SearchBox = props => {
    const [name, setName] = useState('')

    const submitHandler = e => {
        e.preventDefault()
        props.history.push(`/search/name/${name}`)
    }
  return (
    <form className="form-inline my-2 my-lg-0" onSubmit={submitHandler}>
      <input
        className="form-control mr-sm-2"
        type="search"
        name="q"
        id="q"
        onChange={e => setName(e.target.value)}
        placeholder="Search"
        aria-label="Search"
        style={{fontSize: '1.5rem', boxShadow:'none'}}
      />
      <button className="btn btn-outline-warning my-2 my-sm-0" type="submit" style={{fontSize: '1.5rem', boxShadow:'none'}}>
        Search
      </button>
    </form>
  );
};

export default SearchBox;
