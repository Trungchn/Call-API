import React, { Component } from 'react';
import ProductList from './../../components/ProductList/ProductList';
import ProductItem from './../../components/ProductItem/ProductItem';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { actFetchProductsRequest, actDeleteProductsRequest } from './../../actions/index';

class ProductListPage extends Component {
  componentDidMount(){ //được gọi sau khi component render lần đầu tiên, tức render xong lần đầu sẽ gọi tiếp đến hàm componentDidMount() để chạy
    this.props.fetchAllProducts();
  }

  findIndex = (products, id) => {
    var result = -1;
    products.forEach((product, index) => {
      if(product.id === id) {
        result = index;
      }     
    });
    return result;
  }

  onDelete = (id) => {
    this.props.onDeleteProduct(id);
  }
  render() {
    //var {products} = this.props;
    var {products} = this.props;
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <Link to="/products/add" className="btn btn-info mb-10">
          Thêm sản phẩm
        </Link>
        <ProductList>
          {this.showProduct(products)}
        </ProductList>
      </div>
    );
  }

  showProduct(products){
    var result = null;
    if(products.length > 0){
      result = products.map((product, index) =>{
        return (
          <ProductItem 
                    key={index}
                    product={product}
                    index={index}
                    onDelete={this.onDelete}/>
        );
      });
    }
    return result;
  }
}

const mapStateToProps = state => { // lấy tất cả các products từ store
  return {
    products: state.products
  }
}

const mapDispatchToProps = (dispatch, props) => { // lưu products lên store
  return {
    fetchAllProducts : () => {
      dispatch(actFetchProductsRequest());
    },
    onDeleteProduct : (id) => {
      dispatch(actDeleteProductsRequest(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
