
export async function getHashtagByName(req, res) {
    const { rows } = res.locals.hashtags

    try {
        const body = rows.map(elm => {
            return {
                name: elm.name
            }
        })
    } catch (error) {
        res.status(500).send(error)
    }
}