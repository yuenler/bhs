export default function formatTime() {
    var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();
		var hh = today.getHours();
		var min = today.getMinutes();
		var ampm = "AM";
		if (hh > 12){
			hh -= 12;
			ampm = "PM";
		}
		if (min < 10){
			min = "0" + min
		}

		today = mm + '/' + dd + '/' + yyyy + " " + hh + ":" + min + " " + ampm;
        return today;
}