export default class PomodoroTimer {
    constructor(pomodoroTime, shortBreak, longBreak, isPaused) {
        this.pomodoroTime = pomodoroTime;
        this.shortBreak = shortBreak;
        this.longBreak = longBreak;
        this.isPaused = isPaused;
        this.liveMinutes = pomodoroTime;
        this.liveSeconds = 0;
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
