import Navbar from 'components/Navbar';
import ProducCard from 'components/ProductCard';

const Catalog = () => {
  return (
    <>
      <Navbar />
      <div className="container my-4">
        <ProducCard />
      </div>
    </>
  );
};

export default Catalog;
