export const Searchbar = ({ onSubmit }) => {
  return (
    <header class="searchbar">
      <form onSubmit={() => onSubmit()} class="form">
        <button type="submit" class="button">
          <span class="button-label">Search</span>
        </button>

        <input
          class="input"
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
