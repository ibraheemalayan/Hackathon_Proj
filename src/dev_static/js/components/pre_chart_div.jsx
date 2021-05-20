import React from 'react';
import ReactDOM, { render } from 'react-dom';

class Pre_chart extends React.Component {
  render(){

    let color = "green";

    let profit_indicator = "▲";

    if (parseFloat(this.props.sums.total_active_profits) <= 0) {
      profit_indicator = "▼";
      color = "red";
    }

    return (
      <div className="holdings_container">
            <div className="holdings_big_num">$ {this.props.sums.total_holdings}</div>
            <div className="holdings_small_num_container">
                <div className="holdings_small_num op70"><span className={"pre_chart_prft_indicator " + color}>{profit_indicator}</span> ${this.props.sums.total_active_profits} (%{this.props.sums.total_active_profits_prcntg})</div>
            </div>
        </div>
    );
  }
}
export default Pre_chart;