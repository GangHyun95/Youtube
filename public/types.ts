interface Thumbnail {
    url: string;
    width: number;
    height: number;
}

interface VideoSnippet {
    publishedAt: string;
    title: string;
    description: string;
    channelId: string;
    thumbnails: {
        default: Thumbnail;
        medium: Thumbnail;
        high: Thumbnail;
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
    channelThumbnail: string;
    snippet: VideoSnippet;
    statistics: VideoStatistics;
}