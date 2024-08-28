export function formatViewCount(viewCount: number): string {
    if (viewCount >= 100000000) {
        return `${(viewCount / 100000000).toFixed(1)}억회`;
    } else if (viewCount >= 10000) {
        return `${(viewCount / 10000).toFixed(0)}만회`;
    } else if (viewCount >= 1000) {
        return `${(viewCount / 1000).toFixed(1)}천회`;
    } else {
        return `${viewCount}회`;
    }
}

export function formatDateTime(dateString: string): string {
    const now = new Date();
    const targetDate = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);

    const secondsInMinute = 60;
    const secondsInHour = 60 * secondsInMinute;
    const secondsInDay = 24 * secondsInHour;
    const secondsInWeek = 7 * secondsInDay;
    const secondsInMonth = 30 * secondsInDay;
    const secondsInYear = 365 * secondsInDay;

    if (diffInSeconds < secondsInHour) {
        const minutes = Math.floor(diffInSeconds / secondsInMinute);
        return `${minutes}분 전`;
    } else if (diffInSeconds < secondsInDay) {
        const hours = Math.floor(diffInSeconds / secondsInHour);
        return `${hours}시간 전`;
    } else if (diffInSeconds < secondsInWeek) {
        const days = Math.floor(diffInSeconds / secondsInDay);
        return `${days}일 전`;
    } else if (diffInSeconds < 14 * secondsInDay) {
        const weeks = Math.floor(diffInSeconds / secondsInWeek);
        return `${weeks}주 전`;
    } else if (diffInSeconds < secondsInMonth) {
        const days = Math.floor(diffInSeconds / secondsInDay);
        return `${days}일 전`;
    } else if (diffInSeconds < secondsInYear) {
        const months = Math.floor(diffInSeconds / secondsInMonth);
        return `${months}개월 전`;
    } else {
        const years = Math.floor(diffInSeconds / secondsInYear);
        return `${years}년 전`;
    }
}
