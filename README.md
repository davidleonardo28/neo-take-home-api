# Neo RPG API - Take-Home Assignment

This is a proof-of-concept backend system for a role-playing game, focused on managing characters and simulating battles. It is built with Node.js, TypeScript, and Express. All data is stored in memory (no database).

## Technologies

- Node.js + Express
- TypeScript
- Jest (unit testing)

---

## Installation & Setup

`````markdown
1. Clone the project from the `.bundle` file:

````bash
git clone submission-DavidBarrera.bundle -b master
cd submission-DavidBarrera

2. Install dependencies:

```bash
npm install
````

3. Run the API in development mode:

```bash
npm run dev
```

The server will be available at:
`http://localhost:3000`

---

## Run Unit Tests

```bash
npm run test
```

Test coverage includes:

- Character creation (valid, invalid, duplicate)
- Listing characters
- Getting character details
- Simulating battles (with full log)

---

##Game Rules Summary

- Each character has:

  - A name (4–15 letters/numbers/underscores)
  - A job: `Warrior`, `Thief`, or `Mage`
  - Initial stats based on the job

- Jobs define how attack/speed modifiers are calculated.

- A battle simulates rounds of attacks until one character dies.

---

## Endpoints

### Create character – `POST /characters`

```json
{
  "name": "Hero_1",
  "job": "Warrior"
}
```

### Get all characters – `GET /characters`

Returns an array with name, job, and alive status.

### Get character by name – `GET /characters/:name`

Returns full details including stats, modifiers, and HP.

### Simulate battle – `POST /characters/battle`

```json
{
  "name1": "Hero_1",
  "name2": "Enemy_1"
}
```

Returns battle log and winner.

---

```

```
`````
"# neo-take-home-api" 
