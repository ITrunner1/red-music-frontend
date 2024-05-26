import { FC } from "react";

const SongDuration: FC<{ duration: number; isBottom?: boolean }> = ({
    duration,
    isBottom
}) => {
    return (
        <time className={isBottom ? '' : ''}></time>
    )
}

export default SongDuration