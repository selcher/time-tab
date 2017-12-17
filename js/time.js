(function () {
    let date = new Date();

    document.getElementById('time-date').innerHTML = date.toLocaleDateString();

    document.getElementById('time-day').innerHTML = (
        [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ][date.getDay()]
    );

    const timeDiv = document.getElementById('time-time');
    const updateTime = () => {
        date = new Date();
        timeDiv.innerHTML = date.toLocaleTimeString();
    };

    setInterval(updateTime, 1000);
})();
