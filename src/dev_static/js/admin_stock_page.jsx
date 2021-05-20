import React from 'react';
import ReactDOM, { render } from 'react-dom';
import ProfitChart from './components/prft_chart';
import Own_Stock_Card from './components/stock_page_data_card';
import Pre_White from './components/stock_page_pre_white'

function get_data(event) {

    let symbol = document.getElementById("symbol").innerText;

    var user_id = document.getElementById("user_id").innerText;

    fetch('/admin/customers/' + user_id + '/shares/' + symbol + '/active_data')
        .then(res => res.json())
        .then((data) => {
            render_data(data);
        })
        .catch(console.log);
}

// export event listeners
window.get_data = get_data;

// render page after recieving data
function render_data(data) {

    // ReactDOM.render(
    //     <ProfitChart data={data.price_chart} />,
    //     document.getElementById('chart')
    // );

    ReactDOM.render(
        <Pre_White active_share={data.active_share} />,
        document.getElementById('pre_white_data')
    );

    ReactDOM.render(
        <Own_Stock_Card active_share={data.active_share} />,
        document.getElementById('data_card')
    );
    


}

if (document.readyState !== 'loading') {
    // document is already ready, just execute get_data
    get_data();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        //document was not ready, execute get_data on DOMContentLoaded event
        get_data();
    });
}