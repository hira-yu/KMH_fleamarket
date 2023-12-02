document.querySelector("#javascript_chk").style.display = 'none';

if (typeof localStorage != 'undefined' && window.File) {
    localStorage.setItem('syschk', '1');
    if (localStorage.getItem('syschk') == '1') {
        localStorage.removeItem('syschk');
    } else {
        document.querySelector("#webapi_chk").style.display = 'flex';
    }
} else {    
    document.querySelector("#webapi_chk").style.display = 'flex';
}