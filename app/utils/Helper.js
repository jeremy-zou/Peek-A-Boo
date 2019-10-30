export function toSeconds(datetime) {
    const times = datetime.split(":");
    var seconds;
    if (times.length == 1) {
      seconds = Number(times[0]);
    } else if (times.length == 2) {
      seconds = Number(times[0]) * 60 + Number(times[1]);
    } else if (times.length == 3) {
      seconds = Number(times[0]) * 3600 + Number(times[1]) * 60 + Number(times[2]);
    }
  
    return seconds;
}