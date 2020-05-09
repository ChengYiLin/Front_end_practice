let whole_data = JSON.parse(localStorage.getItem('stored_data')) || [];
let submit_btn = document.querySelector('.main_btn');
let restart_btn = document.querySelector('.restart_btn');
let record_list = document.querySelector('.record_list');
let clean_btn = document.getElementById('clear');

function check_BMI(BMI) {
    if (BMI < 18.5) {
        return { 'state': 0, 'text': "過輕" };
    }
    else if (BMI >= 18.5 && BMI < 25) {
        return { 'state': 1, 'text': "正常" };
    }
    else if (BMI >= 25 && BMI < 30) {
        return { 'state': 2, 'text': "過重" };
    }
    else if (BMI >= 30 && BMI < 35) {
        return { 'state': 3, 'text': "輕度肥胖" };
    }
    else if (BMI >= 35 && BMI < 40) {
        return { 'state': 3, 'text': "中度肥胖" };
    }
    else {
        return { 'state': 4, 'text': "重度肥胖" };
    }
}

function Get_today() {
    let today = new Date();
    return today.toISOString().substring(0, 10);
}

function build_li_content(data, i) {
    let status_html = '<li class="border_color_' + check_BMI(data.BMI).state + '"><div class="main_item status"><span>' + check_BMI(data.BMI).text + '</span></div>';
    let BMI_html = '<div class="main_item data"><div class="BMI"><small>BMI</small><span>' + data.BMI + '</span></div>';
    let weight_html = '<div class="weight"><small>weight</small><span>' + data.Weight + 'kg</span></div>';
    let height_html = '<div class="height"><small>height</small><span>' + data.Height + 'cm</span></div></div>';
    let date_html = '<div class="main_item record_date"><small>' + Get_today() + '</small></div>';
    let delete_btn = '<div class="delete_btn"><a href="#" data-num="' + i + '">X</a></div></li>';

    return status_html + BMI_html + weight_html + height_html + date_html + delete_btn;
}

function update_data() {
    let new_data = JSON.parse(localStorage.getItem('stored_data'));
    if (new_data === null) { return };

    let return_whole_li = '';
    // New to Old
    for (let i = new_data.length - 1; i >= 0; i--) {
        return_whole_li += build_li_content(new_data[i], i);
    }
    record_list.innerHTML = return_whole_li;
}

function change_btn_style(BMI_value) {
    color = ['#31BAF9', '#86D73E', '#FF982D', '#FF6C02', '#FF1200'];
    // main btn style
    submit_btn.classList.add('active');
    submit_btn.style.color = color[check_BMI(BMI_value).state];
    submit_btn.style.borderColor = color[check_BMI(BMI_value).state];
    // main btn value
    submit_btn.querySelector('.result').textContent = BMI_value;
    submit_btn.querySelector('.result').style.fontSize = '32px';
    // restart btn
    restart_btn.style.opacity = 1;
    restart_btn.style.background = color[check_BMI(BMI_value).state];
    // small BMI
    submit_btn.querySelector('small').style.display = 'block';
    // btn state word
    document.querySelector('.btn-box .state').textContent = check_BMI(BMI_value).text;
    document.querySelector('.btn-box .state').style.color = color[check_BMI(BMI_value).state];
}

function main_btn_reset(e) {
    e.preventDefault();
    // main btn text
    submit_btn.style.color = 'black';
    submit_btn.querySelector('.result').textContent = '看結果';
    submit_btn.querySelector('.result').style.fontSize = '24px';
    submit_btn.classList.remove('active');
    document.querySelector('.btn-box .state').textContent = '';
    submit_btn.querySelector('small').style.display = 'none';
    restart_btn.style.opacity = 0;
}

// Main function

function store_value(e) {
    e.preventDefault();

    let input_height = document.getElementById('height');
    let input_weight = document.getElementById('weight');

    if (input_height.value === '' || input_weight.value === '') {
        alert("身高 及 體重 都必須填入數值");
        return;
    }

    let data_to_store = {
        'BMI': (input_weight.value / Math.pow(input_height.value / 100, 2)).toFixed(2),
        'Weight': Math.round(input_weight.value),
        'Height': Math.round(input_height.value)
    }

    whole_data.push(data_to_store);
    localStorage.setItem('stored_data', JSON.stringify(whole_data));

    update_data();
    change_btn_style(data_to_store.BMI);
    input_height.value = '';
    input_weight.value = '';
}

function clean_history() {
    localStorage.setItem('stored_data', null);
    whole_data = [];
    record_list.innerHTML = "";
}

function delete_li(e) {
    e.preventDefault();
    if (e.target.tagName != 'A') { return };
    whole_data.splice(e.target.dataset.num, 1);
    localStorage.setItem('stored_data', JSON.stringify(whole_data));
    update_data();
}

update_data();
submit_btn.addEventListener('click', store_value);
restart_btn.addEventListener('click', main_btn_reset);
record_list.addEventListener('click', delete_li);
clean_btn.addEventListener('click', clean_history);