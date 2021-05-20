import React from 'react';
import ReactDOM, { render } from 'react-dom';

class Sort_Toolbar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sorted_by: "Holdings",
            desc_sort: false
        };
    
        this.change_sort_by = this.change_sort_by.bind(this);
        this.change_sort_direction = this.change_sort_direction.bind(this);
    }

    change_sort_by(){

        if (this.state.sorted_by === "Profits"){
            this.setState({
                sorted_by: "Holdings",
                desc_sort: false
            })
            this.props.cards.sort_by_holdings();
        } else {
            this.setState({
                sorted_by: "Profits",
                desc_sort: false
            })
            this.props.cards.sort_by_prft();
        }
    }

    change_sort_direction(){

        if (this.state.sorted_by === "Profits"){
            this.setState({
                sorted_by: "Profits",
                desc_sort: !this.state.desc_sort
            })
            this.props.cards.sort_by_prft();
        } else {
            this.setState({
                sorted_by: "Holdings",
                desc_sort: !this.state.desc_sort
            })
            this.props.cards.sort_by_holdings();
        }
    }
  
    render(){

        window.change_sort_by = this.change_sort_by;
  
        let direction_indicator = (this.state.desc_sort)?"▲":"▼";
    
        return (
            <div className="card_title_container no_margin_btm hflex">
                <div className="card_title">Investments</div>
                <div onClick={this.change_sort_by} className="sort_icon sort_icon_mid card">{this.state.sorted_by}</div>
                <div onClick={this.change_sort_direction} className="sort_icon card">{direction_indicator}</div>
            </div>
        );
    }
}
export default Sort_Toolbar;