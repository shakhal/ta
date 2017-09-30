var formatDate = function(dateStr) {
    var date = new Date(dateStr);
    var month = date.toLocaleString('en-us', { month: "short" });

    return date.getDate() + " " +
        month + " " +
        date.toTimeString().slice(0,8)

}

exports.formatDate = formatDate;