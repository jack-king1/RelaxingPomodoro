export default class PomodoroTimer {
    constructor(pomodoroTime, shortBreak, longBreak, isPaused, dateObj) {
        //states
        this.pomodoroTime = pomodoroTime;
        this.shortBreak = shortBreak;
        this.longBreak = longBreak;
        this.activeStateTime = 25;

        //live
        this.liveMinutes = pomodoroTime;
        this.liveSeconds = 0;
        this.startTimerDateTime = null;

        //pause
        this.isPaused = isPaused;
        this.pauseTime = 0; //the time the timer was paused
        this.totalPauseTime = 0; //the total time paused e.g. user pauses, unpauses, then pauses again, gets the total pause duration to offset timer.
    }

    //This function is to set the date time value to keep track of the difference between start and current time
    InitTimer() {
        this.startTimerDateTime = Date.now();
        this.pauseTime = Date.now();
        console.log("START TIME: ", this.startTimerDateTime);
    }

    CountDownTimerDateTime() {
        // Calculate the elapsed time in seconds
        console.log("is Paused?", this.isPaused);
        if (!this.isPaused) {
            let elapsedTime = Math.floor(
                (Date.now() - this.startTimerDateTime) / 1000 -
                    this.totalPauseTime
            );

            console.log("Total Pause Duration:", this.totalPauseTime);
            // Calculate remaining time in seconds
            let remainingTime = this.activeStateTime * 60 - elapsedTime; // 25 minutes in seconds

            // Decrement remaining time by 1 second
            remainingTime -= 1;

            // Convert remaining time to minutes and seconds
            let minutes = Math.floor(remainingTime / 60);
            let seconds = remainingTime % 60;

            //Assign to timer values.
            this.liveMinutes = minutes;
            this.liveSeconds = seconds;
        }
        return { minutes: this.liveMinutes, seconds: this.liveSeconds };
    }

    ChangeStateToLongBreak() {
        this.liveMinutes = this.longBreak;
        this.liveSeconds = 0;
        this.activeStateTime = this.longBreak;
        return { minutes: this.liveMinutes, seconds: this.liveSeconds };
    }

    ChangeStateToShortBreak() {
        this.liveMinutes = this.shortBreak;
        this.liveSeconds = 0;
        this.activeStateTime = this.shortBreak;
        return { minutes: this.liveMinutes, seconds: this.liveSeconds };
    }

    ChangeStateToPomodoroTimer() {
        this.liveMinutes = this.pomodoroTime;
        this.liveSeconds = 0;
        this.activeStateTime = this.pomodoroTimeBreak;
        return { minutes: this.liveMinutes, seconds: this.liveSeconds };
    }

    PauseTimer() {
        this.isPaused = !this.isPaused;
        //pausing
        if (this.isPaused) {
            this.pauseTime = Date.now();
        } else {
            let elapsedTime = Math.floor((Date.now() - this.pauseTime) / 1000);
            this.totalPauseTime += elapsedTime;
        }
    }

    StopTimer() {
        this.isPaused = true;
        this.pauseTime = 0;
    }

    IsFinnished() {
        console.log(this.liveMinutes, this.liveSeconds);
        return this.liveMinutes == 0 && this.liveSeconds == 0;
    }
}
