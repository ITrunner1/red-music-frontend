'use client'

import { FC } from "react"
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

interface ISongStatistics {
    listens: number,
    createdAt: string
}

dayjs.extend(relativeTime)

const SongStatistics: FC<ISongStatistics> = ({ listens, createdAt }) => {
    const date = dayjs(new Date(createdAt))
    const dateString: string = date.toString();

    return (
        <div className="">
            <div>
                {formatNumberToK(listens)} прослушиваний
            </div>
            <>
                <div className="mx2"></div>
                <div className="">
                    {dayjs(new Date(createdAt)).fromNow()}
                </div>
            </>
        </div>
    )
}

export default SongStatistics