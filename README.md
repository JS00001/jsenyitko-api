## Jsenyitko.tech Api V1 Docs (Depreciated)

### **/api/v1/getuser**
`https://jsenyitko.tech/api/v1/getuser` - **GET** [[Click Here]](https://jsenyitko.tech/api/v1/getuser)

**Returns**
```json
{
	"events": [],
	"_id": "ID String",
	"id": "Discord ID",
	"ign": "MC Ign",
	"username": "Discord Username",
	"lastChanged": "<int>Last Username Change",
	"admin": false
}
```

### **/api/v1/getevents**
`https://jsenyitko.tech/api/v1/getevents` - **GET** [Click Here](https://jsenyitko.tech/api/v1/getevents)

**Authorization**
- **Header** - `authorization: "YOUR API KEY"`

**Returns**
```json
[
    {
        "detail" : "death/tp/ping",
        "status" : "some status"
    },
        {
        "detail" : "death/tp/ping",
        "status" : "some status"
    }
]
```

## Jsenyitko.tech Api V2 Docs

### **/api/v2/getuser**
`https://jsenyitko.tech/api/v2/getuser` - **GET** [[Click Here]](https://jsenyitko.tech/api/v2/getuser)

**Returns**
```json
{
	"events": [],
	"_id": "ID String",
	"id": "Discord ID",
	"ign": "MC Ign",
	"username": "Discord Username",
	"lastChanged": "<int>Last Username Change",
	"admin": false
}
```

### **/api/v2/getevents**
`https://jsenyitko.tech/api/v2/getevents` - **GET** [Click Here](https://jsenyitko.tech/api/v2/getevents)

**Authorization**
- **Header** - `authorization: "YOUR API KEY"`

**Returns**
```json
[
    {
        "detail" : "death/tp/ping",
        "status" : "some status"
    },
        {
        "detail" : "death/tp/ping",
        "status" : "some status"
    }
]
```

### **/api/v2/getscores**
`https://jsenyitko.tech/api/v2/getscores` - **GET** [Click Here](https://jsenyitko.tech/api/v2/getevents)

**Authorization**
- **Header** - `authorization: "YOUR API KEY"`
- **Permissions** - `Must be Admin`

**Returns**
```json
{}
```

### **/api/v2/updatescore**
`https://jsenyitko.tech/api/v2/updatescore` - **PUT** [Click Here](https://jsenyitko.tech/api/v2/updatescore)

**Authorization**
- **Header** - `authorization: "YOUR API KEY"`
- **Permissions** - `Must be Admin`

**Returns**
```json
{}
```