import {
  API_URL,
  API_GET_ACCOUNTS,
  API_GET_CASH,
  API_GET_CARDS,
  API_GET_LOANS,
} from "../constants/apiConstants";

export default {
  get: jest.fn(async () => {}),
  post: jest.fn(async (url, payload) => {
    switch(url) {
      case API_URL + API_GET_ACCOUNTS:
        return {
          status: 200,
          data: [
            {
              id: 1,
              accountID: 1,
              officialname: "test",
              accountname: "test",
            },
          ],
        };
      case API_URL + API_GET_CASH:
        return {
          status: 200,
          data: {
            totalCash: 0,
            totalChecking: 0,
            totalSavings: 0,
          },
        };
      case API_URL + API_GET_CARDS:
        return {
          status: 200,
          data: {
            cardList: [
              {
                id: 1,
                officialname: "card1",
                currentbalance: 0,
                creditlimit: 0,
              }
            ],
            totalDebt: 0,
            totalCash: 0,
          },
        };
      case API_URL + API_GET_LOANS:
        return {
          status: 200,
          data: {
            loanList: [
              {
                id: 1,
                officialname: "card1",
                currentbalance: 0,
                creditlimit: 0,
              }
            ],
            totalDebt: 0,
            totalCash: 0,
          },
        };
      default:
        throw new Error(`Unrecognized url: ${url}`);
    }
  }),
};
