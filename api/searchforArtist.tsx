/*
import { MongoClient } from './mongodb';

interface SearchResult {
  _id: string;
  name: string; // Replace with the actual field you want to display
  // Add more fields as needed
}

const mongoConfig = {
    connectionString: 'mongodb+srv://dotguy:plymouthrock53@dotstest1.p1sxaps.mongodb.net/?retryWrites=true&w=majority',
    dbName: 'Scraped',
};

async function searchForArtist(query: string): Promise<SearchResult[]> {
  const client = new MongoClient(mongoConfig.connectionString);

  try {
    await client.connect();
    const db = client.db(mongoConfig.dbName);
    const collection = db.collection<SearchResult>('MusicBrainzArtists');

    const results = await collection
      .aggregate([
        {
          $search: {
            text: {
              query,
              path: 'collaborator_Names',
            },
          },
        },
      ])
      .toArray();

    return results;
  } finally {
    client.close();
  }
}

export default searchForArtist;
*/