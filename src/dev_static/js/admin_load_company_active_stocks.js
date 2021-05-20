function update_and_color_sum(el_id, sign, value, green = "green") {
  var float_val = parseFloat(value);
  var color_class = float_val > 0 ? green : "red";
  var element = document.getElementById(el_id);
  element.innerText = float_val + sign;
  element.classList.add(color_class);
}

function set_sums(data) {
  update_and_color_sum("active_profit_sum", "", data.sums.active_profits, "darkgreen");
  update_and_color_sum("total_active_prfts", "$", data.sums.active_profits);
  update_and_color_sum("total_prfts", "$", data.sums.total_profits); // Percentages

  update_and_color_sum("total_prfts_prcntg", "%", data.sums.total_profits_prcntg);
  update_and_color_sum("total_active_prfts_prcntg_of_invested", "%", data.sums.active_profits_prcntg_of_invested);
  update_and_color_sum("total_active_prfts_prcntg_of_deps", "%", data.sums.active_profits_prcntg_of_deps);
  document.getElementById("oldest_date").innerText = "Note that this data was obtained at " + data.oldest_cache_time;
}

class Table_Row extends React.Component {
  constructor(props) {
    super(props);
  }

  confirm_and_delete(rec_id, e) {
    if (confirm('confirm the deletion of ' + this.props.rec.symbol + ' stock record !')) {
      window.location.replace('/admin/company/shares/delete_active/' + rec_id);
    }
  }

  render() {
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, this.props.rec.symbol), /*#__PURE__*/React.createElement("th", null, this.props.rec.amount), /*#__PURE__*/React.createElement("th", null, this.props.rec.purchase_date), /*#__PURE__*/React.createElement("th", null, this.props.rec.purchase_price), /*#__PURE__*/React.createElement("th", null, this.props.rec.current_price), /*#__PURE__*/React.createElement("th", {
      className: (this.props.rec.day_gain > 0 ? "green" : "red") + " price_cell"
    }, this.props.rec.day_gain + "%"), /*#__PURE__*/React.createElement("th", {
      className: (this.props.rec.profit_per_share > 0 ? "green" : "red") + " price_cell"
    }, this.props.rec.profit_per_share), /*#__PURE__*/React.createElement("th", {
      className: (this.props.rec.profit > 0 ? "green" : "red") + " price_cell"
    }, this.props.rec.profit), /*#__PURE__*/React.createElement("th", null, /*#__PURE__*/React.createElement("a", {
      className: "table_btn",
      href: "/admin/company/shares/sell_active_stocks/" + this.props.rec.rec_id + "?current_price=" + this.props.rec.current_price
    }, "Sell")), /*#__PURE__*/React.createElement("th", null, /*#__PURE__*/React.createElement("a", {
      className: "table_btn",
      onClick: e => this.confirm_and_delete(this.props.rec.rec_id, e)
    }, "Del")));
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
    fetch('/admin/company/shares/get_active_stocks_data/').then(res => res.json()).then(data => {
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
        className: "period_cell loading"
      }, "Loading ..."), /*#__PURE__*/React.createElement("th", {
        className: "small_cell"
      }), /*#__PURE__*/React.createElement("th", {
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
    return /*#__PURE__*/React.createElement("tfoot", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null), /*#__PURE__*/React.createElement("th", null), /*#__PURE__*/React.createElement("th", null), /*#__PURE__*/React.createElement("th", null), /*#__PURE__*/React.createElement("th", null), /*#__PURE__*/React.createElement("th", null), /*#__PURE__*/React.createElement("th", null, "Total "), /*#__PURE__*/React.createElement("th", {
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
    }, "Sym"), /*#__PURE__*/React.createElement("th", null, "Amount"), /*#__PURE__*/React.createElement("th", null, "Purchased at"), /*#__PURE__*/React.createElement("th", null, "Cost/share"), /*#__PURE__*/React.createElement("th", null, "Current value/share"), /*#__PURE__*/React.createElement("th", null, "Day gain"), /*#__PURE__*/React.createElement("th", null, "Profit/share"), /*#__PURE__*/React.createElement("th", {
      className: "clickable",
      onClick: () => this.bodyRef.current.sort_by_prft()
    }, "Profit"))), body, /*#__PURE__*/React.createElement(Table_Foot, null));
  }

}

ReactDOM.render( /*#__PURE__*/React.createElement(Table, null), document.getElementById("active_stocks_div"));