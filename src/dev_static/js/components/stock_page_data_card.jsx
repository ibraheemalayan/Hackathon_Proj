import React from 'react';
import ReactDOM, { render } from 'react-dom';

class Own_Stock_Card extends React.Component {
    render(){
  
      let color = "dark_green";
  
      if (parseFloat(this.props.active_share.profit) <= 0) {
        color = "red";
      }
  
      return (

      <div>
        <div className="hflex">
          <div className="hcard_element hcard_element_left">
            <div className="summary_card_label op70">Profit</div>
            <div id="personal_holdings_container">
              <div className="personal_holdings_container">
                <div className={"personal_holdings_big_num " + color}>$ <span className={color}>{this.props.active_share.profit}</span></div>
              </div>
            </div>
          </div>
          <div className="hcard_element">
            <div className="summary_card_label op70">Cost/Share</div>
            <div id="personal_holdings_container">
              <div className="personal_holdings_container">
                <div className="personal_holdings_big_num">$ {this.props.active_share.purchase_price}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="hflex">
          <div className="hcard_element hcard_element_left">
            <div className="summary_card_label op70">Amount</div>
            <div id="personal_holdings_container">
              <div className="personal_holdings_container">
                <div className="personal_holdings_big_num">{this.props.active_share.amount}</div>
              </div>
            </div>
          </div>
          <div className="hcard_element">
            <div className="summary_card_label op70">Value/Share</div>
            <div id="personal_holdings_container">
              <div className="personal_holdings_container">
                <div className={"personal_holdings_big_num " + color}>$ <span className={color}>{this.props.active_share.current_price}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
    }
  }

export default Own_Stock_Card;
