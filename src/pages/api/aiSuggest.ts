import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: "org-66miDQoY9msy7e4Ne2xqzSYm",
  apiKey: process.env.OPENAI_KEY,
});

import { NextApiRequest, NextApiResponse } from "next";

// const aiSuggest = async (_req, res) => {
//   const openai = new OpenAIApi(configuration);
//   const response = await openai.listEngines();

//   res.status(200).json(response);
// };

// export default aiSuggest;

const alwaysRespondWith =
  "Respond in JSON format. Make sure Suggested Saving and suggested Income always equal the total monthly income {SuggestedSaving: 0.0, SuggestedSpending: 0.0, FinalThoughts: 'string', MonthlyIncome: 0.0}";

//   get request to /api/aiSuggest with query params of user income, account balances, and goals
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> {
  const accounts = req.query.accounts;
  const income = Number(req.query.income);
  const goals = req.query.goals;
  const expenses = req.query.expenses;
  let completion;

  const openai = new OpenAIApi(configuration);
  try {
    completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `
        ${alwaysRespondWith}

        User Income: ${income} every 2 weeks and ${income * 2} every month

        User Accounts: ${accounts}

        User Goals: ${
          goals ||
          "We would like to buy our first used car. After that we want to save for a house, and a child"
        }

        User Expenses: ${expenses}

        Can you give recommendations on how to save and spend?
        
    `,
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
  console.log(completion?.data);
  res.status(200).json(completion?.data);
}
