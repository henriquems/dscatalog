import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';
import ProductFilter, { ProdcutFilterData } from 'components/ProductFilter';
import ProductCrudCard from 'pages/Admin/Products/ProductCrudCard';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import './styles.css';

type ControlComponetsData = {
  activePage: number;
  filterData: ProdcutFilterData;
};

const List = () => {
  const [page, setPage] = useState<SpringPage<Product>>();

  const [controlComponetsData, setControlComponetsData] =
    useState<ControlComponetsData>({
      activePage: 0,
      filterData: { name: '', category: null },
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponetsData({ activePage: pageNumber, filterData: controlComponetsData.filterData});
  };

  const handleSubmitFilter = (data: ProdcutFilterData) => {
    setControlComponetsData({ activePage: 0, filterData: data});
  };

  const getProducts = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/products',
      params: {
        page: controlComponetsData.activePage,
        size: 3,
        name: controlComponetsData.filterData.name,
        categoryId: controlComponetsData.filterData.category?.id
      },
    };

    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  }, [controlComponetsData]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className="product-crud-container">
      <div className="product-crud-bar-container">
        <Link to="/admin/products/create">
          <button className="btn btn-primary text-white btn-crud-add">
            ADICIONAR
          </button>
        </Link>
        <ProductFilter onSubmitFilter={handleSubmitFilter} />
      </div>
      <div className="row">
        {page?.content.map((product) => (
          <div className="col-sm-6 col-md-12" key={product.id}>
            <ProductCrudCard product={product} onDelete={getProducts} />
          </div>
        ))}
      </div>
      <Pagination
        forcePage={page?.number}
        pageCount={page ? page.totalPages : 0}
        range={3}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default List;
