import axios from "axios";

const YoutubeApi = {
    httpClient: axios.create({
        baseURL: "https://www.googleapis.com/youtube/v3",
        params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    }),

    search(keyword: string | undefined, pageToken: string = "") {
        console.log("!");   
        return keyword ? this.getVideosByKeyword(keyword, pageToken) : this.getPopularVideos(pageToken);
    },

    async getVideosByKeyword(keyword: string, pageToken: string) {
        const response = await this.httpClient.get("search", {
            params: {
                part: "snippet",
                maxResults: 25,
                q: keyword,
                pageToken: pageToken,
            },
        });

        const videoIds = response.data.items.map((item: any) => item.id.videoId).join(',');
        const videosResponse = await this.httpClient.get("videos", {
            params: {
                part: "snippet,statistics",
                id: videoIds,
            },
        });

        return {
            items: videosResponse.data.items.map((item: any) => ({
                ...item,
                id: item.id,
            })),
            nextPageToken: response.data.nextPageToken,
        }
    },

    async getPopularVideos(pageToken: string) {
        const response = await this.httpClient.get("videos", {
            params: {
                part: "snippet, statistics",
                maxResults: 25,
                chart: "mostPopular",
                regionCode: "KR",
                pageToken: pageToken,
            },
        });
        console.log(response);
        return {
            items: response.data.items,
            nextPageToken: response.data.nextPageToken,
        }
    },
};

export default YoutubeApi;
