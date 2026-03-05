export default async function handler(req, res) {
    const { year, page } = req.query;
    const token = process.env.DISCOGS_API_TOKEN;

    if (!token) {
        return res.status(500).json({ error: 'Server misconfiguration: missing API token. Please configure DISCOGS_API_TOKEN in Vercel.' });
    }

    try {
        const response = await fetch(`https://api.discogs.com/database/search?type=master&year=${year}&page=${page}&per_page=15&token=${token}`);

        if (!response.ok) {
            throw new Error(`Discogs API returned status: ${response.status}`);
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching from Discogs API:', error);
        return res.status(500).json({ error: 'Failed to fetch data from Discogs.' });
    }
}
