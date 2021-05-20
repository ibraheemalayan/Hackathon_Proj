import React from 'react';
import ReactDOM, { render } from 'react-dom';

class Pre_White extends React.Component {
  render(){

    let color = "green";

    let profit_indicator = "▲";

    if (parseFloat(this.props.active_share.profit) <= 0) {
      profit_indicator = "▼";
      color = "red";
    }

    return (

      <div>
        <img className="stock_logo" src="/static/img/white-favicon.svg" alt="{{active_share.symbol}} Logo" />
        <div className="holdings_big_num">$ {this.props.active_share.holdings}</div>
        <div className="holdings_small_num_container">
          <div className="holdings_small_num op70"><span className={"pre_chart_prft_indicator " + color}>{profit_indicator}</span> ${this.props.active_share.profit} (%{this.props.active_share.profit_prcntg})</div>
        </div>
      </div>
    );
  }
}
export default Pre_White;