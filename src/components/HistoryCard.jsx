function HistoryCard({
  history,
  selectedIds,
  toggleHistorySelect,
  deleteSelected,
  onSelectEntry,
}) {
  return (
    <section className="card">
      <div className="card-title">
        <div>
          <p className="muted">Recent history</p>
          <h3>Tap to load</h3>
        </div>
        <button
          className="ghost small-btn"
          type="button"
          disabled={!selectedIds.length}
          onClick={deleteSelected}
        >
          Delete selected
        </button>
      </div>
      <div className="history">
        {history.length === 0 && <p className="muted">No searches yet.</p>}
        {history.map((item) => (
          <div key={item.id} className="history-row">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={selectedIds.includes(item.id)}
                onChange={() => toggleHistorySelect(item.id)}
              />
            </label>
            <button
              type="button"
              className="history-item"
              onClick={() => onSelectEntry(item)}
            >
              <div className="history-ip">{item.ip}</div>
              <div className="history-meta">
                {new Date(item.viewedAt).toLocaleString()}
              </div>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HistoryCard;

