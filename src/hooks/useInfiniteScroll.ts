import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useRef } from "react";

interface InfiniteScrollOptions<T> {
    queryKey: string[];
    queryFn: (context: { pageParam?: string }) => Promise<T>;
    getNextPageParam: (lastPage: T) => string | undefined;
    staleTime?: number;
    gcTime?: number;
    refetchOnWindowFocus?: boolean;
    refetchOnMount?: boolean;
    refetchOnReconnect?: boolean;
    initialPageParam?: string;
}

export function useInfiniteScroll<T>({
    queryKey,
    queryFn,
    getNextPageParam,
    staleTime = 60000,
    gcTime = 1000 * 60 * 10,
    refetchOnWindowFocus = false,
    refetchOnMount = false,
    refetchOnReconnect = false,
    initialPageParam = "",
}: InfiniteScrollOptions<T>) {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey,
            queryFn,
            getNextPageParam,
            staleTime,
            gcTime,
            refetchOnWindowFocus,
            refetchOnMount,
            refetchOnReconnect,
            initialPageParam,
        });

    const observer = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useCallback(
        (node: HTMLElement | null) => {
            if (isFetchingNextPage) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            });
            if (node) observer.current.observe(node);
        },
        [isFetchingNextPage, fetchNextPage, hasNextPage]
    );

    return { data, lastElementRef, isFetchingNextPage };
}
