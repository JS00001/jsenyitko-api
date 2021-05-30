## Jsenyitko.tech

### Api V1 // Docs
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

`https://jsenyitko.tech/api/v1/getevents` - **GET** [Click Here](https://jsenyitko.tech/api/v1/getevents)

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