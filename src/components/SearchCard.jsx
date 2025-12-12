function SearchCard({
  search,
  setSearch,
  onSearch,
  onClear,
  searchError,
  isFetching,
}) {
  return (
    <section className="card">
      <div className="card-title">
        <div>
          <p className="muted">Search IP</p>
          <h3>Geolocation lookup</h3>
        </div>
      </div>
      <form className="search" onSubmit={onSearch}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter IPv4 or IPv6 address"
        />
        <div className="search-actions">
          <button type="submit" className="primary" disabled={isFetching}>
            {isFetching ? 'Searching...' : 'Search'}
          </button>
          <button type="button" className="ghost" onClick={onClear}>
            Clear
          </button>
        </div>
      </form>
      {searchError && <p className="error">{searchError}</p>}
      <p className="muted small">
        Default view shows your own IP. Search will add to history.
      </p>
    </section>
  );
}

export default SearchCard;

