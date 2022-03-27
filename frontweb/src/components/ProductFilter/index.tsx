import { ReactComponent as SearchIcon } from 'assets/images/search-icon.svg';

import './styles.css';

const ProductFilter = () => {
  
  return (
    <div className="base-card product-filter-container">
      <form action='' className="product-filter-form">
        <div className="product-filter-name-container">
          <input
            type="text"
            className="form-control"
            placeholder="Nome do produto"
            name="name"
          />
          <button className="product-filter-search-icon">
            <SearchIcon />
          </button>
        </div>
        <div className="product-filter-bottom-container">
          <div className="product-filter-category-container">
            
          </div>
          <button
            className="btn btn-outline-secondary btn-product-filter-clear"
          >
            LIMPAR<span className="btn-product-filter-word"> FILTRO</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductFilter;
