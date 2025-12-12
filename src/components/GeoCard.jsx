function GeoCard({ geo, isFetching, mapUrl, formatValue }) {
  return (
    <section className="card full">
      <div className="card-title">
        <div>
          <p className="muted">Current selection</p>
          <h3>{formatValue(geo?.ip)}</h3>
        </div>
        {isFetching && <span className="tag">Loading...</span>}
      </div>
      {!geo && <p className="muted">No data yet. Try searching.</p>}
      {geo && (
        <div className="geo-grid">
          <div className="geo-info">
            <div className="info-row">
              <span>City</span>
              <strong>{formatValue(geo.city)}</strong>
            </div>
            <div className="info-row">
              <span>Region</span>
              <strong>{formatValue(geo.region)}</strong>
            </div>
            <div className="info-row">
              <span>Country</span>
              <strong>{formatValue(geo.country)}</strong>
            </div>
            <div className="info-row">
              <span>Postal</span>
              <strong>{formatValue(geo.postal)}</strong>
            </div>
            <div className="info-row">
              <span>Coordinates</span>
              <strong>{formatValue(geo.loc)}</strong>
            </div>
            <div className="info-row">
              <span>Timezone</span>
              <strong>{formatValue(geo.timezone)}</strong>
            </div>
            <div className="info-row">
              <span>ASN / Org</span>
              <strong>{formatValue(geo.org)}</strong>
            </div>
          </div>
          {mapUrl ? (
            <div className="map">
              <iframe
                title="map"
                src={mapUrl}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          ) : (
            <div className="map empty">Location not available</div>
          )}
        </div>
      )}
    </section>
  );
}

export default GeoCard;

