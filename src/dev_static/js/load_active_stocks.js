function update_and_color_sum(el_id, sign, value, green = "green") {
  var float_val = parseFloat(value);
  var color_class = float_val > 0 ? green : "red";
  var element = document.getElementById(el_id);
  element.innerText = float_val + sign;
  element.classList.add(color_class);
}

function update_and_color_currevt_deps_value(invested, prft_prcntg, prft) {
  var float_invested = parseFloat(invested);
  var float_prft_prcntg = parseFloat(prft_prcntg);
  var float_prft = parseFloat(prft);
  var color_class = float_prft_prcntg > 0 ? "green" : "red";
  var total_active_deposites_element = document.getElementById("total_active_deposites");
  var total_active_deposites_prcntg_element = document.getElementById("total_active_deposites_prcntg");
  var total_active_deposites_prcntg = (100 + float_prft_prcntg).toFixed(2);
  var total_active_deposites = (float_invested + float_prft).toFixed(2);
  total_active_deposites_element.innerText = total_active_deposites + '$';
  total_active_deposites_prcntg_element.innerText = total_active_deposites_prcntg + '%';
  total_active_deposites_element.classList.add(color_class);
  total_active_deposites_prcntg_element.classList.add(color_class);
}

function set_sums(data) {
  update_and_color_sum("active_profit_sum", "", data.sums.personal_active_profits, "darkgreen");
  update_and_color_sum("user_prfts", "$", data.sums.personal_active_profits);
  update_and_color_sum("total_prfts", "$", data.sums.total_profits);
  update_and_color_sum("total_active_prfts", "$", data.sums.total_active_profits);
  update_and_color_sum("comp_prfts", "$", data.sums.company_active_profits); // Percentages

  update_and_color_sum("user_prfts_prcntg", "%", data.sums.personal_active_profits_prcntg);
  update_and_color_sum("total_prfts_prcntg", "%", data.sums.total_profits_prcntg);
  update_and_color_sum("total_active_prfts_prcntg", "%", data.sums.total_active_profits_prcntg);
  update_and_color_sum("comp_prfts_prcntg", "%", data.sums.company_active_profits_prcntg); // Sum

  update_and_color_currevt_deps_value(data.sums.total_currently_invested, data.sums.total_active_profits_prcntg, data.sums.total_active_profits);

  document.getElementById("oldest_date").innerText = "Note that this data was obtained at " + data.oldest_cache_time;
}

class Table_Row extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      className: "small_cell"
    }, this.props.rec.symbol), /*#__PURE__*/React.createElement("th", {
      className: "small_cell"
    }, this.props.rec.amount), /*#__PURE__*/React.createElement("th", {
      className: "date_cell"
    }, this.props.rec.purchase_date), /*#__PURE__*/React.createElement("th", {
      className: "price_cell"
    }, this.props.rec.purchase_price), /*#__PURE__*/React.createElement("th", {
      className: "price_cell"
    }, this.props.rec.current_price), /*#__PURE__*/React.createElement("th", {
      className: (this.props.rec.profit > 0 ? "green" : "red") + " price_cell"
    }, parseFloat(this.props.rec.profit).toFixed(2)));
  }

}

class Table_Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      got_data: false
    };
    this.get_data();
    this.sorted_by = "sym";
    this.ascending_sort = true;
  }

  sort_by_sym() {
    if (!this.state.got_data) {
      return 0;
    }

    if (this.sorted_by === "sym") {
      this.ascending_sort = !this.ascending_sort;
    } else {
      this.ascending_sort = true;
    }

    var sort_order = this.ascending_sort ? 1 : -1;
    this.setState({
      got_data: true,
      data: this.state.data.sort(function (a, b) {
        var x = a.symbol.toLowerCase();
        var y = b.symbol.toLowerCase();

        if (x < y) {
          return -1 * sort_order;
        }

        if (x > y) {
          return 1 * sort_order;
        }

        return 0;
      })
    });
    this.sorted_by = "sym";
  }

  sort_by_prft() {
    if (!this.state.got_data) {
      return 0;
    }

    if (this.sorted_by === "prft") {
      this.ascending_sort = !this.ascending_sort;
    } else {
      this.ascending_sort = true;
    }

    var sort_order = this.ascending_sort ? 1 : -1;
    this.setState({
      got_data: true,
      data: this.state.data.sort(function (a, b) {
        return (a.profit - b.profit) * sort_order;
      })
    });
    this.sorted_by = "prft";
  }

  get_data() {
    fetch('/api/get_active_stocks_data/').then(res => res.json()).then(data => {
      this.setState({
        got_data: true,
        data: data.active_stocks
      });
      set_sums(data);
      this.sort_by_sym();
    }).catch(console.log);
  }

  render() {
    if (this.state.got_data) {
      return /*#__PURE__*/React.createElement("tbody", null, this.state.data.map(function (rec) {
        return /*#__PURE__*/React.createElement(Table_Row, {
          key: rec.rec_id,
          rec: rec
        });
      }));
    } else {
      return /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
        className: "small_cell"
      }), /*#__PURE__*/React.createElement("th", {
        className: "small_cell"
      }), /*#__PURE__*/React.createElement("th", {
        className: "loading period_cell"
      }, "Loading ..."), /*#__PURE__*/React.createElement("th", {
        className: "small_cell"
      }), /*#__PURE__*/React.createElement("th", {
        className: "price_cell"
      }), /*#__PURE__*/React.createElement("th", {
        className: "small_cell"
      })));
    }
  }

}

class Table_Foot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return /*#__PURE__*/React.createElement("tfoot", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null), /*#__PURE__*/React.createElement("th", null), /*#__PURE__*/React.createElement("th", null), /*#__PURE__*/React.createElement("th", null), /*#__PURE__*/React.createElement("th", null, "Total "), /*#__PURE__*/React.createElement("th", {
      id: "active_profit_sum"
    })));
  }

}

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.bodyRef = React.createRef();
  }

  render() {
    var body = /*#__PURE__*/React.createElement(Table_Body, {
      ref: this.bodyRef
    });
    return /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      className: "clickable",
      onClick: () => this.bodyRef.current.sort_by_sym()
    }, "Symbol"), /*#__PURE__*/React.createElement("th", null, "Amount"), /*#__PURE__*/React.createElement("th", null, "purchased at"), /*#__PURE__*/React.createElement("th", null, "cost"), /*#__PURE__*/React.createElement("th", null, "value now"), /*#__PURE__*/React.createElement("th", {
      className: "clickable",
      onClick: () => this.bodyRef.current.sort_by_prft()
    }, "Profit"))), body, /*#__PURE__*/React.createElement(Table_Foot, null));
  }

}

ReactDOM.render( /*#__PURE__*/React.createElement(Table, null), document.getElementById("active_stocks_div"));