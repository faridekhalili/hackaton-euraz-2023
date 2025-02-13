


export class DateTime {
    constructor(
        public year: number,
        public month: number = 0,
        public day: number = 0,
        public hour: number = 0,
        public minute: number = 0,
        public second: number = 0,
    ){ }


    public static fromDate(date: Date): DateTime {
        return new DateTime(
            date.getFullYear(), date.getMonth()+1, date.getDate(),
            date.getHours(), date.getMinutes(), date.getSeconds()
        )
    }

    public static now(): DateTime {
        return DateTime.fromDate(new Date())
    }
    
    // from "01-01-2022" in format MM-dd-yyyy
    public static from_dd_MM_yyyy(date?: string){
        const match = date?.match(dd_MM_yyyy_pattern)
        if (match) return new DateTime(+match.groups!.year!, +match.groups!.month!, +match.groups!.day!)
    }


    // from "2022-01-01T00:00" in format yyyy-MM-ddThh:mm
    public static from_yyyy_MM_dd_hh_mm(date?: string){
        const match = date?.match(yyyy_MM_dd_hh_mm_pattern)
        if (match) return new DateTime(
            +match.groups!.year!, +match.groups!.month!, +match.groups!.day!,
            +match.groups!.hour!, +match.groups!.minute!
        )
    }
    
    // from "2022-01-01" in format yyyy-MM-dd
    public static from_yyyy_MM_dd(date?: string){
        const match = date?.match(yyyy_MM_dd_pattern)
        if (match) return new DateTime(
            +match.groups!.year!, +match.groups!.month!, +match.groups!.day!,
        )
    }


    to_yyyy_MM_dd_HH_mm_ss(){
        return `${(this.year+'').padStart(4,'0')}-${(this.month+'').padStart(2,'0')}-${(this.day+'').padStart(2,'0')}T`+
            `${(this.hour+'').padStart(2,'0')}:${(this.minute+'').padStart(2,'0')}:${(this.second+'').padStart(2,'0')}`
    }

    to_yyyy_MM_dd_HH_mm(){
        return `${(this.year+'').padStart(4,'0')}-${(this.month+'').padStart(2,'0')}-${(this.day+'').padStart(2,'0')}T`+
            `${(this.hour+'').padStart(2,'0')}:${(this.minute+'').padStart(2,'0')}`
    }
    
    // to 01-01-2023
    to_dd_MM_yyyy(){
        return `${(this.day+'').padStart(2,'0')}-${(this.month+'').padStart(2,'0')}-${(this.year+'').padStart(4,'0')}`
    }

    // to 01-01-23
    to_dd_MM_yy(divider = '-'){
        return `${(this.day+'').padStart(2,'0')}${divider}`+
          `${(this.month+'').padStart(2,'0')}${divider}`+
          `${(this.year%100+'').padStart(2,'0')}`
    }

    // to JavaScript Date object
    toDate(){
        return new Date(this.year, this.month-1, this.day, this.hour, this.minute, this.second)
    }

    getAge(){
        const now = DateTime.now()
        let age = now.year - this.year
        if (now.month<this.month || (now.month===this.month && now.day<this.day)) age--
        return age
    }
    getDays(){
        const ms = +new Date() - +this.toDate()
        const days = ms/1000/60/60/24
        return Math.floor(days)
    }

    normalize(){
        const d = this.toDate()
        this.year = d.getFullYear()
        this.month = d.getMonth()+1
        this.day = d.getDate()
        this.hour = d.getHours()
        this.minute = d.getMinutes()
        this.second = d.getSeconds()
        return this
    }
}


// месяц, день, час, минута, секунда могут быть в одно-или-двухсимвольном формате
// разделителем является не цифра в любом количестве
const dd_MM_yyyy_pattern = /(?<day>\d{1,2})\D+(?<month>\d{1,2})\D+(?<year>\d{4})/
const yyyy_MM_dd_hh_mm_pattern = /(?<year>\d{4})\D+(?<month>\d{1,2})\D+(?<day>\d{1,2})\D+(?<hour>\d{1,2})\D+(?<minute>\d{1,2})/
const yyyy_MM_dd_pattern = /(?<year>\d{4})\D+(?<month>\d{1,2})\D+(?<day>\d{1,2})/

