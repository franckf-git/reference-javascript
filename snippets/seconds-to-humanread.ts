export function humanReadable(seconds: number): string {
    let minutes = 0
    let hours = 0
    let pad = (int: number) => {
        if (int.toString().length == 1) {
            return `0${int}`
        } else {
            return `${int}`
        }
    }
    let incSecMin = (incn: number) => {
        if (incn >= 60) {
            minutes = minutes + 1
            seconds = seconds - 60
            incSecMin(seconds)
        }
    }
    let incMinHou = (incn: number) => {
        if (incn >= 60) {
            hours = hours + 1
            minutes = minutes - 60
            incMinHou(minutes)
        }
    }
    incSecMin(seconds)
    incMinHou(minutes)
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}