import { getFetchData } from "@/utils/getFetchData";

export default defineEventHandler(async () => {
    const res = await getFetchData({
        url: '/login',
    })

    return res
})