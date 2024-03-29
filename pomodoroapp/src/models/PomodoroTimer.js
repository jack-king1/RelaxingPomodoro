export default class PomodoroTimer {
    constructor(pomodoroTime, shortBreak, longBreak, isPaused, dateObj) {
        this.pomodoroTime = pomodoroTime;
        this.shortBreak = shortBreak;
        this.longBreak = longBreak;
        this.isPaused = isPaused;
        this.liveMinutes = pomodoroTime;
        this.liveSeconds = 0;
        this.startTimerDateTime = null;
    }

    //This function is to set the date time value to keep track of the difference between start and current time
    InitTimer() {
        this.startTimerDateTime = Date.now();
        console.log("START TIME: ", this.startTimerDateTime);
    }

    CountDownTimerDateTime() {
        // Calculate the elapsed time in seconds
        let elapsedTime = Math.floor(
            (Date.now() - this.startTimerDateTime) / 1000
        );

        // Calculate remaining time in seconds
        let remainingTime = 25 * 60 - elapsedTime; // 25 minutes in seconds

        // Decrement remaining time by 1 second
        remainingTime -= 1;

        // Convert remaining time to minutes and seconds
        let minutes = Math.floor(remainingTime / 60);
        let seconds = remainingTime % 60;

        //Assign to timer values.
        this.liveMinutes = minutes;
        this.liveSeconds = seconds;

        return { minutes, seconds };
    }

    CountDownTimer() {
        if (this.liveMinutes > 0 || this.liveSeconds > 0) {
            if (!this.isPaused) {
                if (this.liveSeconds === 0) {
                    this.liveMinutes -= 1;
                    this.liveSeconds = 59;
                } else {
                    this.liveSeconds -= 1;
                }
            }

            return {
                minutes: this.liveMinutes,
                seconds: this.liveSeconds,
            };
        } else {
            return { minutes: 0, seconds: 0 };
        }
    }

    ChangeStateToLongBreak() {
        this.liveMinutes = this.longBreak;
        this.liveSeconds = 0;
        return { minutes: this.liveMinutes, seconds: this.liveSeconds };
    }

    ChangeStateToShortBreak() {
        this.liveMinutes = this.shortBreak;
        this.liveSeconds = 0;
        return { minutes: this.liveMinutes, seconds: this.liveSeconds };
    }

    ChangeStateToPomodoroTimer() {
        this.liveMinutes = this.pomodoroTime;
        this.liveSeconds = 0;
        return { minutes: this.liveMinutes, seconds: this.liveSeconds };
    }

    PauseTimer() {
        this.isPaused = !this.isPaused;
    }

    StopTimer() {
        this.isPaused = true;
    }

    IsFinnished() {
        console.log(this.liveMinutes, this.liveSeconds);
        return this.liveMinutes == 0 && this.liveSeconds == 0;
    }
}
