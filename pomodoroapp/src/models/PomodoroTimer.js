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
            if (this.liveSeconds === 0) {
                this.liveMinutes -= 1;
                this.liveSeconds = 59;
            } else {
                this.liveSeconds -= 1;
            }

            return {
                minutes: this.liveMinutes,
                seconds: this.liveSeconds,
            };
        } else {
            return { minutes: 0, seconds: 0 };
        }
    }

    ChangeStateToLongBreak() {}

    ChangeStateToShortBreak() {}

    ChangeStateToPomodoroTimer() {}
}
