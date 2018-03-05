import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { actAddProductRequest, actGetProductRequest, actUpdateProductRequest } from './../../actions/index';
import { connect } from 'react-redux';

class ProductActionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      txtName: '',
      txtPrice: '',
      chkbStatus: ''
    };
  }

  componentDidMount() {
    var { match } = this.props;
    if (match) {
      var id = match.params.id;
      this.props.onEditProduct(id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.itemEditing) {
      var { itemEditing } = nextProps;
      this.setState({
        id: itemEditing.id,
        txtName: itemEditing.name,
        txtPrice: itemEditing.price,
        chkbStatus: itemEditing.status
      });
    }
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value
    });
  }

  onSave = (event) => {
    event.preventDefault(); // tránh load lại trang
    var { id, txtName, txtPrice, chkbStatus } = this.state;
    //var { history } = this.props;
    var product = {
      id: id,
      name: txtName,
      price: txtPrice,
      status: chkbStatus
    };
    function goBack() {
      window.history.back();
    }
    if (id) { // id tồn tại => update(PUT), ngược lại => create(POST)
      this.props.onUpdateProduct(product);
    }
    else {
      this.props.onAddProduct(product);
    }
    goBack();
  }
  render() {
    var { txtName, txtPrice, chkbStatus } = this.state;
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">

        <form onSubmit={this.onSave}>
          <legend>Nhập thông tin sản phẩm</legend>

          <div className="form-group">
            <label>Tên sản phẩm:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Tên sản phẩm..."
              name="txtName"
              value={txtName}
              onChange={this.onChange} />
          </div>

          <div className="form-group">
            <label>Giá sản phẩm:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Giá sản phẩm..."
              name="txtPrice"
              value={txtPrice}
              onChange={this.onChange} />
          </div>

          <div className="form-group">
            <label>Trạng thái:</label>
          </div>

          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                name="chkbStatus"
                value={chkbStatus}
                onChange={this.onChange}
                checked={chkbStatus} />
              Còn hàng
            </label>
          </div>
          <Link to="/products-list" className="btn btn-danger mr-10">Quay lại</Link>
          <button onClick={this.onSave} className="btn btn-primary">Lưu Lại</button>
        </form>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    itemEditing: state.itemEditing
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddProduct: (product) => {
      dispatch(actAddProductRequest(product));
    },
    onEditProduct: (id) => {
      dispatch(actGetProductRequest(id));
    },
    onUpdateProduct: (product) => {
      dispatch(actUpdateProductRequest(product));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);
