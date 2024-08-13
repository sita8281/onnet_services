function addRequestsToPanel() {
    // добавить действия к кнопкам в панели-меню
    
}

let requestRunning = false;

function routeRequest(url, selectedId) {
    /* навесить маршрут запроса на кнопку или ссылку,
    нужно для панели-меню */

    if (requestRunning) {
        return;
    }

    // убрать выделение со всех кнопок
    let buttonsList =  $('.panel').children();
    $.each(buttonsList, function (indexInArray, valueOfElement) { 
        try {
            $('#' + valueOfElement.id).removeClass('selected__a');
        } catch {
            
        }
        

    });


    // выделить нажатую кнопку
    if (selectedId) {
        $('#' + selectedId).addClass('selected__a');
    }

    urlHandler(url)
        
}


function urlHandler(url) {
    /* Обработчик URL к API ендпоинтам, нужен для сопоставления ссылок с 
    HTML-отображением информации, приходящий от API */

    requestRunning = true;
    loadingView();
    $('.panel').removeAttr('style'); //скрыть бокобую панель

    switch (url) {
        case '/user':
            ajaxRequest(url,
                success_callback = (data) => {
                    userInfoView(data);
                    dedicIpState = data.dedicaded_ip
                },
                error_callback = () => {
                    errorView('');
                }
            )
            break;
        case '/operations':
            ajaxRequest(url,
                success_callback = (data) => {
                    operationsView(data);
                },
                error_callback = () => {
                    errorView('');
                }
            )
            break;
        case '/tarif':
            ajaxRequest(url,
                success_callback = (data) => {
                    tarifView(data);
                },
                error_callback = () => {
                    errorView('');
                }
            )
            break;
        case '/phone':
            ajaxRequest(url,
                success_callback = (data) => {
                    phoneView(data);
                },
                error_callback = () => {
                    errorView('');
                }
            )
            break;
        case '/payment':
            ajaxRequest(url,
                success_callback = (data) => {
                    paymentView(data);
                },
                error_callback = () => {
                    errorView('');
                }
            )
            break;
        case '/control':
            controlView();
            requestRunning = false;
            break;

    }
}


function ajaxRequest(url, success_callback, error_callback) {
    $.ajax({
        method: 'get',
        timeout: 5000,
        type: "method",
        url: '/api' + url,
        data: "data",
        dataType: "json",
        success: function (response) {
            success_callback(response);
            requestRunning = false;
        },
        error: function(response) {
            error_callback()
            requestRunning = false;
        }
    });
}



