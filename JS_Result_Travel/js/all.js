let Select_region = document.getElementById('region');
let hot_region = document.querySelector('.hot_region');
let travel_region = document.querySelector('.travel_region_title');
let travel_site = document.querySelector('.travel_sites');
let pagination = document.querySelector('.pagination');
let to_top_btn = document.querySelector('.scroll_top');

let region = [];
let whole_data = {};

get_remote_data(add_Select_region, add_travel_site, build_page_num);
Select_region.addEventListener('change', change_content, true);
pagination.addEventListener('click', change_page, true);
hot_region.addEventListener('click', hot_region_quick_link, true);
to_top_btn.addEventListener('click', scroll_to_top, true)

// Request Data
function get_remote_data(add_Select_region, add_travel_site, build_page_num) {
    let xhr = new XMLHttpRequest;
    xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true)
    xhr.send(null);
    xhr.onload = function () {
        let data = JSON.parse(xhr.responseText).result.records;
        for (let i = 0; i < data.length; i++) {
            // Add region
            if (!region.includes(data[i].Zone)) {
                region.push(data[i].Zone);
                whole_data[data[i].Zone] = [{ 'Name': data[i].Name, 'Picture': data[i].Picture1, 'Opentime': data[i].Opentime, 'Add': data[i].Add, 'Tel': data[i].Tel, 'Ticket': data[i].Ticketinfo }];
            }
            else {
                whole_data[data[i].Zone].push({ 'Name': data[i].Name, 'Picture': data[i].Picture1, 'Opentime': data[i].Opentime, 'Add': data[i].Add, 'Tel': data[i].Tel, 'Ticket': data[i].Ticketinfo });
            }
        }

        // Add Select option
        add_Select_region();
        // Rebuild content
        add_travel_site(region[0], whole_data[region[0]], 0);
        // Build page num
        build_page_num(whole_data[region[0]]);
    }
}

function add_Select_region() {
    let option_html = Select_region.innerHTML;
    for (let i = 0; i < region.length; i++) {
        option_html += '<option value="' + i + '">' + region[i] + '</option>'
    }
    Select_region.innerHTML = option_html;
}

// Select Change Content
function add_travel_site(travel_region_name, site_inform, start_num) {
    let end_num = (site_inform.length - start_num * 6 <= 6) ? (site_inform.length) : (start_num * 6 + 6);
    let inform_html = '';
    for (let i = start_num * 6; i < end_num; i++) {
        let Pic_html = '<div class="site_box"><div class="pic" style="background-image: url(' + site_inform[i].Picture + ')">';
        let Name_html = '<p class="Name h4 text-white">' + site_inform[i].Name + '</p>';
        let Site_html = '<p class="h5 text-white">' + travel_region_name + '</p></div>';
        let Opentime_html = '<div class="inform p-3"><div class="opentime">' + site_inform[i].Opentime + '</div>';
        let Name_inform_html = '<div class="add">' + site_inform[i].Name + '</div>';
        let Tel_html = '<div class="d-flex justify-content-between"><div class="tel">' + site_inform[i].Tel + '</div>';
        let Ticket_html = '<div class="ticket">' + site_inform[i].Ticket + '</div ></div ></div ></div >';

        inform_html += Pic_html + Name_html + Site_html + Opentime_html + Name_inform_html + Tel_html + Ticket_html;
    }
    travel_site.innerHTML = inform_html;
}

function change_content() {
    let travel_region_name = region[Select_region.selectedIndex - 1];

    // Change title Name
    travel_region.innerHTML = travel_region_name;
    // Change Content
    let site_inform = whole_data[travel_region_name];

    add_travel_site(travel_region_name, site_inform, 0);
    // build page num
    build_page_num(site_inform);
}

// Page
function build_page_num(site_inform) {
    let total_num = Math.ceil(site_inform.length / 6);
    let page_element = document.querySelector('.page_num');

    let page_item_html = '';
    for (let i = 0; i < total_num; i++) {
        page_item_html += '<a class="page-link ml-3" data-num=' + i + ' href="#">' + (i + 1) + '</a>';
    }
    page_element.innerHTML = page_item_html;
}

function change_page(e) {
    let travel_region_name = document.querySelector('.travel_region_title').textContent;

    e.preventDefault();
    add_travel_site(travel_region_name, whole_data[travel_region_name], e.target.dataset.num);
}

// Hot region
function hot_region_quick_link(e) {
    e.preventDefault();
    if (e.target.tagName != 'BUTTON') { return };

    // Change title Name
    travel_region.innerHTML = e.target.innerText;
    // Change Content
    let site_inform = whole_data[e.target.innerText];

    add_travel_site(e.target.innerText, site_inform, 0);
    // build page num
    build_page_num(site_inform);
}

// Scroll to top
function scroll_to_top(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}