import { months } from "src/constants"

export const formateDate = ({ date }: { date: string }) => {
    const newDate = new Date(date)

    // @ts-ignore
    return `${newDate.getDate()}-${months[newDate.getMonth()]}`
}
