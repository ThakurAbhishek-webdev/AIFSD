const axios = require("axios");

const getAIRecommendation = async (req, res) => {
  try {
    const employees = req.body.employees;

    const prompt = `
Analyze these employees and provide:
1. Employee ranking
2. Promotion recommendations
3. Training suggestions
4. Performance feedback

Employee Data:
${JSON.stringify(employees)}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiResult = response.data.choices[0].message.content;

    res.json({
      success: true,
      recommendation: aiResult,
    });

  } catch (error) {
    console.log("AI ERROR:", error.response?.data || error.message);

    res.status(500).json({
      success: false,
      recommendation: "AI API unavailable",
    });
  }
};

module.exports = { getAIRecommendation };