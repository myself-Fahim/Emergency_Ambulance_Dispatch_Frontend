export const adminRoutes = [
        {
            title: "Management",
            items: [
                {
                    title: "Overview",
                    url: "/admin",
                },
                {
                    title: "Approve Driver",
                    url: "/admin/approve-driver-application",
                },
            ],
        },

    ]


export type TSidebarItems = {
    title:string,
    url : string
}
export type TSidebarGroup = {
    title:string,
    items : TSidebarItems[]
}
export type TSidebarGroups = TSidebarGroup[]