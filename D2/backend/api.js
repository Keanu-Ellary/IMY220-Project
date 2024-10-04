const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const base =
	"mongodb+srv://u22893459:l3ob0g0gURdykg67@imy220.jk4tw.mongodb.net/?retryWrites=true&w=majority&appName=IMY220";

const client = new MongoClient(base);

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

function passwordValidation(password) {
    // Check if password is longer than 8 characters
    if (password.length <= 8) {
        return { valid: false, message: "Password must be longer than 8 characters." };
    }

    // Regular expression for validation
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const number = /[0-9]/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

    // Check for at least one uppercase letter
    if (!uppercase.test(password)) {
        return { valid: false, message: "Password must contain at least one uppercase letter." };
    }

    // Check for at least one lowercase letter
    if (!lowercase.test(password)) {
        return { valid: false, message: "Password must contain at least one lowercase letter." };
    }

    // Check for at least one number
    if (!number.test(password)) {
        return { valid: false, message: "Password must contain at least one number." };
    }

    // Check for at least one special character
    if (!specialChar.test(password)) {
        return { valid: false, message: "Password must contain at least one special character." };
    }

    // If all conditions are met, the password is valid
    return { valid: true, message: "Password is valid." };
}

async function login(email, password) {
	try {
		await client.connect();
		console.log("Connected to MongoDB");

		const db = client.db("SongSphere");
		const collection = db.collection("Users");

		const foundUser = await collection.findOne({
			email: email,
			password: password,
		});

		if (foundUser) {
			return foundUser;
		} else {
			return null;
		}
	} catch (error) {
		console.error("Error during login: ", error);
		throw error;
	} finally {
		client.close();
	}
}

async function signUp(name, surname, email, password, username) {
	try {
		await client.connect();
		console.log("Connected to MongoDB");

		const db = client.db("SongSphere");
		const collection = db.collection("Users");

		var existing = await collection.findOne({ email: email });
		if (existing) {
			return { success: false, message: "User already exists" };
		}

		existing = await collection.findOne({ username : username});
		if(existing)
		{
			return { success : false, message: "Username already taken"};
		}

		const user = {
			name: name,
			surname: surname,
			email: email,
			password: password,
			playlist_id: [],
			followers: [],
			following: [],
			username: username,
		};

		const res = await collection.insertOne(user);
		return { success: true, user: res };
	} catch (error) {
		console.error("Error found during sign up", error);
		throw error;
	} finally {
		client.close();
	}
}

async function allSongs() 
{
    try 
    {
        await client.connect();
		console.log("Connected to MongoDB");

		const db = client.db("SongSphere");
		const collection = db.collection("Songs");

        const songs = await collection.find({}).toArray();
        return songs;
    } 
    catch (error) 
    {
        console.error("Error listing songs", error);
        throw error;
    }
    finally
    {
        await client.close();
    }
}

async function allPlaylists() 
{
    try 
    {
        await client.connect();
		console.log("Connected to MongoDB");

		const db = client.db("SongSphere");
		const collection = db.collection("Playlists");

        const play = await collection.aggregate([
            {
                $lookup: {
                    from: 'Songs',  // The collection where song details are stored
                    localField: 'songs',  // The field in Playlists collection that holds song IDs
                    foreignField: '_id',  // The field in Songs collection that matches the IDs
                    as: 'Songs'  // The name for the resulting array of song details
                }
            },
            {
                $lookup: {
                    from: 'Comments',
                    localField: 'comments',
                    foreignField: '_id',
                    as: 'Comments'
                }
            },
			{
				$lookup: {
					from: 'Users',
					localField: 'creator',
					foreignField: '_id',
					as: 'Creator'
				}
			},
			{
				$project:{
					songs : 0,
					comments : 0,
					creator: 0
				}
			}
        ]).toArray();

        return play;
    } 
    catch (error) 
    {
        console.error("Error listing playlists", error);
        throw error;
    }
    finally
    {
        await client.close();
    }
}

async function playlistByUser(userId) 
{
	try
	{
		const result = [];
        const user = await userById(userId);

        const playlists = await Promise.all(
            user.playlist_id.map(async (id) => {
                const playlist = await playlistById(id);
                return playlist;
            })
        );

        return playlists;
	}
	catch(error)
	{
		throw error;
	}
}

app.post('/usersPlaylist', async (req, res) => {
	const {userId} = req.body;

	if(!userId || userId === "")
	{
		return res.status(500).send({message : "Users ID is required"});
	}

	try {
		const playlists = await playlistByUser(userId);
		res.status(200).send({message : "Found users playlists", result : playlists});
	} catch (error) {
		res.status(500).send({message : "Error is finding playlists", error : error.message});
	}
});

async function playlistById(id) 
{
	try 
	{
		await client.connect();
		console.log("Connected to MongoDB");

		const db = client.db("SongSphere");
		const collection = db.collection("Playlists");
		const songsCollection = db.collection("Songs");
		const commentsCollection = db.collection("Comments");
		const usersCollection = db.collection("Users");

		// Find the playlist by its _id
		const playlist = await collection.findOne({ _id: id });
	
		if (!playlist) {
		  throw new Error('Playlist not found');
		}
	
		// Get the song details for each song in the playlist
		const songIds = playlist.songs.map(songId => songId); // Assuming `songs` is an array of ObjectIds
		const songDetails = await songsCollection.find({ _id: { $in: songIds } }).toArray();

		const commentIds = playlist.comments.map(commentId => commentId);
		const commentDetails = await commentsCollection.find({_id : {$in: commentIds}}).toArray();

		const creatorDetails = await usersCollection.find({_id :  playlist.creator}).toArray();
	
		// Replace the `songs` array with the detailed song information
		playlist.songs = songDetails;
		playlist.comments = commentDetails;
		playlist.creator = creatorDetails;
	
		return playlist;
	} 
	catch (error) 
	{
		console.error("Error fetching playlist by ID:", error);
		throw error;
	} 
	finally 
	{
		await client.close();
	}
}

async function search(term) 
{
	try 
	{
		await client.connect();
		console.log("Connected to MongoDB");

		const db = client.db("SongSphere");

		const userSearch = await db.collection('Users').find({
			username : {$regex: term, $options: 'i'}
		}).toArray();

		const songSearch = await db.collection('Songs').find({
			$or: [
				{title: {$regex: term, $options: 'i'}},
				{artists: {$regex: term, $options: 'i'}}
			]
		}).toArray();

		const playlists = await db.collection('Playlists').find({
			name: { $regex: term, $options: 'i' }
		}).toArray();
	  
		// Fetch detailed playlists using playlistById
		const playlistSearch = await Promise.all(
			playlists.map(async (playlist) => 
			{
			  	return await playlistById(playlist._id);
			})
		);

		const results = {
			userSearch,
			songSearch,
			playlistSearch
		};

		return results;
	} 
	catch (error) 
	{
		console.error("Error searching: ", error);
		throw error;
	}
	finally
	{
		await client.close();
	}
}

async function addFollow(userId, otherId) 
{
	try
	{
		await client.connect();
		console.log("Connected to MongoDB");

		const db = client.db("SongSphere");
		const collection = db.collection("Users");

		const usersID = new ObjectId(userId);
		const targetsID = new ObjectId(otherId);

		const user = await collection.findOne({_id : usersID});
		const target = await collection.findOne({_id : targetsID});

		if(!user || !target)
		{
			throw new Error("One or both users not found");
		}

		if (user.following.some(id => id.toString() === targetsID.toString()))
		{
			throw new Error("You already follow this person");
		}

		await collection.updateOne(
			{_id : usersID},
			{$push : {following : targetsID}}
		);

		await collection.updateOne(
			{_id : targetsID},
			{$push : {followers : usersID}}
		);

		console.log("You are now following " + target.username);
	}
	catch (error)
	{
		console.error("Error in friending user: ", error);
		throw error;
	}
	finally
	{
		await client.close();
	}
}

async function removeFollow(userId, otherId) 
{
	try
	{
		await client.connect();
		console.log("Connected to MongoDB");

		const db = client.db("SongSphere");
		const collection = db.collection("Users");

		const usersID = new ObjectId(userId);
		const targetsID = new ObjectId(otherId);

		const user = await collection.findOne({_id : usersID});
		const target = await collection.findOne({_id : targetsID});

		if(!user || !target)
		{
			throw new Error("One or both users not found");
		}

		if (!user.following.some(id => id.toString() === targetsID.toString())) 
		{
			throw new Error("You are not following this person");
		}

		await collection.updateOne(
			{_id : usersID},
			{$pull : {following : targetsID}}
		);

		await collection.updateOne(
			{_id : targetsID},
			{$pull : {followers : usersID}}
		);

		console.log("You have unfollowed " + target.username);
	}
	catch(error)
	{
		console.error("Error in unfriending: ", error);
		throw error;
	}
	finally
	{
		await client.close();
	}
}

async function addSong(title, artists, duration, image, streams, spotify) 
{
	try
	{
		await client.connect();
    	console.log("Connected to MongoDB");

    	const db = client.db("SongSphere");
    	const collection = db.collection("Songs");

		const exists = await collection.findOne({title : title});
		if(exists)
		{
			throw new Error("Song already in database");
		}

		const song = {
			title,
			artists,
			duration,
			image,
			streams,
			spotify_link : spotify
		};

		const result = await collection.insertOne(song);

    	console.log("Song added successfully:", result.insertedId);
    	return result;
	}
	catch (error)
	{
		console.error("Error adding song: ", error);
		throw error;
	}
	finally
	{
		await client.close();
	}
}

async function addToPlaylist(songId, playlistId) 
{
	try
	{
		await client.connect();
    	console.log("Connected to MongoDB");

    	const db = client.db("SongSphere");
    	const collection = db.collection("Playlists");
		const songs = db.collection("Songs");

		const songExisting = await songs.findOne({_id : new ObjectId(songId)});
		if(!songExisting)
		{
			throw new Error("Song does not exist");
		}

		const existing = await collection.findOne({ _id: new ObjectId(playlistId) });
		if(!existing)
		{
			throw new Error("Playlist not found");
		}

		const songInPlaylist = await collection.findOne({
            _id: new ObjectId(playlistId),
            songs: { $in: [new ObjectId(songId)] }
        });

        if (songInPlaylist) {
            throw new Error("Song already exists in playlist");
        }

		const result = await collection.updateOne(
            { _id: new ObjectId(playlistId) },
            { 
				$push: { songs: new ObjectId(songId) },
				$inc : {numOfSongs : 1}
			}
        );

        console.log("Song added to playlist successfully");
        return result;
	}
	catch (error)
	{
		console.error("Error in adding: ", error);
		throw error;
	}
	finally
	{
		await client.close();
	}
}

async function createPlaylist(name, creator, genre, image) 
{
	try
	{
		await client.connect();
    	console.log("Connected to MongoDB");

    	const db = client.db("SongSphere");
    	const collection = db.collection("Playlists");
		const users = db.collection("Users");

		const existUser = await users.findOne({_id : new ObjectId(creator)});
		if(!existUser)
		{
			throw new Error("User not found");
		}

		const existPlay = await collection.findOne({name : name});
		if(existPlay)
		{
			throw new Error("Playlist already exists");
		}

		const nPlaylist = {
			name : name,
			creator : new ObjectId(creator),
			numOfSongs : 0,
			genre : genre,
			imageUrl : image,
			songs : [],
			comments : []
		};

		const result = await collection.insertOne(nPlaylist);

		await users.updateOne(
			{_id : new ObjectId(creator)},
			{$push : {playlist_id : result.insertedId}}
		);

		return result;
	}
	catch(error)
	{
		console.error("Error in creating playlist: ", error);
		throw error;
	}
	finally
	{
		await client.close();
	}
}

async function editPlaylist(playlistId, name, genre, image) 
{
	try
	{
		await client.connect();
    	console.log("Connected to MongoDB");

    	const db = client.db("SongSphere");
    	const collection = db.collection("Playlists");

		const existing = await collection.findOne({_id : new ObjectId(playlistId)});
		if(!existing)
		{
			throw new Error("Playlist not found");
		}

		const updated = {};
		if(name)
			updated.name = name;
		if(genre)
			updated.genre = genre;
		if(image)
			updated.imageUrl = image;

		const result = await collection.updateOne(
			{_id : new ObjectId(playlistId)},
			{$set : updated}
		);

		console.log("Playlist updated successfully");
		return result;
	}
	catch(error)
	{
		console.log("Error in editing: ", error);
		throw error;
	}
	finally
	{
		await client.close();
	}
}

async function deleteSong(songId) 
{
	try
	{
		await client.connect();
    	console.log("Connected to MongoDB");

    	const db = client.db("SongSphere");
		const songCollection = db.collection("Songs");
    	const playlistCollection = db.collection("Playlists");

		const exists = await songCollection.findOne({_id : new ObjectId(songId)});
		if(!exists)
		{
			throw new Error("Song not found");
		}

		const result = await songCollection.deleteOne({_id : new ObjectId(songId)});
		console.log("Song successfully deleted", result.acknowledged);

		await playlistCollection.updateMany(
			{songs : new ObjectId(songId)},
			{$pull : {songs : new ObjectId(songId)}}
		);
		console.log("Song removed from all playlists");

		return result;
	}
	catch(error)
	{
		console.error("Error in deleting song: ", error);
		throw error;
	}
	finally
	{
		await client.close();
	}
}

async function deletePlaylist(playlistId) 
{
	try
	{
		await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db("SongSphere");
		const playlistCollection = db.collection("Playlists");
		const usersCollection = db.collection("Users");

		const existing = await playlistCollection.findOne({_id : new ObjectId(playlistId)});
		if(!existing)
		{
			throw new Error("Playlist not found");
		}

		const result = await playlistCollection.deleteOne({_id : new ObjectId(playlistId)});
		console.log(existing.name + " has been deleted successfully", result.acknowledged);

		await usersCollection.updateOne(
			{playlist_id : new ObjectId(playlistId)},
			{$pull : {playlist_id : new ObjectId(playlistId)}}
		);

		console.log("Playlist removed from Users Profile");

		return result;
	}
	catch(error)
	{
		console.error("Error is deleting playlist: ", error);
		throw error;
	}
	finally
	{
		await client.close();
	}
}

async function removeSongFromPlaylist(songId, playlistId) 
{
	try
	{
		await client.connect();
		console.log("Connected to MongoDB");

		const db = client.db("SongSphere");
		const collection = db.collection("Playlists");

		const existing = await collection.findOne({_id : new ObjectId(playlistId)});
		if(!existing)
		{
			throw new Error("Playlist not found");
		}

		const songExisting = await collection.findOne({
			_id : new ObjectId(playlistId),
			songs : {$in : [new ObjectId(songId)]}
		});

		if(!songExisting)
		{
			throw new Error("Song is not in playlist");
		}

		const result = await collection.updateOne(
			{_id : new ObjectId(playlistId)},
			{$pull : {songs : new ObjectId(songId)}, $inc : {numOfSongs : -1}}
		);

		console.log("Song removed from", existing.name);
		return result;
	}
	catch(error)
	{
		throw error;
	}
	finally
	{
		await client.close();
	}
}

async function deleteUser(userId) 
{
	try
	{
		await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db("SongSphere");
		const users = db.collection("Users");
		const playlists = db.collection("Playlists");

		const usersID = new ObjectId(userId);

		const user = await users.findOne({_id : usersID});
		if(!user)
		{
			throw new Error("User not found");
		}

		await playlists.deleteMany({creator : usersID});
		console.log(user.username + "'s playlists are deleted");

		await users.updateMany(
			{followers : usersID},
			{$pull : {followers : usersID}}
		);

		console.log(user.username + "'s followers are deleted");

		await users.updateMany(
			{following : usersID},
			{$pull : {follwing : usersID}}
		);

		console.log(user.username + "'s follwing is deleted");

		const result = await users.deleteOne({_id : usersID});
		if(result.deletedCount === 0)
		{
			throw new Error("Failed to delete user");
		}

		console.log("User successfully deleted");
		return result;
	}
	catch(error)
	{
		throw error;
	}
	finally
	{
		await client.close();
	}
}

async function userById(userId) 
{
	try
	{
		await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db("SongSphere");
        const usersCollection = db.collection("Users");

		const usersID = new ObjectId(userId);

		const user = await usersCollection.findOne({_id : usersID});

		if(!user)
		{
			throw new Error("User not found");
		}

		return user;
	}
	catch(error)
	{
		throw error;
	}
	finally
	{
		await client.close();
	}
}

async function songById(songId) 
{
	try
	{
		await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db("SongSphere");
		const collection = db.collection("Songs");

		const songsID = new ObjectId(songId);
		
		const song = await collection.findOne({_id : songsID});
		if(!song)
		{
			throw new Error("Song not found");
		}

		return song;
	}
	catch(error)
	{
		throw error;
	}
	finally
	{
		await client.close();
	}
}

app.get('/song', async (req, res) => {
	const {songId} = req.body;

	if(!songId || songId === "")
	{
		return res.status(500).send({message : "Song ID is required"});
	}

	try {
		const song = await songById(songId);
		res.status(200).send({message : "Song found", song});
	} catch (error) {
		res.status(500).send({message : "Error in finding song", error : error.message});
	}
});

app.post('/user', async (req, res) => {
	const {userId} = req.body;

	if(!userId || userId === "")
	{
		return res.status(500).send({error : "User ID is required"});
	}

	try
	{
		const result = await userById(userId);
		res.status(200).send({message : "User found", result});
	}
	catch(error)
	{
		return res.status(500).send({message : "Error in finding user", error : error.message});
	}
});

app.delete('/deleteUser', async (req, res) => {
	const {userId} = req.body;

	if(!userId || userId === "")
	{
		return res.status(500).send({error : "User ID is required"});
	}

	try
	{
		await deleteUser(userId);
		res.status(200).send({message : "User successfully deleted"});
	}
	catch(error)
	{
		res.status(500).send({message : "Error in deleting user", error : error.message});
	}
});

app.patch('/playlistRemove', async (req, res) => {
	const {playlistId, songId} = req.body;

	if(!playlistId || playlistId === "")
	{
		return res.status(500).send({error : "Playlist ID is required"});
	}

	if(!songId || songId === "")
	{
		return res.status(500).send({error : "Song ID is required"});
	}

	try
	{
		await removeSongFromPlaylist(songId, playlistId);
		res.status(200).send({message : "Song removed from playlist"})

	}
	catch(error)
	{
		res.status(500).send({message : "Error in removing", error : error.message});
	}
});

app.delete('/deletePlaylist', async (req, res) => {
	const {playlistId} = req.body;

	if(!playlistId || playlistId === "")
	{
		return res.status(500).send({error : "Playlist ID is required"});
	}

	try
	{
		await deletePlaylist(playlistId);
		res.status(200).send({message : "Playlist successfully deleted"});
	}
	catch(error)
	{
		res.status(500).send({message : "Error deleting playlist", error : error.message});
	}
});

app.delete('/deleteSong', async (req, res) => {
	const {songId} = req.body;

	if(!songId || songId === "")
	{
		return res.status(500).send({error : "Song ID is required"});
	}

	try
	{
		await deleteSong(songId);
		res.status(200).send({message : "Song successfully deleted"});
	}
	catch(error)
	{
		res.status(500).send({message : "Error in deleting song", error : error.message});
	}
});

app.post('/removeFollow', async (req, res) => {
	const {userId, otherId} = req.body;

	if(!userId || !otherId)
	{
		return res.status(500).send({message : "One or both ID's are missing"});
	}

	try 
	{
		await removeFollow(userId, otherId);
		res.status(200).send({message : "Successfully followed user"});
	} 
	catch (error) 
	{
		res.status(500).send({message : "Error in unfollowing", error : error.message});
	}
});

app.post('/addFollow', async (req, res) => {
	const {userId, otherId} = req.body;

	if(!userId || !otherId)
	{
		return res.status(500).send({message : "One or both ID's are missing"});
	}

	try
	{
		await addFollow(userId, otherId);
		res.status(200).send({message : "Successfully followed user"});
	}
	catch(error)
	{
		res.status(500).send({message : "Error in following user", error : error.message});
	}
});

app.patch('/editPlaylist', async (req, res) => 
{
    const { playlistId, name, genre, image } = req.body;

	if(!playlistId)
	{
		return res.status(500).send({message : "Playlist ID is required"});
	}

	if(!name && !genre && !image)
	{
		return res.status(200).send({message : "Nothing to update"});
	}

    try 
	{
        const result = await editPlaylist(playlistId, name, genre, image);
        res.status(200).send({ message: "Playlist updated", result });
    } 
	catch (error) 
	{
        res.status(500).send({ message: "Error editing playlist", error: error.message });
    }
});


app.post('/createPlaylist', async (req, res) => {
    const { name, creator, genre, image } = req.body;

	if(!name)
	{
		return res.status(400).send({message : "Name of playlist required"});
	}

	if(!creator)
	{
		return res.status(400).send({message : "Creator of playlist required"});
	}

	if(!genre)
	{
		return res.status(400).send({message : "Genre of playlist required"});
	}

	if(!image)
	{
		return res.status(400).send({message : "Image of playlist required"});
	}

    try 
	{
        const result = await createPlaylist(name, creator, genre, image);
        res.status(200).send({ message: "Playlist created", playlistId: result.insertedId });
    } 
	catch (error) 
	{
        res.status(500).send({ message: "Error creating playlist", error: error.message });
    }
});


app.post('/addToPlaylist', async (req, res) => {
	const {songId, playlistId} = req.body;

	if(!songId || songId === "")
	{
		return res.status(400).send({message : "Song ID is missing"});
	}

	if(!playlistId || playlistId === "")
	{
		return res.status(400).send({message : "Playlist ID is missing"});
	}

	try
	{
		const result = await addToPlaylist(songId, playlistId);

		if(result.modifiedCount > 0)
		{
			return res.status(200).send({message : "Song successfully added"});
		}
		else
		{
			return res.status(400).send({message : "Failed to add to playlist"});
		}
	}
	catch(error)
	{
		console.error("Error in adding: ", error);
		return res.status(500).send({message : "Error in adding to Playlist", error : error.message});
	}
});

app.post('/addSong', async (req, res) => {
	const {title, artists, duration, image, streams, spotify} = req.body;

	if(!title)
	{
		return res.status(500).send({error : "Missing song title"});
	}

	if(!artists || !Array.isArray(artists))
	{
		return res.status(500).send({error : "Missing artists or artists is not an array"});
	}

	if(!duration)
	{
		return res.status(500).send({error : "Missing song duration"});
	}

	if(!image)
	{
		return res.status(500).send({error : "Missing song image"});
	}

	if(!streams)
	{
		return res.status(500).send({error : "Missing song streams"});
	}

	if(!spotify)
	{
		return res.status(500).send({error : "Missing song link"});
	}

	try 
	{
		const result = await addSong(title, artists, duration, image, streams, spotify);

		res.status(200).send({message : "Song added successfully", song_id: result.insertedId});
	} 
	catch (error) 
	{
		res.status(500).send({error : "Error in adding song"});
	}
});

app.get('/search', async (req, res) => {
	const {term} = req.query;

	if(!term)
	{
		return res.status(400).send({error : "Search term is required"});
	}

	try
	{
		const result = await search(term);
		res.status(200).send(result);
	}
	catch(error)
	{
		res.status(500).send({error : "Error in searching"});
	}
});

app.get('/playlists', async (req, res) => {
    try
    {
        const getAllPlaylists = await allPlaylists();
        res.status(200).send(getAllPlaylists);
    }
    catch(error)
    {
        res.status(500).send({message : "Failed in getting playlists", error : error});
    }
})

app.get('/songs', async (req, res) => {
    try 
    {
        const getAllSongs = await allSongs();
        res.status(200).send(getAllSongs);
    } 
    catch (error) 
    {
        res.status(500).send({message : "Failed in getting songs", error : error});
    }
});

app.post("/login", async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.send({ message: "Email and password are required." });
	}

	const user = await login(email, password);

	if (user) {
		res.status(200).send({ message: "Login successful", user });
	} else {
		res.status(401).send({ message: "Invalid email or password" });
	}
});

app.post("/signup", async (req, res) => {
	const { name, surname, email, password, username } = req.body;

	if (!name) {
		return res.status(400).send({ message: "Name is required." });
	}

	if (!surname) {
		return res.status(400).send({ message: "Surname is required." });
	}

	if (!email) {
		return res.status(400).send({ message: "Email is required." });
	}

	if (!password) {
		return res.status(400).send({ message: "Password is required." });
	}

	if(!username)
	{
		return res.status(400).send({ message: "Username is required." });
	}

    const testPassword = passwordValidation(password);

    if(testPassword.valid === false)
    {
        return res.status(400).send({message : testPassword.message});
    }

	try {
		const result = await signUp(name, surname, email, password, username);

		if (result.success) {
			res
				.status(201)
				.send({ message: "User created successfully", user: result.user });
		} else {
			res.status(409).send({ message: result.message }); // 409 Conflict if email already exists
		}
	} catch (error) {
		res
			.status(500)
			.send({ message: "Internal server error", error: error.message });
	}
});

app.listen(port, async () => {
	console.log(`Database server is running on http://localhost:${port}`);
});
