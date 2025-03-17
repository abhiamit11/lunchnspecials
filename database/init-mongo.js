const dbName = "LunchNSpecials"; // Define your database name

// Switch to the target database
const db = db.getSiblingDB(dbName);

// Check if the database exists (if db.getCollectionNames() returns an array, the DB exists)
if (db.getCollectionNames().length === 0) {
  print(`Database ${dbName} doesn't exist yet, creating it now...`);
} else {
  print(`Database ${dbName} already exists.`);
}

// List of collections to create if not exist
const collections = [
  "restaurants",
  "restaurant_menus",
  "analytics_visitor",
  "analytics_restaurant_visit",
  "import_history",
  "superadmins",
];

collections.forEach(function (collection) {
  if (!db.getCollectionNames().includes(collection)) {
    print("Creating collection: " + collection);
    db.createCollection(collection);
  } else {
    print("Collection already exists: " + collection);
  }
});

const restaurants = db.getCollection("restaurants");
if (restaurants) {
  restaurants.createIndex({ location: "2dsphere" });
}

const superadmins = db.getCollection("superadmins");
if (superadmins) {
  // Check if the collection is empty, and if so, insert a document
  // password: R5:H3=ih40g1Da[:
  if (superadmins.countDocuments() === 0) {
    print("Inserting document into superadmins");
    superadmins.insertOne({
      email: "admin@lunchnspecials.com",
      password:
        "$argon2id$v=19$m=65536,t=2,p=1$GXFVbe0BYYK3ybQyqdcJ83O12473W0UWAm+H1E2NnQo$uWifpzqwK5XnUDfnab/uCF3kUQ33qN/rqO9fF3mUN3A",
      user: "Admin",
      role: "superadmin",
    });
  } else {
    print("superadmins already contains documents, skipping insert.");
  }
}
