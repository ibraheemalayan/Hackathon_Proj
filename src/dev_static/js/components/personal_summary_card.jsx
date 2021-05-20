import React from 'react';
import ReactDOM, { render } from 'react-dom';

class Personal_card extends React.Component {
    render(){
  
      let color = "green";
  
      let profit_indicator = "▲";
  
      if (parseFloat(this.props.sums.personal_active_profits) <= 0) {
        profit_indicator = "▼";
        color = "red";
      }
  
      return (
        <div className="personal_holdings_container">
          <div className="personal_holdings_big_num">$ {this.props.sums.personal_holdings}</div>
          <div className="personal_holdings_small_num_container">
            <div className="personal_holdings_small_num op70"><span className={color}>{profit_indicator}</span> ${this.props.sums.personal_active_profits} (%{this.props.sums.personal_active_profits_prcntg})</div>
          </div>
        </div>
      );
    }
  }

export default Personal_card;