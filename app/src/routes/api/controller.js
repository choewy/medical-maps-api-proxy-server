"use strict";

const axios = require('axios');

const url = 'http://apis.data.go.kr/B551182/rprtHospService/getRprtHospService';
const serviceKey = "KSO3PLlR02zTyKZzuYZXBKAbvnjbuSGi%2BBTYhqNZCCQ9Rit0mzFuTQZxilHtnBBtXPH%2FyoT2dQ9PDmjP31wQ4Q%3D%3D";

const process = {
    search: async (params) => {
        const { pageNo, numOfRows } = params;

        let queryParams = `${encodeURIComponent('serviceKey')}=${serviceKey}`;
        queryParams += `&${encodeURIComponent('pageNo')}=${encodeURIComponent(pageNo)}`
        queryParams += `&${encodeURIComponent('numOfRows')}=${encodeURIComponent(numOfRows)}`

        try {
            return await axios.get(`${url}?${queryParams}`);
        } catch (err) {
            console.error(`오류 : ${err}`);
            return { 'success': false }
        }
    }
};

const proxy = {
    search: async (req, res) => {
        const { pageNo, numOfRows, keyWord } = req.query;

        process.search({ pageNo, numOfRows })
            .then((response) => {
                const { data: { response: { body: { items: { item } } } } } = response;
                res.json({ success: true, rows: item });
            })
            .catch((error) => {
                console.log(error);
                res.json({ success: false, error });
            });
    }
};

module.exports = { proxy };