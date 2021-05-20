import React from 'react';
import ReactDOM, { render } from 'react-dom';

class AddStockCard extends React.Component {

  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
}

  click(){
    window.location = '/admin/customers/shares/add_active/' +  this.props.user_id;
  }

  render(){


    let card_classes="card stock_card add_stock_card";

    return (

      <div className={card_classes} onClick={this.click}>
        <img src="/static/img/add.svg" alt="Add Stock"/>
        <div>Add Stock</div>
      </div>
    );
  }
}
export default AddStockCard;