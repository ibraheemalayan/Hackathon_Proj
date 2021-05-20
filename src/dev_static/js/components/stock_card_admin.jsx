import React from 'react';
import ReactDOM, { render } from 'react-dom';

class StockCard extends React.Component {

  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
}

  click(){
    window.location = '/admin/customers/' + this.props.user_id + '/shares/' + this.props.rec.symbol;
  }

  render(){

    let hflex1, hflex2;

    let is_company = (this.props.rec.rec_id < 0);

    let img_url = "/static/img/dark_on_white_favicon.svg";

    let color = "green";

    let card_classes="card stock_card" + ((is_company)?" dark_card":"")

    let profit_indicator = "▲";

    if (parseFloat(this.props.rec.profit) <= 0) {
      profit_indicator = "▼";
      color = "red";
    }

    if (is_company) {

      // Company card

      img_url = "/static/img/white-favicon.svg";

      hflex1 = <div className="stock_card_hflex">
                 <div className="company_card_small_label">invested in company</div>
               </div>;

      hflex2 = <div className="stock_card_hflex">
                 <div className="company_card_small_num">${this.props.rec.invested_in_company}</div>
               </div>;

    } else {

        hflex1 = <div className="stock_card_hflex">
                   <div className="stock_card_small_label">owned shares</div>
                   <div className="stock_card_small_num">{this.props.rec.amount}</div>
                 </div>;

        hflex2 = <div className="stock_card_hflex">
                   <div className="stock_card_small_label">cost/share</div>
                   <div className="stock_card_small_num">${this.props.rec.purchase_price}</div>
                 </div>;

    }

    return (

      <div className={card_classes} onClick={this.click}>
        <img className="stock_icon" src={img_url} alt={this.props.rec.symbol + " Logo"} />
        <div className="stock_symbol">{this.props.rec.symbol}</div>
        <div className="stock_holdings">$<span className="num" />{this.props.rec.holdings}</div>
        <div className="stock_prfts_container">
          <span className={"pre_stock_prft_indicator " + color}>{profit_indicator}</span> $<span className="stock_prfts num">{this.props.rec.profit}</span> (%<span className={"stock_prfts_pcntg num " + color}>{this.props.rec.profit_prcntg}</span>)
        </div>
        {hflex1}
        {hflex2}  
      </div>
    );
  }
}
export default StockCard;