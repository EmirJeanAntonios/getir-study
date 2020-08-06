# getir-study
This is an API that returns Data according to input data

URL : https://getir-study.herokuapp.com/

# Run in local
```bash
git clone https://github.com/Saroth99/getir-study.git
cd getir-study
npm i
npm run start
```
# EndPoints

## GET /

Returns "Getir-Case-Study"

## POST /records 

### Sample JSON
```json
 {
   "startDate": "2016-01-26",
   "endDate": "2016-02-26",
   "minCount": 2700,
   "maxCount": 3000
 }
```

### Output

```json
{
    "code": 0,
    "msg": "Success",
    "records": [
        {
            "key": "NOdGNUDn",
            "createdAt": "2016-01-28T07:10:33.558Z",
            "totalCount": 2813
        },
        {
            "key": "kkxEdhft",
            "createdAt": "2016-02-19T06:35:39.409Z",
            "totalCount": 2980
        },
        {
            "key": "UYOsBBSI",
            "createdAt": "2016-02-14T15:31:29.518Z",
            "totalCount": 2948
        },
        {
            "key": "wtSjVcpg",
            "createdAt": "2016-02-22T11:13:43.165Z",
            "totalCount": 2888
        },
        {
            "key": "bxoQiSKL",
            "createdAt": "2016-01-29T01:59:53.494Z",
            "totalCount": 2991
        }
    ]
}
```
# Test
To test the api
```bash
npm run test
```
For testing Mocha is used and for testing the endpoint chai is used



