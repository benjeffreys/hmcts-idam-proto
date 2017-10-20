/**
 * @param serviceId     identifier of the service
 * @param selectedRoles list of selected roles id
 * @param basePath      base URL path
 * @param callback      function to call on success
 */
function requestUpdateRoles(serviceId, selectedRoles, basePath, callback) {
    disableControls();
    showLoading();
    var request = {};
    if (isNotBlank(serviceId)){
        request.service = serviceId;
    }
    if (selectedRoles.length > 0) {
        request.selectedRoles = selectedRoles;
    }
    $.ajax({
        type: "POST",
        url: basePath + "/loadRoles",
        data: request,
        contentType: "application/x-www-form-urlencoded",
        dataType: "JSON",
        success: function (result) {
            callback(result);
            hideLoading();
            enableControls();
        },
        error: function () {
            console.log("Unable to retrieve roles");
        }
    });
}

/**
 * @param parent           the Select element
 * @param items            a list of item objects {name, value}
 * @param noSelectionLabel label for the empty selection
 */
function buildDropDown(parent, items, noSelectionLabel) {

    parent.options.length = 0;
    parent.options[parent.options.length] = new Option(noSelectionLabel, "");
    for (index in items) {
        var item = items[index];
        parent.options[parent.options.length] = new Option(item.name, item.value);
    }
}

/**
 * @param parent   parent UL element
 * @param items    a list of items in the format {id, description}
 * @param listId   list's id prefix
 * @param actions  list of actions for the items in the format {String:name, String:function}
 */
function buildListItems(parent, items, listId, actions) {

    parent.innerHTML = '';
    var innerHtml = '';
    items.forEach(function (item) {
        innerHtml += '<li id="' + listId + '-' + item.id + '">' + item.name;
        actions.forEach(function (action) {
            innerHtml += ' <a href="#" onclick="' + action.function + '(\'' + item.id + '\');">' + action.name + '</a>';
        });
        innerHtml += '</li>';

        parent.innerHTML = innerHtml;
    });
}

function disableControls() {
    $(":input").prop("disabled", true);
    $(":button").prop("disabled", true);
}

function enableControls() {
    $(":input").prop("disabled", false);
    $(":button").prop("disabled", false);
}

function showLoading() {
    $('#newAssignableRole').addClass("waiting");
}

function hideLoading() {
    $('#newAssignableRole').removeClass("waiting");
}

// Utility methods //
function isNotBlank(value) {
    return (value !== null && value !== "" && value !== undefined);
}

function isBlank(value) {
    return (value === null || value === "" || value === undefined);
}

function remove(collection, item) {
    var index = collection.indexOf(item);
    if (index > -1) {
        collection.splice(index, 1);
    }
}

function contains(collection, item) {
    return collection.indexOf(item) > -1;
}
