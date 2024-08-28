interface VideoSnippet {
    publishedAt: string;
    title: string;
    description: string;
    thumbnails: {
        default: {
            url: string;
            width: number;
            height: number;
        };
        medium: {
            url: string;
            width: number;
            height: number;
        };
        high: {
            url: string;
            width: number;
            height: number;
        };
    };
    channelTitle: string;
}

interface VideoStatistics {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
}

export interface Video {
    id: string;
    snippet: VideoSnippet;
    statistics: VideoStatistics;
}
