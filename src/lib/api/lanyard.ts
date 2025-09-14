import ky from "ky"
import { baseKy } from "."

const lanyardKy = baseKy.extend((options) => ({prefixUrl: `${options.prefixUrl}/api.lanyard.rest/v1/users`}));

export const lanyard = {
    me: async () => (await lanyardKy.get<LanyardUser>("829372486780715018").json()).data
}

export type LanyardUser = {
    data: {
        discord_user: {
            id: string,
            username: string,
            avatar: string,
            discriminator: string
            primary_guild: {
                tag: string
            },
            global_name: string
            display_name: string
        },
        activities: LanyardActivity[]
        discord_status: "dnd" | "idle" | "offline" | "online",
    }
}

type LanyardActivity =
    | CustomActivity

type BaseActivity = {
    id: string,
    name: string,
    type: number,
    created_at: number,
}

type CustomActivity = BaseActivity & {
    emoji: { name: string }
}