function update_and_color_sum(el_id, sign, value, green="green"){

    var float_val = parseFloat(value);
    var color_class = ( float_val > 0 )? green : "red";
    var element = document.getElementById(el_id);

    element.innerText = float_val + sign
    element.classList.add(color_class);
    
}

function update_and_color_currevt_deps_value(invested, prft_prcntg, prft){

    var float_invested = parseFloat(invested);
    var float_prft_prcntg = parseFloat(prft_prcntg);
    var float_prft = parseFloat(prft);

    var color_class = ( float_prft_prcntg > 0 )? "green" : "red";

    var total_active_deposites_element = document.getElementById("total_active_deposites");
    var total_active_deposites_prcntg_element = document.getElementById("total_active_deposites_prcntg");

    var total_active_deposites_prcntg = (100 + float_prft_prcntg).toFixed(2);
    var total_active_deposites = (float_invested + float_prft).toFixed(2);

    total_active_deposites_element.innerText = total_active_deposites + '$'
    total_active_deposites_prcntg_element.innerText = total_active_deposites_prcntg + '%'

    total_active_deposites_element.classList.add(color_class);
    total_active_deposites_prcntg_element.classList.add(color_class);
    
}

function set_sums(data){

    update_and_color_sum("active_profit_sum", "", data.sums.personal_active_profits, "darkgreen");
    update_and_color_sum("user_prfts", "$", data.sums.personal_active_profits);

    update_and_color_sum("total_prfts", "$", data.sums.total_profits);
    update_and_color_sum("total_active_prfts", "$", data.sums.total_active_profits);
    update_and_color_sum("comp_prfts", "$", data.sums.company_active_profits);

    // No capital
    update_and_color_sum("comp_prfts_admin_nocapital", "$", data.sums.company_active_profits_admin_nocapital);
    update_and_color_sum("total_active_prfts_admin_nocapital", "$", data.sums.total_active_profits_admin_nocapital);
    update_and_color_sum("total_prfts_admin_nocapital", "$", data.sums.total_profits_admin_nocapital);
    
    // Percentages
    update_and_color_sum("user_prfts_prcntg", "%", data.sums.personal_active_profits_prcntg);

    update_and_color_sum("total_prfts_prcntg", "%", data.sums.total_profits_prcntg);
    update_and_color_sum("total_active_prfts_prcntg", "%", data.sums.total_active_profits_prcntg);
    update_and_color_sum("comp_prfts_prcntg", "%", data.sums.company_active_profits_prcntg);

    // No capital

    update_and_color_sum("total_active_prfts_prcntg_admin_nocapital", "%", data.sums.total_active_profits_prcntg_admin_nocapital);
    update_and_color_sum("comp_prfts_prcntg_admin_nocapital", "%", data.sums.company_active_profits_prcntg_admin_nocapital);
    update_and_color_sum("total_prfts_prcntg_admin_nocapital", "%", data.sums.total_profits_prcntg_admin_nocapital);

    // Sum
    update_and_color_currevt_deps_value(data.sums.total_currently_invested, data.sums.total_active_profits_prcntg, data.sums.total_active_profits)

    document.getElementById("oldest_date").innerText = "Note that this data was obtained at " + data.oldest_cache_time;


}

class Table_Row extends React.Component {
    constructor(props) {
        super(props)
    }

    confirm_and_delete(rec_id, e){
        if (confirm('confirm the deletion of ' + this.props.rec.symbol + ' stock record !')){
            window.location.replace('/admin/customers/shares/delete_active/' + rec_id );
        }
    }
    
    render() {
        return (
            <tr>
                <th>{this.props.rec.symbol}</th>
                <th>{this.props.rec.amount}</th>
                <th>{this.props.rec.purchase_date}</th>
                <th>{this.props.rec.purchase_price}</th>
                <th>{this.props.rec.current_price}</th>
                <th className={((this.props.rec.day_gain > 0) ? "green" : "red") + " price_cell"}>{this.props.rec.day_gain + "%"}</th>                
                <th className={((this.props.rec.profit_per_share > 0) ? "green" : "red") + " price_cell"}>{parseFloat(this.props.rec.profit_per_share).toFixed(2)}</th>
                <th className={((this.props.rec.profit > 0) ? "green" : "red") + " price_cell"}>{parseFloat(this.props.rec.profit).toFixed(2)}</th>
                <th><a className="table_btn" href={("/admin/customers/shares/sell_active_stocks/" + this.props.rec.rec_id + "?current_price=" + this.props.rec.current_price)}>Sell</a></th>
                <th><a className="table_btn" onClick={(e) => this.confirm_and_delete(this.props.rec.rec_id, e)}>Del</a></th>
            </tr>
        )
    }
}

class Table_Body extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            got_data: false
        };
        this.get_data();
        this.sorted_by = "sym"
        this.ascending_sort = true
    }

    sort_by_sym() {
        if( !this.state.got_data ){return 0;}
        
        if (this.sorted_by === "sym"){
            this.ascending_sort = !this.ascending_sort
        } else {
            this.ascending_sort = true;
        }

        var sort_order = (this.ascending_sort) ? 1 : -1 ;

        this.setState({
            got_data: true,
            data: this.state.data.sort(function (a, b) {
              var x = a.symbol.toLowerCase();
              var y = b.symbol.toLowerCase();
              if (x < y) {return -1*sort_order;}
              if (x > y) {return 1*sort_order;}
              return 0;
            })
          });

        this.sorted_by = "sym";
    }

    sort_by_prft() {
        if( !this.state.got_data ){return 0;}
        
        if (this.sorted_by === "prft"){
            this.ascending_sort = !this.ascending_sort
        } else {
            this.ascending_sort = true;
        }

        var sort_order = (this.ascending_sort) ? 1 : -1 ;

        this.setState({
          got_data: true,
          data: this.state.data.sort(function (a, b) {
            return (a.profit - b.profit) * sort_order;
          })
        });

        this.sorted_by = "prft";
    }


    get_data() {
        // get user_id from span
        var user_id = document.getElementById("user_id").innerText
        fetch('/admin/customers/shares/get_active_stocks_data/'+user_id)
        .then(res => res.json())
        .then((data) => {
            this.setState({got_data: true, data: data.active_stocks});
            set_sums(data);
            this.sort_by_sym();
        })
        .catch(console.log);
    }
    
    render() {

        if (this.state.got_data){
            return (
                <tbody>
                    { this.state.data.map( function(rec){
                        return (<Table_Row key={rec.rec_id} rec={rec}/>)
                    } ) }
                </tbody>
            )
        } else {
            return (
                <tbody>
                    <tr>
                        <th className="small_cell"></th>
                        <th className="small_cell"></th>
                        <th className="period_cell loading">Loading ...</th>
                        <th className="small_cell"></th>
                        <th className="small_cell"></th>
                        <th className="price_cell"></th>
                        <th className="small_cell"></th>
                    </tr>
                </tbody>
            )
        }
        
    }
}

class Table_Foot extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {

        return (
            <tfoot>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>Total </th>
                    <th id="active_profit_sum"></th>
                </tr>
            </tfoot> )
        
    }
}

class Table extends React.Component {
    constructor(props) {
        super(props)
        this.bodyRef = React.createRef();
    }
    
    render() {

        var body = (<Table_Body ref={this.bodyRef}/>);

        return (
            <table>
                <thead>
                    <tr>
                        <th className="clickable" onClick={()=> this.bodyRef.current.sort_by_sym()}>Sym</th>
                        <th>Amount</th>
                        <th>Purchased at</th>
                        <th>Cost/share</th>
                        <th>Current value/share</th>
                        <th>Day gain</th>
                        <th>Profit/share</th>
                        <th className="clickable" onClick={()=> this.bodyRef.current.sort_by_prft()}>Profit</th>
                    </tr>
                </thead>
                {body}
                <Table_Foot />
            </table>
        )
    }
}

ReactDOM.render(<Table />, document.getElementById("active_stocks_div"))
