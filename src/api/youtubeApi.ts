import axios from "axios";
import { ChannelDetail, Video } from "../../public/types";

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
                maxResults: 10,
                q: keyword,
                pageToken: pageToken,
            },
        });

        const videoIds = response.data.items.map((item: any) => item.id.videoId).join(',');
        const channelIds = Array.from(new Set(response.data.items.map((item: Video) => item.snippet.channelId)));

        const videosResponse = await this.httpClient.get("videos", {
            params: {
                part: "snippet,statistics",
                id: videoIds,
            },
        });

        const channelsResponse = await this.httpClient.get("channels", {
            params: {
                part: "snippet,contentDetails,statistics",
                id: channelIds.join(','),
            },
        });

        const channelDetails: { [key: string]: ChannelDetail } = {};

        channelsResponse.data.items.forEach((channel: ChannelDetail) => {
            channelDetails[channel.id] = channel
        });

        return {
            items: videosResponse.data.items.map((item: any) => ({
                ...item,
                channelDetails: channelDetails[item.snippet.channelId],
            })),
            nextPageToken: response.data.nextPageToken,
        };
    },

    async getPopularVideos(pageToken: string) {
        const response = await this.httpClient.get("videos", {
            params: {
                part: "snippet,statistics",
                maxResults: 20,
                chart: "mostPopular",
                regionCode: "KR",
                pageToken: pageToken,
            },
        });

        const channelIds = Array.from(new Set(response.data.items.map((item: Video) => item.snippet.channelId)));

        const channelsResponse = await this.httpClient.get("channels", {
            params: {
                part: "snippet,contentDetails,statistics",
                id: channelIds.join(','),
            },
        });

        const channelDetails: { [key: string]: ChannelDetail } = {};

        channelsResponse.data.items.forEach((channel: ChannelDetail) => {
            channelDetails[channel.id] = channel
        });

        return {
            items: response.data.items.map((item: Video) => ({
                ...item,
                channelDetails: channelDetails[item.snippet.channelId],
            })),
            nextPageToken: response.data.nextPageToken,
        };
    },

    async getComments(videoId: string, pageToken: string | undefined) {
        const response = await this.httpClient.get("commentThreads", {
            params: {
                part: "snippet",
                videoId: videoId,
                maxResults: 10,
                pageToken: pageToken,
            },
        });
        return response.data;
    },

    async getPlaylistItems(playlistId: string) {
        const response = await this.httpClient.get("playlistItems", {
            params: {
                part: "snippet",
                playlistId: playlistId,
                maxResults: 20,
            },
        });
        return response.data;
    },

    async getVideoById(videoId: string) {
        const response = await this.httpClient.get("videos", {
            params: {
                part: "snippet,statistics",
                id: videoId,
            },
        });
    
        const channelId = response.data.items[0].snippet.channelId;
    
        const channelResponse = await this.httpClient.get("channels", {
            params: {
                part: "snippet,contentDetails,statistics",
                id: channelId,
            },
        });
    
        return {
            ...response.data.items[0],
            channelDetails: channelResponse.data.items[0],
        };
    }
};

export default YoutubeApi;
