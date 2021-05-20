import React from 'react';
import ReactDOM, { render } from 'react-dom';
import ProfitChart from './components/prft_chart';
import Personal_card from './components/personal_summary_card';
import Pre_chart from './components/pre_chart_div';
import Investments_Cards from './components/investments_cards_hflex_admin';
import Notifications from './components/notifications'
import Sort_Toolbar from './components/sort_container'

function get_data(event) {

  var user_id = document.getElementById("user_id").innerText;

  fetch('/admin/users/' + user_id + '/notifications/get')
    .then(res => res.json())
    .then((data) => {
        render_notifications(data);
    })
    .catch(console.log);
 
  fetch('/admin/customers/shares/get_active_stocks_data/' + user_id)
    .then(res => res.json())
    .then((data) => {
        render_data(data);
    })
    .catch(console.log);
}

function openMenu() {
  document.getElementById("SideMenu").style.width = "100%";
  return false;
}

function closeMenu() {
  document.getElementById("SideMenu").style.width = "0";
  return false;
}

function openNots() {
  document.getElementById("Notification_View").style.width = "100%";
  return false;
}

function closeNots() {
  document.getElementById("Notification_View").style.width = "0";
  return false;
}


// export event listeners
window.get_data = get_data;
window.openMenu = openMenu;
window.closeMenu = closeMenu;
window.openNots = openNots;
window.closeNots = closeNots;

var cards = null;

// render page after recieving data
function render_data(data){

  var user_id = document.getElementById("user_id").innerText;

  ReactDOM.render(
    <ProfitChart data={data.prft_chart}/>,
    document.getElementById('chart')
  );  

  cards = ReactDOM.render(
    <Investments_Cards data={data} user_id={user_id}/>,
    document.getElementById('investments_cards_container')
  );

  ReactDOM.render(
    <Personal_card sums={data.sums} />,
    document.getElementById('personal_holdings_container')
  );

  ReactDOM.render(
    <Pre_chart sums={data.sums} />,
    document.getElementById('pre_chart_holdings_container')
  );

  ReactDOM.render(
    <Sort_Toolbar cards={cards}/>,
    document.getElementById('sort_cont')
  );
  
  cards.sort_by_holdings();
  
}

function render_notifications(data){

  ReactDOM.render(
    <Notifications notes={data}/>,
    document.getElementById('notifications')
  );

}

if( document.readyState !== 'loading' ) {
    // document is already ready, just execute get_data
    get_data();
} else {
    document.addEventListener('DOMContentLoaded', function () {
          //document was not ready, execute get_data on DOMContentLoaded event
          get_data();
    });
}