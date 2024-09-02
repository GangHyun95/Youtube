import axios from "axios";

const YoutubeApi = {
    httpClient: axios.create({
        baseURL: "https://www.googleapis.com/youtube/v3",
        params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    }),

    search(keyword: string | undefined, pageToken: string = "") {
        return keyword ? this.getVideosByKeyword(keyword, pageToken) : this.getPopularVideos(pageToken);
    },

    async getVideosByKeyword(keyword: string, pageToken: string) {
        const response = await this.httpClient.get("search", {
            params: {
                part: "snippet",
                maxResults: 20,
                q: keyword,
                pageToken: pageToken,
            },
        });

        const videoIds = response.data.items.map((item: any) => item.id.videoId).join(',');
        const channelIds = Array.from(new Set(response.data.items.map((item: any) => item.snippet.channelId)));

        const videosResponse = await this.httpClient.get("videos", {
            params: {
                part: "snippet,statistics",
                id: videoIds,
            },
        });

        const channelsResponse = await this.httpClient.get("channels", {
            params: {
                part: "snippet",
                id: channelIds.join(','),
            },
        });

        const channelThumbnails: { [key: string]: string } = {};

        channelsResponse.data.items.forEach((channel: any) => {
            channelThumbnails[channel.id] = channel.snippet.thumbnails.default.url;
        });

        return {
            items: videosResponse.data.items.map((item: any) => ({
                ...item,
                id: item.id,
                channelThumbnail: channelThumbnails[item.snippet.channelId],
            })),
            nextPageToken: response.data.nextPageToken,
        };
    },

    async getPopularVideos(pageToken: string) {
        const response = await this.httpClient.get("videos", {
            params: {
                part: "snippet,statistics",
                maxResults: 1,
                chart: "mostPopular",
                regionCode: "KR",
                pageToken: pageToken,
            },
        });

        const channelIds = Array.from(new Set(response.data.items.map((item: any) => item.snippet.channelId)));

        const channelsResponse = await this.httpClient.get("channels", {
            params: {
                part: "snippet",
                id: channelIds.join(','),
            },
        });

        const channelThumbnails: { [key: string]: string } = {};

        channelsResponse.data.items.forEach((channel: any) => {
            channelThumbnails[channel.id] = channel.snippet.thumbnails.default.url;
        });

        return {
            items: response.data.items.map((item: any) => ({
                ...item,
                channelThumbnail: channelThumbnails[item.snippet.channelId],
            })),
            nextPageToken: response.data.nextPageToken,
        };
    },
};

export default YoutubeApi;
