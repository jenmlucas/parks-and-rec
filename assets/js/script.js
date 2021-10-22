var campgrounds = function () {
    var api = "https://uofa21cors.herokuapp.com/https://developer.nps.gov/api/v1/campgrounds&api_key=JRcflOdWAhAgNepvGlhUrfps66tzHWP9JlBVLBPo" 

    fetch(api)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
}

campgrounds();

