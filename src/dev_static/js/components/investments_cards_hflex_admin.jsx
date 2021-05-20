import React from 'react';
import ReactDOM, { render } from 'react-dom';
import StockCard from './stock_card_admin'
import AddStockCard from './add_stock_card' 

function parse_company_card(data){
  return {
    "rec_id":-1,// for company
    "symbol":"COMPANY",
    "holdings":data.sums.company_holdings,
    "Profits": data.sums.company_active_profits,
    "profit_prcntg":data.sums.company_active_profits_prcntg,
    "invested_in_company": data.sums.invested_in_company
 };
}

class Investments_Cards extends React.Component {

  sort_by_prft() {
    
    if (this.state.sorted_by === "Profits"){
        this.state.desc_sort = !this.state.desc_sort
    } else {
        this.state.desc_sort = false;
    }

    var sort_order = (this.state.desc_sort) ? 1 : -1 ;

    this.setState({

      sorted_by: "Profits",
      desc_sort: this.state.desc_sort,
      stocks_list: this.state.stocks_list.sort(function (a, b) {
        return (a.profit - b.profit) * sort_order;
      })

    });
  }

  sort_by_holdings() {
    
    if (this.state.sorted_by === "Holdings"){
        this.state.desc_sort = !this.state.desc_sort
    } else {
        this.state.desc_sort = false;
    }

    var sort_order = (this.state.desc_sort) ? 1 : -1 ;

    this.setState({

      sorted_by: "Holdings",
      desc_sort: this.state.desc_sort,
      stocks_list: this.state.stocks_list.sort(function (a, b) {
        return (a.holdings - b.holdings) * sort_order;
      })

    });
  }

  constructor(props) {
    super(props);

    this.state = {
      sorted_by: "Holdings",
      desc_sort: true,
      stocks_list: this.props.data.active_stocks
    };

  }

  render(){

    let comp_card = <StockCard key={-1} rec={parse_company_card(this.props.data)} user_id={this.props.user_id}/>

    const cards = this.state.stocks_list.map((rec) =>
        <StockCard key={rec.rec_id} rec={rec} user_id={this.props.user_id}/>
    );

    let add_stock = <AddStockCard key={-2} user_id={this.props.user_id}/>

    // TODO Add button
    
    return (
      <div className="investments_cards">
        {comp_card}
        {cards}
        {add_stock}
      </div>
    );
  }
}

export default Investments_Cards;

