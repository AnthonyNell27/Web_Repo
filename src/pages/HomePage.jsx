import { useEffect, useMemo, useState } from 'react';
import HeaderBar from '../components/HeaderBar';
import SearchCard from '../components/SearchCard';
import HistoryCard from '../components/HistoryCard';
import GeoCard from '../components/GeoCard';
import { fetchGeo } from '../api/client';
import { useAuth } from '../context/AuthContext';

const ipv4Regex =
  /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/;
const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::1)$/;

const isValidIp = (value) => ipv4Regex.test(value) || ipv6Regex.test(value);
const formatValue = (value) => value || '—';

const randomManilaGeo = () => {
  // Rough bounding box around Metro Manila
  const lat = 14.4 + Math.random() * 0.3; // 14.4 - 14.7
  const lng = 120.9 + Math.random() * 0.3; // 120.9 - 121.2
  return {
    ip: 'manila.default',
    city: 'Manila',
    region: 'Metro Manila',
    country: 'PH',
    postal: '1000',
    loc: `${lat.toFixed(4)},${lng.toFixed(4)}`,
    timezone: 'Asia/Manila',
    org: 'Sample ISP Manila',
  };
};

function HomePage() {
  const { auth, logout } = useAuth();
  const [geo, setGeo] = useState(null);
  const [baseGeo, setBaseGeo] = useState(null);
  const [search, setSearch] = useState('');
  const [searchError, setSearchError] = useState('');
  const [isFetchingGeo, setIsFetchingGeo] = useState(false);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('history');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    if (auth && !baseGeo) {
      const preset = randomManilaGeo();
      setBaseGeo(preset);
      setGeo(preset);
    }
  }, [auth, baseGeo]);

  const [lat, lng] = useMemo(() => {
    if (!geo?.loc) return [null, null];
    const [latValue, lngValue] = geo.loc.split(',');
    return [Number(latValue), Number(lngValue)];
  }, [geo]);

  const hasCoords = Number.isFinite(lat) && Number.isFinite(lng);
  const mapUrl = hasCoords
    ? `https://maps.google.com/maps?q=${lat},${lng}&z=11&output=embed`
    : null;

  const loadGeo = async (ip) => {
    setIsFetchingGeo(true);
    setSearchError('');
    try {
      const data = await fetchGeo(ip);
      setGeo(data);
      if (!ip) setBaseGeo(data);
      return data;
    } catch (error) {
      console.error(error);
      setSearchError('Unable to fetch geolocation right now.');
      return null;
    } finally {
      setIsFetchingGeo(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchError('');
    const trimmed = search.trim();
    if (!trimmed) {
      setSearchError('Enter an IP address to search.');
      return;
    }
    if (!isValidIp(trimmed)) {
      setSearchError('Enter a valid IPv4 or IPv6 address.');
      return;
    }

    const data = await loadGeo(trimmed);
    if (data) {
      const entry = {
        id: Date.now(),
        ip: trimmed,
        data,
        viewedAt: new Date().toISOString(),
      };
      setHistory((prev) => [entry, ...prev.filter((item) => item.ip !== trimmed)]);
      setSelectedIds([]);
      setSearch('');
    }
  };

  const handleHistoryClick = (entry) => {
    setGeo(entry.data);
    setSearch(entry.ip);
    setSearchError('');
  };

  const toggleHistorySelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const deleteSelected = () => {
    setHistory((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
    setSelectedIds([]);
  };

  const clearSearch = () => {
    setSearch('');
    setSearchError('');
    if (baseGeo) setGeo(baseGeo);
    else {
      const preset = randomManilaGeo();
      setBaseGeo(preset);
      setGeo(preset);
    }
  };

  return (
    <div className="page">
      <HeaderBar auth={auth} onLogout={logout} />

      <div className="grid">
        <SearchCard
          search={search}
          setSearch={setSearch}
          onSearch={handleSearch}
          onClear={clearSearch}
          searchError={searchError}
          isFetching={isFetchingGeo}
        />
        <HistoryCard
          history={history}
          selectedIds={selectedIds}
          toggleHistorySelect={toggleHistorySelect}
          deleteSelected={deleteSelected}
          onSelectEntry={handleHistoryClick}
        />
      </div>

      <GeoCard
        geo={geo}
        isFetching={isFetchingGeo}
        mapUrl={mapUrl}
        formatValue={formatValue}
      />
    </div>
  );
}

export default HomePage;

