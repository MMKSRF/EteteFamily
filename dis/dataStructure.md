Family Member Schema
{
  id: "string",
  name: "string",
  generation: "number",
  birthDate: "date",
  role: "string",
  bio: "string",
  image: "string",
  parents: ["id1", "id2"],
  children: ["id3", "id4"],
  spouse: "id5",
  location: "locationId",
  funFacts: ["string"],
  favoriteMemories: ["string"]
}



Timeline Event Schema
{
  id: "string",
  year: "number",
  title: "string",
  description: "string",
  image: "string",
  category: "wedding|birth|achievement|move",
  familyMembers: ["id1", "id2"],
  location: "string",
  significance: "string"
}