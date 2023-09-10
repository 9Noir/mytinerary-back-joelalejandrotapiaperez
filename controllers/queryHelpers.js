export default (collectionName) =>
    ({
        cities: { populate: { path: "admin_id", select: "photo name email -_id" } },
        itineraries: {
            populate: [
                { path: "city_id", select: "city -_id" },
                { path: "creator", select: "name lastName photo -_id" },
                { path: "comments", populate: { path: "user_id", select: "name lastName photo createdAt" } },
                { path: "likes", populate: { path: "user_id", select: "_id" } },
            ],
        },
        activities: { populate: { path: "itinerary_id", select: "name -_id" } },
        likes: { populate: [{ path: "user_id" }, { path: "itinerary_id", select: "name photo city_id" }] },
        comments: { populate: { path: "itinerary_id", select: "name photo city_id" } },
        // users: { select: " -password" },
    }[collectionName] || "");
