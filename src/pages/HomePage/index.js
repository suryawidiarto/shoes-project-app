import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../redux/actions/ProductActions";
import Loading from "../../components/Loading";
import ProductCard from "../../components/ProductCard";
import Pagination from "@mui/material/Pagination";
import "./HomePage.scss";

const HomePage = () => {
  const dispatch = useDispatch();
  const ProductAll = useSelector((state) => state.ProductAll);
  const [page, setPage] = useState(ProductAll.statePage || 1);
  const { data } = ProductAll;

  useEffect(() => {
    if (!data) {
      dispatch(getAllProduct(page));
    }
  }, [data, dispatch, page]);

  const totalPage = data && Math.ceil(data.totalItems / data.itemPerPage);

  const pageHandler = (event, value) => {
    setPage(value);
    dispatch(getAllProduct(value));
  };

  return !data ? (
    <Loading />
  ) : (
    <div>
      <div className="home-container">
        <div className="home-product-wrapper">
          {data &&
            data.items.map((item) => (
              <ProductCard
                key={item._id}
                Img={`${process.env.REACT_APP_SERVER_URL}/sp-api-products/product-img/${item.image[0]}`}
                Title={item.name}
                Price={item.price}
                Description={item.description}
                ProductId={item._id}
              />
            ))}
        </div>
        <Pagination
          className="home-pagination"
          count={totalPage}
          page={page}
          onChange={pageHandler}
          size="large"
        />
      </div>
    </div>
  );
};

export default HomePage;
