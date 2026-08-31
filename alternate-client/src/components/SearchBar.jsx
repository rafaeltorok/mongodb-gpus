export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div>
      <input
        id="search-bar"
        type="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
