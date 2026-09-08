import { NextResponse } from "next/server";

const COUNTER_KEY = "portfolio:visitor-count";
const DEFAULT_STARTING_COUNT = 128;

let localVisitorCount =
    Number.parseInt(process.env.PORTFOLIO_VISITOR_START ?? "", 10) ||
    DEFAULT_STARTING_COUNT;

function getRedisConfig() {
    const url =
        process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
    const token =
        process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

    return url && token ? { url, token } : null;
}

async function runRedisCommand(command: string[]) {
    const config = getRedisConfig();
    if (!config) return null;

    const response = await fetch(`${config.url}/`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${config.token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(command),
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`Visitor counter storage returned ${response.status}`);
    }

    const result = (await response.json()) as { result: number | string };
    return Number(result.result);
}

export async function POST() {
    try {
        const config = getRedisConfig();
        let count: number;

        if (config) {
            await runRedisCommand([
                "SETNX",
                COUNTER_KEY,
                String(
                    Number.parseInt(
                        process.env.PORTFOLIO_VISITOR_START ?? "",
                        10,
                    ) || DEFAULT_STARTING_COUNT,
                ),
            ]);
            count = (await runRedisCommand(["INCR", COUNTER_KEY])) ?? 0;
        } else {
            localVisitorCount += 1;
            count = localVisitorCount;
        }

        return NextResponse.json({ count });
    } catch (error) {
        console.error("Visitor counter error:", error);
        return NextResponse.json(
            { error: "Unable to update visitor count" },
            { status: 503 },
        );
    }
}
