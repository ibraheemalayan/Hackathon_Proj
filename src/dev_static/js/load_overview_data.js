function update_and_color_sum(el_id, sign, value, color=true){

    var float_val = parseFloat(value);
    var color_class = ( float_val > 0 )? "green" : "red";
    var element = document.getElementById(el_id);

    element.innerText = float_val + sign;

    if (color){
        element.classList.add(color_class);
    }
    
}

function update_and_color_currevt_deps_value(invested, prft_prcntg, prft, user_id){

    var float_invested = parseFloat(invested);
    var float_prft_prcntg = parseFloat(prft_prcntg);
    var float_prft = parseFloat(prft);

    var color_class = ( float_prft_prcntg > 0 )? "green" : "red";

    var total_active_deposites_element = document.getElementById(user_id + "_total_active_deposites");
    var total_active_deposites_prcntg_element = document.getElementById(user_id + "_total_active_deposites_prcntg");

    var total_active_deposites_prcntg = (100 + float_prft_prcntg).toFixed(2);
    var total_active_deposites = (float_invested + float_prft).toFixed(2);

    total_active_deposites_element.innerText = total_active_deposites + '$'
    total_active_deposites_prcntg_element.innerText = total_active_deposites_prcntg + '%'

    // total_active_deposites_element.classList.add(color_class);
    total_active_deposites_prcntg_element.classList.add(color_class);
    
}

function fill_data(user_id, user_rec){

    console.log(user_id)
    console.log(user_rec)

    update_and_color_sum((user_id + "_user_prfts_prcntg"), "%", user_rec.personal_active_profits_prcntg);
    update_and_color_sum((user_id + "_user_prfts"), "$", user_rec.personal_active_profits, false);

    update_and_color_sum((user_id + "_comp_prfts_prcntg"), "%", user_rec.company_active_profits_prcntg);
    update_and_color_sum((user_id + "_comp_prfts"), "$", user_rec.company_active_profits, false);

    update_and_color_sum((user_id + "_total_active_deposites_prcntg"), "%", user_rec.total_active_profits_prcntg);
    update_and_color_sum((user_id + "_total_active_deposites"), "$", user_rec.total_active_profits, false);

    update_and_color_sum((user_id + "_total_deps"), "$", user_rec.total_currently_invested, false);

    update_and_color_currevt_deps_value(user_rec.total_currently_invested, user_rec.total_active_profits_prcntg, user_rec.total_active_profits, user_id)
    
}


fetch('/admin/customers/shares/get_active_overview_data/')
    .then(res => res.json())
    .then((data) => {
        Object.keys(data).forEach(user_id => fill_data(user_id, data[user_id]));
    })
    .catch(console.log);